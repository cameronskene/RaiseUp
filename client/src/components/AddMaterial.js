//// ADD MATERIAL COMPONENT 

import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
// import './AddCountry.css';


class AddMaterial extends Component {
  constructor(props) {
    super(props)

    // fundraisingType
    this.state = {
      _charity: this.props.match.params.charid,
      _campaign: this.props.match.params.campid,
      title: "",
      channels: "Direct Mail",
      dateRangeStart: "",
      dateRangeEnd: "",
      description: "",
      mediaType: "Video",
      pictureUrl: "",
      sourceUrl: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      _charity: this.state._charity,
      _campaign: this.state._campaign,
      title: this.state.title,
      channels: this.state.channels,
      dateRangeStart: this.state.dateRangeStart,
      dateRangeEnd: this.state.dateRangeEnd,
      description: this.state.description,
      mediaType: this.state.mediaType,
      pictureUrl: this.state.pictureUrl,
      sourceUrl: this.state.sourceUrl,
      message: null
    }
    // console.log('DATA in handleClick: ', data)
    api.postMaterials(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          title: "",
          channels: "Direct Mail",
          dateRangeStart: "",
          dateRangeEnd: "",
          description: "",
          mediaType: "Video",
          pictureUrl: "",
          sourceUrl: "",
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
      <div className="AddMaterial">
        <h2>Add Material </h2>
        <form>
          Material Name/ Title: <input type="text" value={this.state.title} onChange={(e) => {this.handleInputChange("title", e)}} /> <br/>
          {
            //   "Direct Mail",
            //   "Email",
            //   "Video",
            //   "Online",
            //   "Social Media",
            //   "Thank Yous/ Receipts"
          }
          Channel: 
          
          <select name="channels" value={this.state.channels} onChange={(e) => {this.handleInputChange("channels", e)}}>
            <option value="Direct Mail">Direct Mail</option>
            <option value="Email">Email</option>
            <option value="Video">Video</option>
            <option value="Online">Online</option>
            <option value="Social Media">Social Media</option>
            <option value="Thank Yous/ Receipts">Thank Yous/ Receipts</option>
          </select>
          
          <br/>
          Material Date Range:
              <label htmlFor="dateRangeStart">Start</label>
              <input type="date" id="start" name="dateRangeStart"
                    value={this.state.dateRangeStart}
                    onChange={(e) => {this.handleInputChange("dateRangeStart", e)}} />

              <label htmlFor="dateRangeEnd">End</label>
              <input type="date" id="end" name="dateRangeEnd"
                    value={this.state.dateRangeEnd} 
                    onChange={(e) => {this.handleInputChange("dateRangeEnd", e)}} />
          <br/>
          Material Preview Image URL: <input type="text" value={this.state.pictureUrl} onChange={(e) => {this.handleInputChange("pictureUrl", e)}}  /> <br/>
          Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => {this.handleInputChange("description", e)}} ></textarea> <br/>
           {// mediaType: 
            //   "Video",
            //   "Image",
            //   "Text",
            //   "Website"
           }
            mediaType: 
          
            <select name="mediaType" value={this.state.mediaType} onChange={(e) => {this.handleInputChange("mediaType", e)}}>
              <option value="Video">Video</option>
              <option value="Image">Image</option>
              <option value="Text">Text</option>
              <option value="Website">Website</option>
            </select><br/>
            Source Url: <input type="text" value={this.state.sourceUrl} onChange={(e) => {this.handleInputChange("sourceUrl", e)}} /> 
          <button onClick={(e) => this.handleClick(e)}>Create material</button>
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

export default AddMaterial;
