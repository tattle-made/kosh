import React, { Component } from "react";

//Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import InfoPanel from "./InfoPanel";
import Footer from "./Footer";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <InfoPanel />
        <Footer />
      </div>
    );
  }
}

export default Home;
