import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Charities from './Charities';
import AddCharity from './AddCharity';
import AddCampaign from './AddCampaign';
import AddMaterial from './AddMaterial';
import Login from './Login';
import Signup from './Signup';
import Charity from './Charity';
import Campaign from './Campaign';
import Material from './Material';
import api from '../api';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {  
                 
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://i.redditmedia.com/F0RzgUdHUm8w4rdE42c5GVyR7GcZ0JhdgjesODEwRek.jpg?w=480&s=91c054a7d954398703a759264dcf7ce7" alt="logo" style={{height: "55%"}} />
          <h1 className="App-title">Hello, Thomas. You are quite good at... turning me on.</h1>
          <Link to="/">Home</Link> 
          {api.isLoggedIn() && <Link to="/charities">Charities</Link>} 
          {api.isLoggedIn() && <Link to="/add-charity">Add Charity</Link>} 
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }

        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/charities" exact component={Charities} />
          <Route path="/add-charity" component={AddCharity} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/charities/:id" exact component={Charity} />
          <Route path={"/charities/:id/campaigns/add"} component={AddCampaign} />
          <Route path={"/charities/:charid/campaigns/:campid"} exact component={Campaign} />
          <Route path={"/charities/:charid/campaigns/:campid/materials/add"} component={AddMaterial} />
          <Route path={"/charities/:charid/campaigns/:campid/materials/:mateid"} component={Material} />
          
          <Route render={() => <h2>404- Page not found</h2>} />
        </Switch>        
      </div>
    );
  }
}

export default App;
