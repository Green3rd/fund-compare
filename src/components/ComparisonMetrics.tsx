"use client";

import { Fund } from "@/types/fund";

interface ComparisonMetricsProps {
  funds: Fund[];
}

export default function ComparisonMetrics({ funds }: ComparisonMetricsProps) {
  if (funds.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              รหัสกองทุน
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ชื่อกองทุน
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
              NAV
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              วันที่
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ประเภท
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              บริษัทจัดการ
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {funds.map((fund, index) => (
            <tr key={fund.fundCode} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {fund.fundCode}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {fund.fundName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                {fund.navPerUnit.toFixed(4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {fund.navDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {fund.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {fund.managementCompany}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
