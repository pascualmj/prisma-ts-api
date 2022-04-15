import { formatResponse } from "@app/utils/formatResponse";
import { GlobalTypes } from "@app-types/global";
import * as TasksService from "./tasks.services";
import { TasksTypes } from "./tasks.types";

export const getAll: GlobalTypes.AppControllerWithQueryParams<
  TasksTypes.GetAllQueryParams
> = async (req, res, next) => {
  const qp = req.query || {};
  try {
    const result = await TasksService.getAll(qp);
    res.status(200).json(formatResponse(result.data, { meta: result.meta }));
  } catch (err) {
    next(err);
  }
};

export const getById: GlobalTypes.AppControllerWithRouteParams<
  TasksTypes.GetOneRouteParams
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TasksService.getOne(id);
    res.status(200).json(formatResponse(result));
  } catch (err) {
    next(err);
  }
};

export const create: GlobalTypes.AppControllerWithBody<
  Omit<TasksTypes.CreateBody, "userId">
> = async (req, res, next) => {
  const task = req.body || {};
  const user = req.user;
  try {
    const result = await TasksService.create({ ...task, userId: user?.id });
    res.status(200).json(formatResponse(result));
  } catch (err) {
    next(err);
  }
};

export const edit: GlobalTypes.AppController<
  TasksTypes.GetOneRouteParams,
  TasksTypes.EditBody
> = async (req, res, next) => {
  const { id } = req.params;
  const task = req.body || {};
  try {
    const result = await TasksService.update(Number(id), task);
    res.status(200).json(formatResponse(result));
  } catch (err) {
    next(err);
  }
};
