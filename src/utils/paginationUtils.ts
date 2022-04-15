import { prisma } from "@app/database";

export const getOffsetPagination = (
  limit?: string,
  page?: string,
  options?: { limitDefault: number }
) => {
  const _page = Number(page || "1");
  const _limit = Number(limit) || options?.limitDefault || 10;

  return {
    skip: (_page - 1) * _limit,
    take: _limit,
  };
};

type getAllRecordsOptions<T = any, S = any> = {
  paginated?: boolean;
  defaultOrderBy?: keyof T;
  orderDir?: "asc" | "desc";
  orderBy?: keyof T;
  search?: string;
  limit?: string;
  page?: string;
  findSearchOn?: (keyof T)[];
  select?: S;
};

export const getAllRecords = async <T>(
  dbEntity: any,
  options: getAllRecordsOptions<T>
) => {
  const { paginated = true } = options;
  const pagination = getOffsetPagination(options.limit, options.page);
  const where = options.search
    ? {
        where: {
          OR:
            options.findSearchOn?.map((prop) => ({
              [prop]: { contains: options.search, mode: "insensitive" },
            })) || {},
        },
      }
    : {};
  const orderBy = options.orderBy
    ? {
        orderBy: { [options.orderBy]: options.orderDir || "desc" },
      }
    : {
        orderBy: {
          [options.defaultOrderBy || "createdAt"]: options.orderDir || "desc",
        },
      };

  const result = await prisma.$transaction([
    dbEntity.count({ ...where }),
    dbEntity.findMany({
      ...where,
      ...orderBy,
      ...(paginated && pagination),
      ...(options.select && { select: options.select }),
    }),
  ]);

  return {
    meta: {
      ...(paginated && { limit: pagination.take || 10 }),
      ...(paginated && { page: Number(options.page || "1") }),
      count: result[0],
    },
    data: result[1],
  };
};
