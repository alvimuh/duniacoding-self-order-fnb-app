import {
  mysqlTable,
  int,
  varchar,
  text,
  boolean,
  datetime,
} from "drizzle-orm/mysql-core";

export const menus = mysqlTable("menus", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: int("price").notNull(), // in cents
  category: varchar("category", { length: 50 }).notNull(), // food, drink, snack
  available: boolean("available").default(true),
  createdAt: datetime("created_at").default(new Date()),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  tableNumber: varchar("table_number", { length: 20 }).notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, cooking, ready, served
  total: int("total").notNull().default(0), // in cents
  notes: text("notes"),
  createdAt: datetime("created_at").default(new Date()),
});

export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("order_id")
    .notNull()
    .references(() => orders.id),
  menuId: int("menu_id")
    .notNull()
    .references(() => menus.id),
  quantity: int("quantity").notNull().default(1),
  price: int("price").notNull(), // price at time of order, in cents
  notes: text("notes"),
});
