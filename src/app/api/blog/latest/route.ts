import { NextResponse } from "next/server";
import { onThrowError } from "../../auth/apiService";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

export async function GET(req: Request) {
  try {
    const blogPosts = await prisma.post.findMany({
      take: 10,
      include: { post_tag: true },
    });

    if (!blogPosts)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "No reminders found.",
      });

    return NextResponse.json({ data: blogPosts });
  } catch (error: any) {
    return onThrowError(error);
  }
}
