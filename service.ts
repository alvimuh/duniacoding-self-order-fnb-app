import {
  CreateOrderPayload,
  CreateOrderResult,
  MenuItem,
  Order,
  UpdateStatusPayload,
  UpdateStatusResult,
} from "./components/types";

// ---- Menu API ----

export async function getMenus(): Promise<MenuItem[]> {
  const res = await fetch("/api/menus");
  if (!res.ok) throw new Error(`GET /api/menus failed (${res.status})`);
  return res.json();
}

// ---- Order API ----

export async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error(`GET /api/orders failed (${res.status})`);
  return res.json();
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResult> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`POST /api/orders failed (${res.status})`);
  return res.json();
}

export async function updateOrderStatus(
  id: number,
  payload: UpdateStatusPayload,
): Promise<UpdateStatusResult> {
  const res = await fetch(`/api/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(`PATCH /api/orders/${id}/status failed (${res.status})`);
  return res.json();
}
