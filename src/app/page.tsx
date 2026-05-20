"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FundSearch from "@/components/FundSearch";
import FundChart from "@/components/FundChart";
import ComparisonMetrics from "@/components/ComparisonMetrics";
import DateRangeSelector from "@/components/DateRangeSelector";
import ViewToggle from "@/components/ViewToggle";
import { Fund } from "@/types/fund";
import { calculatePerformanceMetrics } from "@/lib/performance-calculator";

export default function Home() {
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);
  const [apiStatus, setApiStatus] = useState<string>("Checking...");
  const [allChartData, setAllChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(90);
  const [isNormalized, setIsNormalized] = useState(false);
  const isLoadingFromUrl = useRef(false);
  const hasInitialized = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/funds/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.mock) {
          setApiStatus("Using mock data (SEC API unavailable)");
        } else {
          setApiStatus("Connected to SEC API");
        }
      })
      .catch(() => setApiStatus("API Error"));
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    
    const funds = searchParams.get("funds");
    if (funds) {
      hasInitialized.current = true;
      const fundCodes = funds.split(",");
      Promise.all(
        fundCodes.map((code) =>
          fetch(`/api/funds/${code}/nav`).then((res) => res.json())
        )
      ).then((results) => {
        const loadedFunds = results
          .filter((r) => r.data && !r.error)
          .map((r) => r.data);
        setSelectedFunds(loadedFunds);
      });
    } else {
      hasInitialized.current = true;
    }
  }, [searchParams]);

  useEffect(() => {
    if (!hasInitialized.current) return;
    
    if (selectedFunds.length > 0) {
      const fundCodes = selectedFunds.map((f) => f.fundCode).join(",");
      const currentFunds = searchParams.get("funds");
      if (currentFunds !== fundCodes) {
        router.replace(`/?funds=${fundCodes}`, { scroll: false });
      }
    } else {
      if (searchParams.get("funds")) {
        router.replace("/", { scroll: false });
      }
    }
  }, [selectedFunds, router, searchParams]);

  const handleFundSelect = (fund: Fund) => {
    if (selectedFunds.length >= 5) {
      alert("สามารถเลือกได้สูงสุด 5 กองทุน");
      return;
    }
    if (!selectedFunds.find((f) => f.fundCode === fund.fundCode)) {
      setSelectedFunds([...selectedFunds, fund]);
    }
  };

  const handleRemoveFund = (fundCode: string) => {
    setSelectedFunds(selectedFunds.filter((f) => f.fundCode !== fundCode));
  };

  useEffect(() => {
    if (selectedFunds.length === 0) {
      setAllChartData([]);
      return;
    }

    setLoading(true);
    Promise.all(
      selectedFunds.map((fund) =>
        fetch(`/api/funds/${fund.fundCode}/history`).then((res) => res.json())
      )
    ).then((results) => {
      const allDates = new Set<string>();
      const historicalDataMap = new Map<string, any>();
      
      results.forEach((result, index) => {
        if (result.data && result.data.data) {
          result.data.data.forEach((item: any) => allDates.add(item.date));
          historicalDataMap.set(selectedFunds[index].fundCode, result.data);
        }
      });

      const sortedDates = Array.from(allDates).sort();
      
      const fullChartData = sortedDates.map((date) => {
        const dataPoint: any = { date };
        results.forEach((result, index) => {
          if (result.data && result.data.data) {
            const fundData = result.data.data.find((item: any) => item.date === date);
            dataPoint[selectedFunds[index].fundCode] = fundData ? fundData.nav : null;
          }
        });
        return dataPoint;
      });

      setAllChartData(fullChartData);

      const fundsWithMetrics = selectedFunds.map((fund) => {
        const historicalData = historicalDataMap.get(fund.fundCode);
        if (historicalData) {
          const performanceMetrics = calculatePerformanceMetrics(historicalData);
          return { ...fund, performanceMetrics };
        }
        return fund;
      });

      setSelectedFunds(fundsWithMetrics);
      setLoading(false);
    });
  }, [selectedFunds.map(f => f.fundCode).join(",")]);

  const chartData = useMemo(() => {
    if (allChartData.length === 0) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - dateRange);
    
    return allChartData.filter((item) => new Date(item.date) >= cutoffDate);
  }, [allChartData, dateRange]);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            Thai Fund Compare
          </h1>
          <p className="text-gray-700 mb-2">
            เปรียบเทียบกองทุนรวมไทย - Compare Thai Mutual Funds
          </p>
          <p className="text-sm text-gray-600">Status: {apiStatus}</p>
        </header>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">ค้นหากองทุน</h2>
          <FundSearch onFundSelect={handleFundSelect} />
        </div>

        {selectedFunds.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                ตารางเปรียบเทียบ ({selectedFunds.length}/5)
              </h2>
              <ComparisonMetrics funds={selectedFunds} />
              <div className="mt-4 flex gap-2 flex-wrap">
                {selectedFunds.map((fund) => (
                  <button
                    key={fund.fundCode}
                    onClick={() => handleRemoveFund(fund.fundCode)}
                    className="px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-md"
                  >
                    ลบ {fund.fundCode}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">กราฟเปรียบเทียบ NAV</h2>
                <div className="flex items-center gap-4">
                  <DateRangeSelector
                    selectedRange={dateRange}
                    onRangeChange={setDateRange}
                  />
                  <ViewToggle
                    isNormalized={isNormalized}
                    onToggle={setIsNormalized}
                  />
                </div>
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
                </div>
              ) : (
                <FundChart
                  data={chartData}
                  fundCodes={selectedFunds.map((f) => f.fundCode)}
                  isNormalized={isNormalized}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
