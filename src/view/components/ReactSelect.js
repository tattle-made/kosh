import React, { Component } from "react";
import Select from "react-select";

const colorStyles = {
  //   control: styles => ({ ...styles, backgroundColor: "white" }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     const color = "#bada55";
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled ? "red" : "blue",
  //       color: "#FFF",
  //       cursor: isDisabled ? "not-allowed" : "default"
  //     };
  //   }
};

class ReactSelect extends Component {
  constructor(props) {
    super(props);
    let users = [];
    props.data.forEach(user => {
      users.push({ label: user.username, value: user.id });
    });
    this.state = {
      users: users
    };
    console.log("props ", props);
    console.log("state users ", this.state.users);
  }

  onUserSelect = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <Select
          isMulti
          value={selectedOption}
          onChange={this.onUserSelect}
          options={this.state.users}
          //
          // styeles={{ width: "500px" }}
          theme={theme => ({
            ...theme,
            // borderRadius: {"4px"},
            colors: {
              ...theme.colors,
              primary25: "white",
              primary: "#B3B3B3"
            }
          })}
        />
      </div>
    );
  }
}

export default ReactSelect;
