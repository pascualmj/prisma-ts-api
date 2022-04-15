type Options = {
  code?: number;
  type?: "error" | "success";
  message?: string;
  responseId?: string | null;
  meta?: Record<string, unknown>;
};

export const formatResponse = (
  data: Error | Record<string, unknown> | any[] | null,
  options: Options = {}
) => {
  return {
    statusCode:
      options.code ||
      (options.type === "error" && 400) ||
      (data instanceof Error && 500) ||
      200,
    message:
      options.message ||
      (((options.code || 0) >= 400 || data instanceof Error) &&
        ((!Array.isArray(data) && data?.message) || "Error")) ||
      "Success",
    ...(options.type !== "error" &&
      (options.code || 0) < 400 &&
      !(data instanceof Error) && { data }),
    ...(options.responseId && { responseId: options.responseId }),
    ...(options.meta && { meta: options.meta }),
    ...(data instanceof Error && {
      stack: data.stack || null,
    }),
  };
};
