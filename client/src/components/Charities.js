import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Charities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charities: []
    }
  }
  componentDidMount() {
    api.getCharities()
      .then(charities => {
        console.log(charities)
        this.setState({
          charities
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="Charities">
        <h2>List of charities</h2>
        {this.state.charities.map((c, i) => <li key={i}><Link to={"charities/" + c._id}>{c.name}</Link></li>)}
      </div>
    );
  }
}

export default Charities;
