import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import * as schema from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { tableNumber, customerName, notes, orders } = body;

  if (!tableNumber || !customerName) {
    return NextResponse.json(
      {
        message: "Table number and customer name are required",
      },
      { status: 400 },
    );
  }

  const menuOrdered = await db.select().from(schema.menus);

  const totalPrice = menuOrdered.reduce((sum, item) => {
    const qty = orders[item.id] || 0;
    return sum + item.price * qty;
  }, 0);

  //Insert ke table orders
  const [order] = await db
    .insert(schema.orders)
    .values({
      customerName,
      tableNumber: String(tableNumber),
      notes: notes || null,
      total: totalPrice,
      status: "pending",
    })
    .$returningId();

  const orderItemsToInsert = Object.entries(orders).map(
    ([menuId, quantity]) => {
      const menu = menuOrdered.find((item) => item.id === Number(menuId));
      if (!menu) {
        throw new Error(`Menu with id ${menuId} not found`);
      }
      return {
        orderId: order.id,
        menuId: Number(menuId),
        quantity,
        price: menu.price,
      };
    },
  );

  await db.insert(schema.orderItems).values(orderItemsToInsert as any);

  // Handle the order submission logic here
  return NextResponse.json({
    message: "Data order berhasil disimpan",
    totalPrice: totalPrice,
    orderId: order.id,
  });
}

export async function GET() {
  const allOrders = await db
    .select()
    .from(schema.orders)
    .orderBy(desc(schema.orders.createdAt))
    .limit(50);

  const result = await Promise.all(
    allOrders.map(async (order) => {
      const items = await db
        .select({
          id: schema.orderItems.id,
          quantity: schema.orderItems.quantity,
          price: schema.orderItems.price,
          menuName: schema.menus.name,
        })
        .from(schema.orderItems)
        .leftJoin(schema.menus, eq(schema.orderItems.menuId, schema.menus.id))
        .where(eq(schema.orderItems.orderId, order.id));

      return { ...order, items };
    }),
  );

  return NextResponse.json(result);
}
