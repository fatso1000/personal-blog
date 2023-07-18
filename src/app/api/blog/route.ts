import { validate } from "class-validator";
import { BlogPOST, CustomError, IBlogAPI } from "src/types/apiTypes";
import { onThrowError, onValidationError } from "../auth/apiService";
import prisma from "src/app/config/db";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { NextRequest, NextResponse } from "next/server";
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
      where: { title: { contains: name[0] } },
      include: { post_tag: true },
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

export async function POST(req: Request) {
  try {
    const body: IBlogAPI = await req.json();
    const bodyType = new BlogPOST(body);
    const validation = await validate(bodyType);

    if (validation.length > 0) throw onValidationError(validation);

    const newBlog = await prisma.post.create({
      data: {
        author_name: body.author_name,
        reading_time: +body.reading_time,
        title: body.title,
        verification: body.verification,
        description: body.description,
        sub_title: body.sub_title,
        details: { create: { content: body.content } },
        post_tag: {
          connect: body.tags
            ? ([
                ...body.tags.map((v) => ({
                  id: v,
                })),
              ] as any[])
            : [],
        },
        // reminder_info: { create: { title: body.title, info: body.info } },
      },
      include: { details: true, post_tag: true },
    });

    if (!newBlog)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        msg: "Unexpected error during user registration.",
      });

    return NextResponse.json({ data: newBlog });
  } catch (error: any) {
    return onThrowError(error);
  }
}
