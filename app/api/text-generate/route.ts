import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = req.headers.get('Authorization');

    const response = await fetch("https://www.apifree.ai/api/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": apiKey || "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.text();
    return new NextResponse(data, { status: response.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
