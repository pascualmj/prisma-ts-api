import bcrypt from "bcryptjs";
import { AppException } from "@app/config/AppException";

export const compareWithEncrypted = async (
  value?: string,
  compareTo?: string
) => {
  if (!value || !compareTo)
    throw new AppException("Cannot compare with empty value");
  return bcrypt.compare(value, compareTo);
};
