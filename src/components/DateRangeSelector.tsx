"use client";

interface DateRangeSelectorProps {
  onRangeChange: (days: number) => void;
  selectedRange: number;
}

const PRESET_RANGES = [
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
  { label: "YTD", days: -1 },
  { label: "Max", days: 1825 },
];

export default function DateRangeSelector({ onRangeChange, selectedRange }: DateRangeSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PRESET_RANGES.map((range) => (
        <button
          key={range.label}
          onClick={() => onRangeChange(range.days)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedRange === range.days
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
