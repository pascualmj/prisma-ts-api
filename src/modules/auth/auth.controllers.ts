import * as UsersService from "@app/modules/users/users.services";
import { formatResponse } from "@app/utils/formatResponse";
import { GlobalTypes } from "@app-types/global";
import { UsersTypes } from "@app/modules/users/users.types";
import { AppException } from "@app/config/AppException";
import { validateUser } from "@app/modules/users/users.validators";
import { compareWithEncrypted } from "@app/utils/compareWithEncrypted";
import { getJWT } from "@app/utils/getJWT";
import { authResponseId } from "./auth.responseIds";

export const login: GlobalTypes.AppControllerWithBody<
  UsersTypes.LoginBody
> = async (req, res, next) => {
  const user = req.body || {};
  try {
    const { error } = validateUser("login", user);
    if (error)
      throw new AppException(
        "Request body not valid",
        authResponseId("validation.error"),
        400
      );
    const result = await UsersService.getOne(user.email);
    if (!result)
      throw new AppException(
        "Invalid credentials",
        authResponseId("credentials.invalid"),
        401
      );
    const matches = await compareWithEncrypted(user.password, result.password);
    if (!matches)
      throw new AppException(
        "Invalid credentials",
        authResponseId("credentials.invalid"),
        401
      );
    const token = getJWT({
      email: result.email,
      id: result.id,
      role: result.role,
    });
    res.status(200).json(formatResponse({ token }));
  } catch (err) {
    next(err);
  }
};
