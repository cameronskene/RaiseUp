import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Charities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{_charity: null}]
    }
  }

  componentDidMount() {
    if (this.state.data[0]._charity === null) {
      api.getCharities()
      .then(charities => {
        charities.map(charity => {
          charity._charity = null
        })

        this.setState({
          data: charities
        })
      })
      .catch(err => console.log(err))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }


  render() {     
       
    return (
      <div className="Charities">
        <ul>
          {/* <Charity /> */}
          {this.state.data[0]._charity === null  &&this.state.data.map((c, i) => <li key={i}><Link to={"charities/" + c._id}>{c.name}</Link></li>)}
          {this.state.data[0]._charity !== null  && this.state.data.map(campaign => {
            return <li key={campaign._charity._id}><Link to={"charities/" + campaign._charity._id}>{campaign._charity.name}</Link></li>
            }
          )}
        </ul>
      </div>
    );
  }
}

export default Charities;

