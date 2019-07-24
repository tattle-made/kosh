import React from "react";
import "./view/style/stylesheet.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//components
import Cards from "./view/components/Cards";
import CardDetails from "./view/components/CardDetails";
import FooterSite from "./view/components/Footer";
import InfoPanel from "./view/components/InfoPanel";
import UsersTable from "./view/pages/Users";
import PostsTable from "./view/pages/Posts";
import SideNav from "./view/components/SideNav";
import PostsTableItem from "./view/components/PostData";
import LoginCard from "./view/pages/Login";
import UserCreate from "./view/pages/UserCreate";
import UserUpdate from "./view/pages/UserUpdate";
import PrivateRoute from "./view/components/PrivateRoute";
import history from "./core-utils/history";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
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
        </div>
      </Router>
    </Provider>
  );
}

export default App;
