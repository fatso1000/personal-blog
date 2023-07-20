import { NextRequest, NextResponse } from "next/server";
import { onThrowError } from "../../auth/apiService";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";
import { verifyUserAuth } from "src/shared/apiShared";

export async function DELETE(req: NextRequest) {
  try {
    verifyUserAuth(req);
    const id = req.nextUrl.pathname.slice(10);
    if (!id)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    const post_detail = await prisma.postDetail.delete({
      where: { post_id: +id },
    });
    if (!post_detail)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "Cannot Find Post.",
      });
    const request = await prisma.post.delete({
      where: { id: +id },
    });
    if (!request)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "Post not found.",
      });

    return NextResponse.json({ data: request });
  } catch (error: any) {
    return onThrowError(error);
  }
}

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
        msg: "Post not found.",
      });

    return NextResponse.json({ data: request });
  } catch (error: any) {
    return onThrowError(error);
  }
}
