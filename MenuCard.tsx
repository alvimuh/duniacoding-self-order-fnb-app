import { MenuItem } from "./types";
import { formatPrice } from "../lib/utils";
import { FaBowlRice } from "react-icons/fa6";

type Props = {
  item: MenuItem;
  quantity: number;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function MenuCard({ item, quantity, onAdd, onRemove }: Props) {
  return (
    <div className="rounded-xl flex flex-row bg-white shadow-sm">
      <figure className="m-1 w-20 h-20 bg-gray-50 flex items-center justify-center text-2xl shrink-0 rounded-xl text-gray-400">
        <FaBowlRice />
      </figure>
      <div className="flex flex-col flex-1 px-2 py-3 gap-1">
        <h3 className="font-semibold text-sm">{item.name}</h3>
        {item.description && (
          <p className="text-xs opacity-60 line-clamp-1">{item.description}</p>
        )}
        <p className="text-sm font-bold text-red-600">
          {formatPrice(item.price)}
        </p>
      </div>
      <div className="flex items-center gap-2 pr-3">
        {quantity === 0 ? (
          <button
            className="inline-flex items-center justify-center font-medium rounded-full transition-colors cursor-pointer bg-red-600 text-white hover:bg-red-700 active:bg-red-800 text-sm w-8 h-8 p-0"
            onClick={() => onAdd(item.id)}
          >
            +
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              className="inline-flex items-center justify-center font-medium rounded-full transition-colors cursor-pointer bg-transparent hover:bg-gray-100 text-gray-700 text-sm w-8 h-8 p-0"
              onClick={() => onRemove(item.id)}
            >
              −
            </button>
            <span className="text-sm font-bold w-6 text-center">
              {quantity}
            </span>
            <button
              className="inline-flex items-center justify-center font-medium rounded-full transition-colors cursor-pointer bg-red-600 text-white hover:bg-red-700 active:bg-red-800 text-sm w-8 h-8 p-0"
              onClick={() => onAdd(item.id)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
