"use client";

import { useState } from "react";
import { Fund } from "@/types/fund";

interface FundSearchProps {
  onFundSelect: (fund: Fund) => void;
}

export default function FundSearch({ onFundSelect }: FundSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);

    if (term.length < 2) {
      setFunds([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/funds/list");
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const filtered = data.data.filter(
        (fund: Fund) =>
          fund.fundName.toLowerCase().includes(term.toLowerCase()) ||
          fund.fundCode.toLowerCase().includes(term.toLowerCase())
      );

      setFunds(filtered.slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch funds");
      setFunds([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="ค้นหากองทุน (ชื่อหรือรหัส)..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
      />

      {loading && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <p className="text-gray-600">กำลังค้นหา...</p>
        </div>
      )}

      {error && (
        <div className="absolute top-full mt-2 w-full bg-white border border-red-200 rounded-lg p-4 shadow-lg">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && funds.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
          {funds.map((fund) => (
            <button
              key={fund.fundCode}
              onClick={() => {
                onFundSelect(fund);
                setSearchTerm("");
                setFunds([]);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{fund.fundCode}</div>
              <div className="text-sm text-gray-700">{fund.fundName}</div>
              <div className="text-xs text-gray-600 mt-1">
                {fund.category} | {fund.managementCompany}
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading && !error && searchTerm.length >= 2 && funds.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <p className="text-gray-600">ไม่พบกองทุนที่ค้นหา</p>
        </div>
      )}
    </div>
  );
}
