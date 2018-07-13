import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Charities from './Charities';
import AddCharity from './AddCharity';
import Secret from './Secret';
import Login from './Login';
import Signup from './Signup';
import Charity from './Charity';
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
          {/* <Link to="/secret">Secret</Link>  */}
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/charities" exact component={Charities} />
          <Route path="/add-charity" component={AddCharity} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/charities/:id" component={Charity} />
          {/* <Route path="/secret" component={Secret} /> */}
          <Route render={() => <h2>404</h2>} />
        </Switch>        
      </div>
    );
  }
}

export default App;
