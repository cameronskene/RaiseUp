import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
// import './AddCountry.css';


class AddCampaign extends Component {
  constructor(props) {
    super(props)

    // fundraisingType
    this.state = {
      _charity: this.props.match.params.id,
      title: "",
      fundraisingType: "Appeal",
      dateRangeStart: "",
      dateRangeEnd: "",
      description: "",
      agencies: [],
      pictureUrl: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    let agency = ""
    if (stateFieldName !== "agencies") {
      newState[stateFieldName] = event.target.value
    }
    else {
      // clear array of partially complete agency titles
      newState.agencies = []
      agency = event.target.value
      // push agency name
      newState.agencies.push(agency)
    }
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      _charity: this.state._charity,
      title: this.state.title,
      fundraisingType: this.state.fundraisingType,
      dateRangeStart: this.state.dateRangeStart,
      dateRangeEnd: this.state.dateRangeEnd,
      description: this.state.description,
      agencies: this.state.agencies,
      pictureUrl: this.state.pictureUrl,
      message: null
    }
    // console.log('DATA in handleClick: ', data)
    api.postCampaigns(data)
      .then(result => {
        // console.log('SUCCESS! this.state._charity: ', this.state._charity)
        this.setState({
          _charity: this.state._charity,
          title: "",
          fundraisingType: "Appeal",
          dateRangeStart: "",
          dateRangeEnd: "",
          description: "",
          agencies: [],
          pictureUrl: "",
          message: `Your campaign '${this.state.title}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => {
        console.log('ERROR')
      })
  }
  render() {              
    return (
      <div className="AddCampaign">
        <h2>Add Campaign </h2>
        <form>
          Campaign Title/ Headline: <input type="text" value={this.state.title} onChange={(e) => {this.handleInputChange("title", e)}} /> <br/>
          Fundraising Type: 
          {/* 
          "Appeal",
          "Acquisition",
          "Bequest",
          "Regular Giving",
          "Events",
          "Community Fundraising",
          "Raffles",
          "Sponsorship",
          "Newsletters"
          */}
          <select name="fundraisingType" value={this.state.fundraisingType} onChange={(e) => {this.handleInputChange("fundraisingType", e)}}>
            <option value="Appeal">Appeal</option>
            <option value="Acquisition">Acquisition</option>
            <option value="Bequest">Bequest</option>
            <option value="Regular Giving">Regular Giving</option>
            <option value="Events">Events</option>
            <option value="Community Fundraising">Community Fundraising</option>
            <option value="Raffles">Raffles</option>
            <option value="Sponsorship">Sponsorship</option>
            <option value="Newsletters">Newsletters</option>
          </select>
          
          <br/>
          Campaign Date Range:
              <label htmlFor="dateRangeStart">Start</label>
              <input type="date" id="start" name="dateRangeStart"
                    value={this.state.dateRangeStart}
                    onChange={(e) => {this.handleInputChange("dateRangeStart", e)}} />

              <label htmlFor="dateRangeEnd">End</label>
              <input type="date" id="end" name="dateRangeEnd"
                    value={this.state.dateRangeEnd} 
                    onChange={(e) => {this.handleInputChange("dateRangeEnd", e)}} />
          <br/>
          Campaign Preview Image URL: <input type="text" value={this.state.pictureUrl} onChange={(e) => {this.handleInputChange("pictureUrl", e)}}  /> <br/>
          Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => {this.handleInputChange("description", e)}} ></textarea> <br/>
          Agencies: <input type="text" value={this.state.agencies} onChange={(e) => {this.handleInputChange("agencies", e)}}  />
          <button onClick={(e) => this.handleClick(e)}>Create campaign</button>
        </form>
        <div style={{
          margin: 10,
          backgroundColor: "red",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default AddCampaign;
