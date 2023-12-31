import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { CustomError, IUserLogin } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";

const secret = process.env.JWT_SECRET_KEY || "";

const getSearchQuery = (urlString: string, searchParamsNames: string[]) => {
  const url = new URL(urlString);
  const searchParams = new URLSearchParams(url.search);
  return searchParamsNames.map((v) => searchParams.get(v));
};

const setCookie = (cookieKey: string, value: any) => {
  try {
    cookies().set({
      name: cookieKey,
      value: value,
      maxAge: 600,
      path: "/",
    });
    return true;
  } catch (error) {
    return false;
  }
};

const setLoginCookies = (user: string, token: string) => {
  setCookie("current_user", user);
  setCookie("token", token);
};

const logInUser = (user: IUserLogin) => {
  try {
    const jwt_secret = process.env.JWT_SECRET_KEY || "";
    const data = {
      time: new Date(),
      ...user,
    };
    const token = jwt.sign(data, jwt_secret);
    setLoginCookies(JSON.stringify(user), token);
    return token;
  } catch (error) {
    return null;
  }
};

const removeCookie = (cookieKey: string) => {
  try {
    cookies().set({ name: cookieKey, maxAge: 0, value: "" });
    return true;
  } catch (error) {
    return false;
  }
};

const verifyToken = (token: string | null) => {
  try {
    if (!token) return undefined;
    return jwt.verify(token, secret);
  } catch (error) {
    return undefined;
  }
};

const verifyUserAuth = (req: NextRequest) => {
  const token = req.headers.get("Authorization");
  const isLoggedIn = verifyToken(token);
  if (!token || !isLoggedIn)
    throw new CustomError({
      errors: [],
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      msg: "Error at authorization.",
    });
};

export {
  verifyUserAuth,
  verifyToken,
  setCookie,
  getSearchQuery,
  removeCookie,
  logInUser,
  setLoginCookies,
};
