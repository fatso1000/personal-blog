import { NextRequest, NextResponse } from "next/server";
import { onThrowError } from "../../auth/apiService";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.slice(10);
    if (!id)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    const request = await prisma.post.findUnique({
      where: { id: +id },
      include: { post_tag: true, details: true },
    });
    if (!request)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "Reminder not found.",
      });

    return NextResponse.json({ data: request });
  } catch (error: any) {
    return onThrowError(error);
  }
}
