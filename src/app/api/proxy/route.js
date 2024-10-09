import { NextResponse } from "next/server";
import { HttpsProxyAgent } from "https-proxy-agent";

export async function GET() {
  const proxyUrl = "http://45.77.209.195:8080";
  const agent = new HttpsProxyAgent(proxyUrl);

  try {
    const response = await fetch("https://catfact.ninja/fact", { agent });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    return NextResponse.json(
      { error: "Failed to fetch cat fact" },
      { status: 500 }
    );
  }
}
