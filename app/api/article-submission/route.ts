import { cosmic } from "@/lib/cosmic";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  const data = await cosmic.objects.insertOne(res.submission);
  return Response.json(data);
}
