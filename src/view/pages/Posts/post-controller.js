import {
  postByTime,
  postByTimeAndUsers,
  fetchPosts
} from "../../../redux/actions/post";

const onSearchByDate = (props, startDate, endDate, page) => {
  console.log("search by date");

  props.postByTime(page, startDate.getTime(), endDate.getTime());
};

const onSearchByTimeAndUser = (
  props,
  selectedUsers,
  startDate,
  endDate,
  page
) => {
  console.log("search by date and userrrrrrrrrrrrrrrrrrrr");

  const users_id = [];
  console.log();
  selectedUsers.forEach(user => users_id.push(user.value));
  props.postByTimeAndUsers(
    page,
    users_id,
    startDate.getTime(),
    endDate.getTime()
  );
};

// const refresh = page => {
//   console.log("refreshing");
//   fetchPosts(page);
// };

const onSearch = (data, filter, props) => {
  // console.log("final data", data);
  const path = props.location.pathname;
  let page = path.split("/posts/")[1];
  if (page === "") {
    page = 1;
  }

  const { username, from, to } = data;
  if (filter === "date") {
    return onSearchByDate(props, from, to, page);
  } else if (filter === "name") {
    return onSearchByTimeAndUser(props, username, from, to, page);
  } else {
    return null;
  }
};
// const PostsTablePage = withRouter(
//     connect(
//       mapStateToProps,
//       { fetchPosts, postDelete, postByTime, postByTimeAndUsers }
//     )(PostsTable)
//   );

export { onSearch, onSearchByDate, onSearchByTimeAndUser };
