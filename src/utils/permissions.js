import { ADMIN, SUBSCRIBER } from "./roleTypes";

export const getUserPermissions = role => {
  switch (role) {
    case ADMIN:
      return ["post:canDelete", "post:canUpload", "user:canView"];
    case SUBSCRIBER:
      return [];
    default:
      return [];
  }
};
