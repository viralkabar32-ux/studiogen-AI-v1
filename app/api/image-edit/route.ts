import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const apiKey = req.headers.get('Authorization');

    const fd = new FormData();
    fd.append("model", "google/gemini-3.1-flash-image-preview/edit");
    fd.append("prompt", formData.get("prompt") as string);
    if (formData.has("aspect_ratio")) fd.append("aspect_ratio", formData.get("aspect_ratio") as string);
    if (formData.has("size")) fd.append("size", formData.get("size") as string);
    if (formData.has("n")) fd.append("n", formData.get("n") as string);
    
    const image = formData.get("image");
    if (image) {
      fd.append("image", image);
    }

    const response = await fetch("https://www.apifree.ai/api/v1/images/edits", {
      method: "POST",
      headers: {
        "Authorization": apiKey || ""
      },
      body: fd
    });

    const data = await response.text();
    return new NextResponse(data, { status: response.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
