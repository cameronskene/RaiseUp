import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Campaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaign: {_materials: []}
    }
  }
  componentDidMount() {
    api.getCampaign(this.props.match.params.charid, this.props.match.params.campid)
      .then(campaign => {
        this.setState({
          campaign
        })
      })
      .catch(err => console.log(err))
  }
  render() {    
    console.log("Campaign component render, _charity: ", this.state.campaign._charity)
    return (
      <div className="Campaign">
        <h2>{this.state.campaign.title}</h2>
        <img src={this.state.campaign.pictureUrl} alt={"Logo of" + this.state.campaign.title}></img> <br /> <br />
        <p>Fundraising Type: {this.state.campaign.fundraisingType}</p>
        <p>Active: From {this.state.campaign.dateRangeStart} To {this.state.campaign.dateRangeEnd}</p>
        <p>Agencies: {this.state.campaign.agencies} </p>
        <p>Description: {this.state.campaign.description}</p>
        
        <h3>Materials:</h3>
        <ul> {/* when this is done: replace below with Materials component*/}
          {this.state.campaign._materials.map(material => {
            return (<li key={material._id}><Link to={"/charities/"+ this.state.campaign._charity +"/campaigns/" + material._campaign + "/materials/" + material._id}>{material.title}</Link></li>)
          })}
        </ul>
        <Link to={"/charities/" + this.state.campaign._charity + "/campaigns/" + this.state.campaign._id + "/materials/add"} >Add Material</Link>
      </div>
    );
  }
}          

export default Campaign;
