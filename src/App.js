import React from "react";
import "./view/style/stylesheet.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

//components
import Cards from "./view/components/Cards";
import CardDetails from "./view/components/CardDetails";
import FooterSite from "./view/components/Footer";
import InfoPanel from "./view/components/InfoPanel";
import SideNav from "./view/components/SideNav";
import LoginCard from "./view/pages/Login";
import PrivateRoute from "./view/components/PrivateRoute";

import { PersistGate } from "redux-persist/integration/react";
import { connect } from "net";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={LoginCard} />
            </Switch>

            {/* <Switch>
              <Route exact path="/login" component={LoginCard} />
            </Switch> */}
            <Route path="/" component={FooterSite} />
            <Switch>
              <PrivateRoute exact path="/cards" component={Cards} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/card/:id" component={CardDetails} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/search" component={SideNav} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/infoPanel" component={InfoPanel} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/users" component={SideNav} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/users/:page" component={SideNav} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/posts" component={SideNav} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/posts/:page" component={SideNav} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={SideNav} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/sidenav" component={SideNav} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/users/update/:id"
                component={SideNav}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/users/delete/:id"
                component={SideNav}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/users/create" component={SideNav} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

// const mapStateToProps = ({
//   state
// })

// const AppMain = connect(mapStateToProps,{})(App);
export default App;
