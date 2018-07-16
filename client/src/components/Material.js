import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Material extends Component {
  constructor(props) {
    super(props)
    this.state = {
      material: {}
    }
  }
  componentDidMount() {
    console.log("componentDidMount: charid: ", this.props.match.params)
    api.getMaterial(this.props.match.params.charid, this.props.match.params.campid, this.props.match.params.mateid)
      .then(material => {
        this.setState({
          material
        })
      })
      .catch(err => console.log(err))
  }
  render() {    
    return (
      <div className="Material">
        <h2>{this.state.material.title}</h2>
        <img src={this.state.material.pictureUrl} alt={"Image of" + this.state.material.title}></img> <br /> <br />
        <p>Channel: {this.state.material.channels}</p>
        <p>Active: From {this.state.material.dateRangeStart} To {this.state.material.dateRangeEnd}</p>
        <p>Media Type: {this.state.material.mediaType} </p>
        Source Url: <a href={this.state.material.sourceUrl}>{this.state.material.sourceUrl}</a>
        <p>Description: {this.state.material.description}</p>
      </div>
    );
  }
}          

export default Material;
