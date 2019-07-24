import React, { Component } from "react";
import DateFilter from "../atomic-components/DateFilter";
import UsernameFilter from "../atomic-components/UsernameFilter";

class SearchPostFilterParameters extends Component {
  render() {
    console.log("props search para", this.props);
    return (
      <div>
        {this.props.filter === "date" ? (
          <DateFilter
            startDate1={this.props.startDate2}
            endDate={this.props.endDate}
            onSearch={this.props.onSearch}
            onStartDate1={this.props.onStartDate2}
            onEndDate1={this.props.onEndDate2}
            icon={this.props.icon}
          />
        ) : this.props.filter === "name" ? (
          <UsernameFilter
            users={this.props.users}
            selectedUsers={this.props.selectedUsers}
            onUserSelect={this.onUserSelect}
            icon={this.props.icon}
            startDate={this.props.startDateUsernameFilter}
            endDate={this.props.endDateUsernameFilter}
            onSearch={this.props.onSearchUsernameFilter}
            onStartDate={this.props.onStartDateUsernameFilter}
            onEndDate={this.onEndDateUsernameFilter}
            onSearchFinal={this.onSearchFinal}
          />
        ) : null}
      </div>
    );
  }
}

export default SearchPostFilterParameters;
