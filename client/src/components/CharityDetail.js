import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class CharityDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charity: {_campaigns: []},
      // newCampaign: {}
    }
  }
  componentDidMount() {
    api.getCharity(this.props.match.params.id)
      .then(charity => {
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
        <img src={this.state.charity.pictureUrl} alt={"Logo of" + this.state.charity.name}></img> <br /> <br />
        Website: <a href={this.state.charity.website}>{this.state.charity.website}</a>
        
        <p> Sector: {this.state.charity.sector}</p>
        <p>Description: {this.state.charity.description}</p>

        <h3>Campaigns:</h3>
        <ul> {/* when this is done: replace below with Campaign component*/}
          {this.state.charity._campaigns.map(campaign => {
            return (<li key={campaign._id}><Link to={"/charities/"+ this.state.charity._id +"/campaigns/"+campaign._id}>{campaign.title}</Link></li>)
          })}
        </ul>
        <Link to={"/charities/"+ this.state.charity._id +"/campaigns/add"} >Add Campaign</Link>
      </div>
    );
  }
}          

export default CharityDetail;
