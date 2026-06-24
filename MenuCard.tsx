import { MenuItem } from "@/components/types";
import { formatPrice } from "@/lib/utils";
import { FaBowlRice } from "react-icons/fa6";

type Props = {
  item: MenuItem;
};

export default function MenuCard({ item }: Props) {
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
    </div>
  );
}
