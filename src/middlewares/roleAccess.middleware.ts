import { GlobalTypes } from "@app-types/global";
import { AppException } from "@app/config/AppException";
import { UsersTypes } from "@app/modules/users/users.types";

export const roleAccess =
  (...roles: UsersTypes.UserRole[]): GlobalTypes.AppController =>
  (req, res, next) => {
    try {
      if (!roles.includes(req.user.role as UsersTypes.UserRole))
        throw new AppException("Forbidden access", null, 403);
      next();
    } catch (err) {
      next(err);
    }
  };
