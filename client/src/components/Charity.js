import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Charity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charity: {},
      newCampaign: {}
    }
  }
  componentDidMount() {
    api.getCharity(this.props.match.params.id)
      .then(charity => {
        this.setState({
          charity
        })
        
        // console.log("has populate worked? charity._campaigns: ", this.state.charity._campaigns)
      })
      .catch(err => console.log(err))
  }
  render() {    
    console.log("this.state.charity._id: ",this.state.charity._id + " typeof: " + typeof(this.state.charity._id))
    console.log("RENDER has populate worked? charity._campaigns: ", this.state.charity._campaigns)
    return (
      <div className="Charity">
        <h2>{this.state.charity.name}</h2>
        <img src={this.state.charity.pictureUrl} alt={"Logo of" + this.state.charity.name }></img> <br /> <br />
        Website: <a href={this.state.charity.website}>{this.state.charity.website}</a>
        
        <p> Sector: {this.state.charity.sector}</p>
        <p>Description: {this.state.charity.description}</p>

        <h3>Campaigns:</h3>
        <ul> {/* when this is done: replace below with Campaign component
          
              TO ASK MAXENCE: this is the player detail situation right? the component doesn't rerender after the api has been called.. so it returns UNDEFINED if I try to do a map.
          */}
          <li>{/* this.state.charity !== [] && this.state._campaigns[0].title */}</li>
        </ul>
        <Link to={"/charities/"+ this.state.charity._id +"/campaigns/add"} >Add Campaign</Link>
      </div>
    );
  }
}

{/*this.state.charity._campaigns.map((campaign,i) => {
            return (<li key={campaign._id}><p>{campaign.title}</p><img src={campaign.pictureUrl} alt={"picture of " + campaign.title}/></li>)
          })*/}
          

export default Charity;
