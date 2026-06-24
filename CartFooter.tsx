import { formatPrice } from "@/lib/utils";

type Props = {
  totalItems: number;
  totalPrice: number;
  onOrder: () => void;
};

export default function CartFooter({ totalItems, totalPrice, onOrder }: Props) {
  return (
    <div className="w-full bg-white border-t border-gray-200 h-16 flex items-center px-4 z-10">
      <div className="flex items-center justify-between w-full">
        <div>
          <span className="text-xs opacity-60">Pesanan</span>
          <p className="text-sm font-bold">
            {totalItems} item · {formatPrice(totalPrice)}
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer bg-red-600 text-white hover:bg-red-700 active:bg-red-800 text-sm px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={totalItems === 0}
          onClick={onOrder}
        >
          Pesan
        </button>
      </div>
    </div>
  );
}
