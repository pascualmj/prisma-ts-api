import type { GlobalTypes } from "@app-types/global";
import { AppException } from "@app/config/AppException";
import jwt from "jsonwebtoken";

export const getJWT = (
  data: GlobalTypes.AppTokenContent,
  options?: jwt.SignOptions
) => {
  if (!process.env.JWT_SECRET) throw new AppException("Missing jwt secret key");
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1h",
    ...options,
  });
};
