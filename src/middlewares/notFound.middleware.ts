import { GlobalTypes } from "@app-types/global";
import { formatResponse } from "@app/utils/formatResponse";

export const notFoundHandler: GlobalTypes.AppController = (req, res, next) => {
  res
    .status(404)
    .json(formatResponse({}, { code: 404, message: "Resource not found" }));
};
