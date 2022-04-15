import { resIdsGenerator } from "@app/utils/resIdsGenerator";

const responseIds = ["validation.error", "credentials.invalid"] as const;

export const authResponseId =
  resIdsGenerator<typeof responseIds[number]>("auth");
