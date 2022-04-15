import { resIdsGenerator } from "@app/utils/resIdsGenerator";

const responseIds = [] as const;

export const tasksResponseId =
  resIdsGenerator<typeof responseIds[number]>("tasks");
