export const resIdsGenerator =
  <T>(entityName: string) =>
  (id: T) =>
    `${entityName}.${id}`;
