const itemList = path => {
  const len = path.length;
  console.log(len);
  const breadcrumbItems = [];
  console.log("path received ", path);
  let string = "";
  for (let i = 1; i < len; i++) {
    if (path[i] === ":") {
      break;
    } else if (path[i] === "/") {
      breadcrumbItems.push(string);
      string = "";
    } else if (path[i] >= "a" && path[i] <= "z" && i === len - 1) {
      string += path[i];
      breadcrumbItems.push(string);
      string = "";
    } else if (path[i] >= "a" && path[i] <= "z") {
      string += path[i];
    }
    // console.log(i, string, breadcrumbItems);
  }
  // console.log(breadcrumbItems);
  return breadcrumbItems;
};

export default itemList;
