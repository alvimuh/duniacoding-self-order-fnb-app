"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FaKitchenSet,
  FaRegUser,
  FaRegNoteSticky,
  FaRegClock,
  FaFire,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { MdTableRestaurant } from "react-icons/md";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/components/types";
import { getOrders, updateOrderStatus } from "@/service";

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Baru", color: "bg-amber-100 text-amber-700" },
  cooking: { label: "Dimasak", color: "bg-sky-100 text-sky-700" },
  ready: { label: "Siap Saji", color: "bg-emerald-100 text-emerald-700" },
  served: { label: "Selesai", color: "bg-gray-100 text-gray-600" },
};

const STATUS_BUTTON: Record<string, string> = {
  pending: "bg-amber-600 hover:bg-amber-700 active:bg-amber-800",
  cooking: "bg-sky-600 hover:bg-sky-700 active:bg-sky-800",
  ready: "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800",
};

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");
  const [updating, setUpdating] = useState<number | null>(null);
  const [now, setNow] = useState("");

  // Load initial data
  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  // Clock — client-only to avoid hydration mismatch
  useEffect(() => {
    setNow(new Date().toLocaleTimeString("id-ID"));
    const timer = setInterval(() => {
      setNow(new Date().toLocaleTimeString("id-ID"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Socket.IO: real-time updates
  //   useEffect(() => {
  //     function onNewOrder(order: Order) {
  //       setOrders((prev) => [order, ...prev]);

  //       if (Notification.permission === "granted") {
  //         new Notification(`Pesanan Baru #${order.id}`, {
  //           body: `Meja ${order.tableNumber} · ${order.customerName}`,
  //         });
  //       }
  //     }

  //     function onStatusChange({ id, status }: { id: number; status: string }) {
  //       setOrders((prev) =>
  //         prev.map((o) => (o.id === id ? { ...o, status } : o)),
  //       );
  //     }

  //     socket.on("new-order", onNewOrder);
  //     socket.on("status-change", onStatusChange);

  //     return () => {
  //       socket.off("new-order", onNewOrder);
  //       socket.off("status-change", onStatusChange);
  //     };
  //   }, []);

  const updateStatus = useCallback(async (id: number, next: string) => {
    setUpdating(id);
    try {
      await updateOrderStatus(id, {
        status: next as "pending" | "cooking" | "ready" | "served",
      });
    } finally {
      setUpdating(null);
    }
  }, []);

  const nextStatus = (current: string): string | null => {
    const flow: Record<string, string> = {
      pending: "cooking",
      cooking: "ready",
      ready: "served",
    };
    return flow[current] || null;
  };

  const filtered = orders.filter((o) => {
    if (filter === "active") return o.status !== "served";
    return o.status === filter;
  });

  const counts = {
    pending: orders.filter((o) => o.status === "pending").length,
    cooking: orders.filter((o) => o.status === "cooking").length,
    ready: orders.filter((o) => o.status === "ready").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center bg-white sticky top-0 z-10 shadow-sm px-4 py-3">
        <div className="flex items-center flex-1">
          <FaKitchenSet className="text-xl mr-2 text-red-600" />
          <span className="text-xl font-bold">Kitchen Display</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60">{now}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 to-slate-500 p-5">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="relative grid grid-cols-3 gap-4">
            <div className="flex items-center gap-4 rounded-xl bg-white/15 backdrop-blur-sm p-4 shadow-2xl">
              <FaRegClock className="text-4xl text-white/80 mb-1" />
              <div>
                <div className="text-3xl font-black text-white drop-shadow-sm">
                  {counts.pending}
                </div>
                <div className="text-xs font-semibold text-white/70 mt-0.5 tracking-wide">
                  Baru Masuk
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/15 backdrop-blur-sm p-4 shadow-2xl">
              <FaFire className="text-4xl text-white/80 mb-1" />
              <div>
                <div className="text-3xl font-black text-white drop-shadow-sm">
                  {counts.cooking}
                </div>
                <div className="text-xs font-semibold text-white/70 mt-0.5 tracking-wide">
                  Dimasak
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/15 backdrop-blur-sm p-4 shadow-2xl">
              <FaRegCircleCheck className="text-4xl text-white/80 mb-1" />
              <div>
                <div className="text-3xl font-black text-white drop-shadow-sm">
                  {counts.ready}
                </div>
                <div className="text-xs font-semibold text-white/70 mt-0.5 tracking-wide">
                  Siap
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white sticky top-13 z-10 border-b border-gray-200 px-3 py-2 ">
        <div role="tablist" className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {[
            { key: "active", label: "Aktif" },
            { key: "pending", label: "Baru" },
            { key: "cooking", label: "Dimasak" },
            { key: "ready", label: "Siap" },
            { key: "served", label: "Selesai" },
          ].map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex-1 ${
                filter === key
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <main className="p-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="inline-block animate-spin w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 opacity-60">Tidak ada pesanan.</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((order) => (
              <div key={order.id} className="rounded-xl bg-white shadow-sm">
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">#{order.id}</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CONFIG[order.status]?.color}`}
                    >
                      {STATUS_CONFIG[order.status]?.label}
                    </span>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-1">
                      <FaRegUser className="text-gray-400" />
                      {order.customerName}
                      <span className="mx-1">·</span>
                      <MdTableRestaurant className="text-gray-400" />
                      Meja {order.tableNumber}
                    </div>
                    {order.notes && (
                      <div className="opacity-60 text-xs mt-1 flex items-center gap-1">
                        <FaRegNoteSticky className="text-gray-400" />
                        {order.notes}
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 my-0" />
                  <ul className="text-sm">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between py-0.5">
                        <span>
                          {item.quantity}x {item.menuName}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm font-bold">
                    Total: {formatPrice(order.total)}
                  </div>
                  {nextStatus(order.status) && (
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer text-white text-sm px-3 py-1.5 w-full disabled:opacity-50 disabled:cursor-not-allowed ${STATUS_BUTTON[order.status]}`}
                        disabled={updating === order.id}
                        onClick={() =>
                          updateStatus(order.id, nextStatus(order.status)!)
                        }
                      >
                        {updating === order.id && (
                          <span className="inline-block animate-spin w-3 h-3 border-2 border-current border-t-transparent rounded-full mr-1" />
                        )}
                        {order.status === "pending" && "Mulai Masak"}
                        {order.status === "cooking" && "Siap Saji"}
                        {order.status === "ready" && "Sudah Disajikan"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
