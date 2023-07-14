import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CustomError, IUserLogin, UserLoginPOST } from "types/apiTypes";
import { onThrowError, onValidationError } from "../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import { logInUser } from "shared/apiShared";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body: IUserLogin = await req.json();
    const bodyType = new UserLoginPOST(body);
    const validation = await validate(bodyType);

    if (validation.length > 0) {
      throw onValidationError(validation);
    }

    const request = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (!request)
      throw new CustomError({
        msg: "User not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    const isMatch = bcrypt.compareSync(body.password, request.password);
    if (!isMatch)
      throw new CustomError({
        msg: "Password mismatch.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });

    const jwt = logInUser(body);

    return NextResponse.json({
      token: jwt,
      user: request,
      message: "user logged in",
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
