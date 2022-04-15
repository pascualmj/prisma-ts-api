import { UsersTypes } from "@app/modules/users/users.types";
import { Request, Response, NextFunction } from "express";

export namespace GlobalTypes {
  export type AppController<P = unknown, B = unknown, Q = unknown> = (
    req: Request<P, unknown, B, Q>,
    res: Response,
    next: NextFunction
  ) => any;

  export type AppControllerWithQueryParams<Q> = AppController<
    unknown,
    unknown,
    Q
  >;

  export type AppControllerWithRouteParams<P> = AppController<
    P,
    unknown,
    unknown
  >;

  export type AppControllerWithBody<B> = AppController<unknown, B, unknown>;

  export type AppTokenContent = {
    id: UsersTypes.User["id"];
    email: UsersTypes.User["email"];
    role: UsersTypes.User["role"];
  };

  export type AppPaginationQueryParams<T = never> = {
    orderBy?: T;
    orderDir?: "asc" | "desc";
    search?: string;
    limit?: string;
    page?: string;
  };

  export type GetAllQueryParams<O> = {
    orderBy?: O;
    orderDir?: "asc" | "desc";
    search?: string;
    limit?: string;
    page?: string;
  };
}
