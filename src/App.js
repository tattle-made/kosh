import React from "react";
import "./style/stylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app1.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//components
import Login from "./components/Login";
import Cards from "./components/Cards";
import CardDetails from "./components/CardDetails";
import Header from "./components/Header";
import FooterSite from "./components/Footer";
import SearchInput from "./components/SearchInput";
import InfoPanel from "./components/InfoPanel";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Loading from "./components/Loading";
import RegisterUser from "./components/RegisterUser";
import Users from "./components/Users";
import PostsTable from "./components/PostsTable";
import SideNav from "./components/SideNav";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/cards" component={Cards} />
          <Route exact path="/card/:id" component={CardDetails} />
          <Route exact path="/header" component={Header} />
          <Route path="/" component={FooterSite} />
          <Route exact path="/search" component={SideNav} />
          <Route exact path="/infoPanel" component={InfoPanel} />
          <Route exact path="/sidebar" component={Sidebar} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/loading" component={Loading} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/users" component={SideNav} />
          <Route exact path="/posts" component={SideNav} />
          <Route path="/" component={SideNav} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
