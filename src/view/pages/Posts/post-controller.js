const onSearchByDate = (props, startDate, endDate, page) => {
  props.postByTime(page, startDate.getTime(), endDate.getTime());
};

const onSearchByTimeAndUser = (
  props,
  selectedUsers,
  startDate,
  endDate,
  page
) => {
  const users_id = [];

  selectedUsers.forEach(user => users_id.push(user.value));
  props.postByTimeAndUsers(
    page,
    users_id,
    startDate.getTime(),
    endDate.getTime()
  );
};

const onSearch = (data, filter, props) => {
  const path = props.location.pathname;
  let page = path.split('/posts/')[1];
  if (page === '') {
    page = 1;
  }

  const { username, from, to } = data;
  if (filter === 'date') {
    return onSearchByDate(props, from, to, page);
  } else if (filter === 'name') {
    return onSearchByTimeAndUser(props, username, from, to, page);
  } else {
    return null;
  }
};

export { onSearch, onSearchByDate, onSearchByTimeAndUser };
