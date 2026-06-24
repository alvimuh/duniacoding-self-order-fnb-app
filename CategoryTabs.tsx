type Props = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="bg-gray-50 border-r border-gray-200">
      <div role="tablist" className="flex flex-col">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            className={`px-3 py-2 text-xs transition-colors uppercase font-bold w-20 h-18 text-center ${
              active === cat
                ? "text-red-600 bg-white shadow-lg border-l-4 border-red-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => onChange(cat)}
          >
            {cat === "all" ? "Semua" : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
