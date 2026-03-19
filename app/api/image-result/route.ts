import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('request_id');
    const apiKey = req.headers.get('Authorization');

    if (!requestId) {
      return NextResponse.json({ error: 'Missing request_id' }, { status: 400 });
    }

    const response = await fetch(`https://api.apifree.ai/v1/image/${requestId}/result`, {
      method: "GET",
      headers: {
        "Authorization": apiKey || ""
      }
    });

    const data = await response.json();

    if (data.code === 200 && data.resp_data?.status === 'success' && data.resp_data?.image_list) {
      const base64List = await Promise.all(
        data.resp_data.image_list.map(async (url: string) => {
          try {
            const imgRes = await fetch(url);
            if (!imgRes.ok) return url;
            const arrayBuffer = await imgRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');
            const contentType = imgRes.headers.get('content-type') || 'image/png';
            return `data:${contentType};base64,${base64}`;
          } catch (e) {
            console.error('Failed to convert image to base64:', e);
            return url;
          }
        })
      );
      data.resp_data.image_list = base64List;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
