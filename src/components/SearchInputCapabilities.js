export const SearchInputCapabilities = ({ role }) => {
  switch (role) {
    case "SUPER_ADMINISTRATOR":
      return true;
    case "ADMINISTRATOR":
      return true;
    case "EDITOR":
      return true;
    case "AUTHOR":
      return true;
    case "CONTRIBUTOR":
      return false;
    case "SUBSCRIBER":
      return false;
    default:
      return false;
  }
};
