import { prisma } from "@app/database";
import { TasksTypes } from "@app/modules/tasks/tasks.types";
import { getAllRecords } from "@app/utils/paginationUtils";

export const getAll = async (options: TasksTypes.GetAllQueryParams) =>
  getAllRecords<TasksTypes.Task>(prisma.task, {
    limit: options.limit,
    page: options.page,
    search: options.search,
    findSearchOn: ["title", "description"],
    orderBy: options.orderBy,
    orderDir: options.orderDir,
    select: {
      id: true,
      title: true,
      description: true,
      completed: true,
      updatedAt: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

export const getOne = (id: TasksTypes.GetOneRouteParams["id"]) =>
  prisma.task.findUnique({ where: { id: Number(id) } });

export const create = (entity: TasksTypes.CreateBody) =>
  prisma.task.create({ data: entity });

export const update = async (id: number, entity: TasksTypes.EditBody) =>
  prisma.task.update({ where: { id }, data: entity });
