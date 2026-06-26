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
  const res = await fetch("/api/menu");
  if (!res.ok) throw new Error(`GET /api/menu failed (${res.status})`);
  const json = await res.json();
  return json.data ?? [];
}

// ---- Order API ----

export async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/order");
  if (!res.ok) throw new Error(`GET /api/order failed (${res.status})`);
  return res.json();
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResult> {
  const res = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`POST /api/order failed (${res.status})`);
  return res.json();
}

export async function updateOrderStatus(
  id: number,
  payload: UpdateStatusPayload,
): Promise<UpdateStatusResult> {
  const res = await fetch(`/api/order/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(`PATCH /api/order/${id}/status failed (${res.status})`);
  return res.json();
}
