import type { GlobalTypes } from "@app-types/global";
import { AppException } from "@app/config/AppException";
import jwt from "jsonwebtoken";

export const verifyJWT = (token: string) => {
  if (!process.env.JWT_SECRET) throw new AppException("Missing jwt secret key");
  if (!token) throw new AppException("Missing jwt token");
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as GlobalTypes.AppTokenContent;
  } catch (err) {
    throw new AppException(
      (err as Error)?.message || "Invalid or expired token",
      null,
      401
    );
  }
};
