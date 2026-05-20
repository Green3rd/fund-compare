"use client";

interface ViewToggleProps {
  isNormalized: boolean;
  onToggle: (normalized: boolean) => void;
}

export default function ViewToggle({ isNormalized, onToggle }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onToggle(false)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          !isNormalized
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Absolute NAV
      </button>
      <button
        onClick={() => onToggle(true)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          isNormalized
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Normalized %
      </button>
    </div>
  );
}
