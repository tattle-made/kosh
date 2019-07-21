import React from "react";
import "./style/stylesheet.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//components
import Cards from "./components/Cards";
import CardDetails from "./components/CardDetails";
import FooterSite from "./components/Footer";
import InfoPanel from "./components/InfoPanel";
import UsersTable from "./components/UsersTable";
import PostsTable from "./components/PostsTable";
import SideNav from "./components/SideNav";
import PostsTableItem from "./components/PostsTableItem";
import LoginCard from "./components/LoginCard";
import UserCreate from "./components/UserCreate";
import UserUpdate from "./components/UserUpdate";
import PrivateRoute from "./components/PrivateRoute";
import ReactSelect from "./components/ReactSelect";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={LoginCard} />
          <Route exact path="/cards" component={Cards} />
          <Route exact path="/card/:id" component={CardDetails} />
          <Route path="/" component={FooterSite} />
          <Route exact path="/search" component={SideNav} />
          <Route exact path="/infoPanel" component={InfoPanel} />
          <Route exact path="/users" component={SideNav} />
          <Switch>
            <PrivateRoute exact path={"/posts"} component={SideNav} />
            <Route exact path="/posts/:page" component={SideNav} />
          </Switch>
          <Route exact path="/post/:id" component={SideNav} />
          <Route exact path="/sidenav" component={SideNav} />
          <Route exact path="/login" component={LoginCard} />

          <Route exact path="/users/create" component={SideNav} />
          <Route exact path="/users/update/:id" component={SideNav} />
          <Route exact path="/users/delete/:id" component={SideNav} />
          <Route exact path="/test" component={ReactSelect} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
