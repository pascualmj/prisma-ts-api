import bcrypt from "bcryptjs";
import { AppException } from "@app/config/AppException";

export const encryptValue = async (value?: string) => {
  if (!value) throw new AppException("Value encryption error");
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
};
