import { resIdsGenerator } from "@app/utils/resIdsGenerator";

const responseIds = ["validation.error"] as const;

export const usersResponseId =
  resIdsGenerator<typeof responseIds[number]>("users");
