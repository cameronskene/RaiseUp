import React, { Component } from 'react';
import api from '../api';

class Charity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charity: {}
    }
  }
  componentDidMount() {
    console.log(this.props.match.params.id)
    api.getCharity(this.props.match.params.id)
      .then(charity => {
        console.log(charity)
        this.setState({
          charity
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="Charity">
        <h2>{this.state.charity.name}</h2>
        <img src={this.state.charity.pictureUrl} alt={"Logo of" + this.state.charity.name }></img>
        Website: <a href={this.state.charity.website}></a>
        {/* website doesn't work!*/}
        <p> Sector: {this.state.charity.sector}</p>
        <p>Description: {this.state.charity.description}</p>
      </div>
    );
  }
}

export default Charity;
