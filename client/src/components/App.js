import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import AddCharity from './AddCharity';
import AddCampaign from './AddCampaign';
import AddMaterial from './AddMaterial';
import Login from './Login';
import Signup from './Signup';

import api from '../api';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }
  handleResults(results) {
    // console.log("in app: ", results)
    this.setState({
      data: results
    })
  }

  render() {
    // console.log("this.state.data in APP.js: ", this.state.data)  
    return (
      <div className="App">
        <header> {/* className="App-header"*/}

          {/* {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }  */}

        </header>
        <Switch>

          {/* having these routes above the home component makes them all accessible from the URL bar. I might be able to use this to make links(buttons) to them in their respective list components. */}

          <Route path="/charities/add" component={AddCharity} />
          <Route path="/charities/:charid/campaigns/add" component={AddCampaign} />
          <Route path={"/charities/:charid/campaigns/:campid/materials/add"} component={AddMaterial} />

          {/* my route problems come down to the home component loading every time the page is loaded or refreshed, irrespective of the url entered. this prevents link sharing and persistence.

          to solve this, I might have to duplicate the home component in the /charities /campaigns and /materials routes, rather than just having it contain all other components associated with those routes.  */}

          <Route path="/" component={Home} />


          {/* As of 11.9.18, I haven't integrated users. I will disable these until I do.
           <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} /> */}


          <Route render={() => <h2>404- Page not found</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
