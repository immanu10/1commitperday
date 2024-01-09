import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? "",
  });

  console.log("token.accessToken: ", token);

  return NextResponse.json({});
}
