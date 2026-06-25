import { useRef } from "react";
import { CartItem } from "./types";
import { formatPrice } from "../lib/utils";

type Props = {
  cartItems: CartItem[];
  totalPrice: number;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (form: HTMLFormElement) => void;
};

export default function OrderModal({
  cartItems,
  totalPrice,
  submitting,
  onClose,
  onSubmit,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) onSubmit(formRef.current);
  };

  return (
    <dialog
      open
      className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md">
        <h3 className="text-lg font-bold mb-4">Konfirmasi Pesanan</h3>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          {cartItems.map((item) => (
            <div
              key={item.menu.id}
              className="flex justify-between text-sm py-1"
            >
              <span>
                {item.quantity}x {item.menu.name}
              </span>
              <span className="font-medium">
                {formatPrice(item.menu.price * item.quantity)}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 my-1" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pemesan
            </label>
            <input
              name="customerName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Nama Anda"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Meja
            </label>
            <input
              name="tableNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Contoh: 5"
              defaultValue="5"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan (opsional)
            </label>
            <textarea
              name="notes"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Kurang pedas, tanpa es, dll."
            />
          </div>
          <div className="flex items-center justify-end gap-2 mt-6">
            <button
              type="button"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer bg-transparent hover:bg-gray-100 text-gray-700 text-sm px-3 py-1.5"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer bg-red-600 text-white hover:bg-red-700 active:bg-red-800 text-sm px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting && (
                <span className="inline-block animate-spin w-3 h-3 border-2 border-current border-t-transparent rounded-full mr-1" />
              )}
              Kirim Pesanan
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onSubmit={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
