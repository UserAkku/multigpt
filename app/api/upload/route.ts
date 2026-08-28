import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/** Upload adapter for Cloudinary. The client deliberately never receives its secret. */
export async function POST(request: NextRequest) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 503 });
  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "A file is required." }, { status: 400 });
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "multigpt";
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");
  const body = new FormData();
  body.append("file", file); body.append("api_key", key); body.append("timestamp", timestamp); body.append("folder", folder); body.append("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/auto/upload`, { method: "POST", body });
  if (!response.ok) return NextResponse.json({ error: "File upload failed. Please try again." }, { status: 502 });
  const uploaded = await response.json();
  return NextResponse.json({ url: uploaded.secure_url, publicId: uploaded.public_id, bytes: uploaded.bytes, resourceType: uploaded.resource_type });
}
