export const CLIENT_PATH = (paths?: string[], ids?: string[]) => {
  if (!paths || paths.length === 0) return "/";

  const pathPart = paths.join("/");
  const idPart = ids?.join("/") ?? "";

  return `/${[pathPart, idPart].filter(Boolean).join("/")}`;
};

export const SERVER_PATH = (paths?: string[]) => {
  if (!paths || paths.length === 0) return "/api/v1";

  return `/api/v1/${paths.join("/")}`;
};
