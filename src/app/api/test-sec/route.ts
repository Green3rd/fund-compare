import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.SEC_API_BASE_URL || "https://api.sec.or.th/FundDailyInfo";
    const testUrl = `${baseUrl}/fund/aum`;
    
    console.log("Testing SEC API URL:", testUrl);
    
    const response = await fetch(testUrl, {
      headers: {
        "Accept": "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    const text = await response.text();
    console.log("Response body (first 500 chars):", text.substring(0, 500));

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return NextResponse.json({
        error: "Response is not JSON",
        status: response.status,
        body: text.substring(0, 500),
      });
    }

    return NextResponse.json({
      success: true,
      status: response.status,
      url: testUrl,
      dataKeys: Object.keys(data),
      sampleData: data,
    });
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
