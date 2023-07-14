import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";
import { onThrowError } from "../auth/apiService";
import { getSearchQuery } from "src/shared/apiShared";

export async function GET(req: NextRequest) {
  try {
    const name = getSearchQuery(req.url, ["name"]);

    if (!name || !name[0])
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request name.",
      });

    const request = await prisma.post.findMany({
      where: { post_tag: { some: { name: { contains: name[0] } } } },
      include: { post_tag: true },
    });

    if (!request)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "Tags not found.",
      });

    return NextResponse.json({ data: request });
  } catch (error: any) {
    return onThrowError(error);
  }
}
