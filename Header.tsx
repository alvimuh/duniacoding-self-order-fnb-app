import { FaCoffee } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex items-center bg-white sticky top-0 z-10 shadow-sm px-4 py-3">
      <div className="flex items-center flex-1">
        <div className="flex items-center gap-1">
          <div className="bg-red-600 w-7 h-7 flex items-center justify-center mr-2">
            <FaCoffee className="text-white" />
          </div>
          <h1 className="font-bold text-lg">Bug &amp; Brew Coffee</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-sm font-bold bg-orange-100 text-orange-600">
          Meja #5
        </span>
      </div>
    </div>
  );
}
