import { formatPrice } from "../lib/utils";
import { FaCircleCheck } from "react-icons/fa6";

type Props = {
  orderId: number;
  total: number;
  onDismiss: () => void;
};

export default function OrderToast({ orderId, total, onDismiss }: Props) {
  return (
    <div className="fixed z-50 top-4 right-4">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 max-w-xs shadow-lg">
        <FaCircleCheck className="text-emerald-600 text-lg shrink-0" />
        <span>
          Pesanan #{orderId} berhasil!
          <br />
          Total: {formatPrice(total)}
        </span>
        <button
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer bg-transparent hover:bg-emerald-100 text-emerald-700 text-xs px-2 py-1 shrink-0"
          onClick={onDismiss}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
