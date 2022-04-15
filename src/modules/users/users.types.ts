import { User as PrismaUser } from "@prisma/client";
import { GlobalTypes } from "@app-types/global";

export namespace UsersTypes {
  export type User = PrismaUser;

  export type GetAllQueryParams = GlobalTypes.GetAllQueryParams<keyof User>;

  export type GetOneRouteParams = Pick<User, "email">;

  export type CreateBody = Pick<
    User,
    "email" | "password" | "firstName" | "lastName" | "role"
  >;

  export type EditBody = Partial<Omit<User, "email" | "password">>;

  export type LoginBody = Pick<User, "email" | "password">;

  export type UserRole = User["role"];

  export type Validators = {
    create: CreateBody;
    login: LoginBody;
  };
}
