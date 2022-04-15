import { formatResponse } from "@app/utils/formatResponse";
import { GlobalTypes } from "@app-types/global";
import * as UsersService from "./users.services";
import { UsersTypes } from "./users.types";

export const register: GlobalTypes.AppControllerWithBody<
  UsersTypes.CreateBody
> = async (req, res, next) => {
  const user = req.body || {};
  try {
    const result = await UsersService.create(user);
    res.status(201).json(
      formatResponse({
        createdAt: result.createdAt,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
      })
    );
  } catch (err) {
    next(err);
  }
};

export const getAll: GlobalTypes.AppControllerWithQueryParams<
  UsersTypes.GetAllQueryParams
> = async (req, res, next) => {
  const qp = req.query || {};
  try {
    const result = await UsersService.getAll(qp);
    res.status(200).json(formatResponse(result.data, { meta: result.meta }));
  } catch (err) {
    next(err);
  }
};
