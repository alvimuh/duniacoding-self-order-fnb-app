// ---- Price formatting ----
export function formatPrice(cents: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(cents);
}

// ---- Order status flow ----
export const ORDER_STATUS_FLOW: Record<string, string> = {
  pending: "cooking",
  cooking: "ready",
  ready: "served",
};

// ---- Get next status ----
export function getNextStatus(current: string): string | null {
  return ORDER_STATUS_FLOW[current] || null;
}
