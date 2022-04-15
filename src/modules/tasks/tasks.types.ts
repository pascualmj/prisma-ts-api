import { Task as PrismaTask } from "@prisma/client";
import { GlobalTypes } from "@app-types/global";

export namespace TasksTypes {
  export type Task = PrismaTask;

  export type GetAllQueryParams = GlobalTypes.GetAllQueryParams<keyof Task>;

  export type GetOneRouteParams = Pick<Task, "id">;

  export type CreateBody = Pick<
    Task,
    "title" | "userId" | "description" | "completed"
  >;

  export type EditBody = Partial<CreateBody>;
}
