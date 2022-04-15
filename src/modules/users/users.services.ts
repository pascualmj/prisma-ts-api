import { prisma } from "@app/database";
import { UsersTypes } from "@app/modules/users/users.types";
import { validateUser } from "@app/modules/users/users.validators";
import { usersResponseId } from "@app/modules/users/users.responseIds";
import { AppException } from "@app/config/AppException";
import { encryptValue } from "@app/utils/encryptValue";
import { getAllRecords } from "@app/utils/paginationUtils";

export const getAll = async (options: UsersTypes.GetAllQueryParams) =>
  getAllRecords<UsersTypes.User>(prisma.user, {
    limit: options.limit,
    page: options.page,
    search: options.search,
    findSearchOn: ["email", "firstName", "lastName"],
    orderBy: options.orderBy,
    orderDir: options.orderDir,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      updatedAt: true,
      createdAt: true,
    },
  });

export const getOne = (email: UsersTypes.GetOneRouteParams["email"]) =>
  prisma.user.findUnique({ where: { email } });

export const create = async (entity: UsersTypes.CreateBody) => {
  const { error } = validateUser("create", entity);
  if (error)
    throw new AppException(
      "User body format not valid",
      usersResponseId("validation.error")
    );
  entity.password = await encryptValue(entity.password);
  return prisma.user.create({ data: entity });
};

export const update = async (id: number, entity: UsersTypes.EditBody) =>
  prisma.user.update({ where: { id }, data: entity });
