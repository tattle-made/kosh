import { BREADCRUMBS } from "./types";

export const breadcrumbsAdd = breadcrumbs => {
  return {
    type: BREADCRUMBS,
    payload: breadcrumbs
  };
};
