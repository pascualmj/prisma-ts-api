import { GlobalTypes } from "@app-types/global";
import { AppException } from "@app/config/AppException";
import { verifyJWT } from "@app/utils/verifyJWT";

export const isAuthenticated: GlobalTypes.AppController = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) throw new AppException("Forbidden access", null, 403);
    const decoded = verifyJWT(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
