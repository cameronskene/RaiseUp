import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import AddCharity from "./Charity/CRUD/AddCharity";
import AddCampaign from "./Campaign/CRUD/AddCampaign";
import AddMaterial from "./Material/CRUD/AddMaterial";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import api from "../api";

class App extends Component {
  constructor(props) {
    super(props);
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/charities/add" component={AddCharity} />
          <Route
            path={"/charities/:id/campaigns/add"}
            component={AddCampaign}
          />
          <Route
            path={"/charities/:charid/campaigns/:campid/materials/add"}
            component={AddMaterial}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
          <Route render={() => <h2>404- Page not found</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
