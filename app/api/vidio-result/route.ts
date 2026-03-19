import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('request_id');
    const apiKey = req.headers.get('Authorization');

    if (!requestId) {
      return NextResponse.json({ error: 'Missing request_id' }, { status: 400 });
    }

    const response = await fetch(`https://api.apifree.ai/v1/video/${requestId}/result`, {
      method: "GET",
      headers: {
        "Authorization": apiKey || ""
      }
    });

    const data = await response.text();
    return new NextResponse(data, { status: response.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
