import { NextResponse } from "next/server";
import { HttpsProxyAgent } from "https-proxy-agent";

export async function GET(req) {
  const proxyUrl = "http://45.77.209.195:8080";
  const agent = new HttpsProxyAgent(proxyUrl);

  const { pathname } = new URL(req.url);
  const pathSegments = pathname.split("/").slice(2);

  const targetUrl = `https://catfact.ninja/${pathSegments.join("/")}`;

  try {
    const response = await fetch(targetUrl, { agent });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { pathname } = new URL(req.url);
  const pathSegments = pathname.split("/").slice(2);

  console.log("POST pathname:", pathname);
  console.log("POST pathSegments:", pathSegments);

  const proxyUrl = "http://45.77.209.195:8080";
  const agent = new HttpsProxyAgent(proxyUrl);
  const targetUrl = `https://dummyjson.com/posts/${pathSegments.join("/")}`;

  try {
    const body = await req.json();
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      agent,
    });

    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
