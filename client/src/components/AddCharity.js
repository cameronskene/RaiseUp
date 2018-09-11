import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
import { Container, Row, Col } from 'reactstrap';
// import './AddCountry.css';


class AddCharity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      sector: "Education & Research",
      description: "",
      website: "",
      pictureUrl: "",
      message: null,
      file: null
    }
  }

  handleInputChange(stateFieldName, event) {
    console.log("handleInputChange");

    let newState = {}
    if (stateFieldName === "file") {
      newState.file = event.target.files[0]
    }
    else {
      newState[stateFieldName] = event.target.value
    }
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()

    let data = {
      name: this.state.name,
      sector: this.state.sector,
      description: this.state.description,
      website: this.state.website,
      // try changing back to this.state.pictureUrl
      pictureUrl: this.state.file,
      message: null
    }
    api.postCharities(data)
      .then(result => {
        // console.log('SUCCESS!')
        this.setState({
          file: null,
          name: "",
          sector: "Education & Research",
          description: "",
          website: "",
          pictureUrl: "",
          message: `Your charity '${this.state.name}' has been created`
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
      <div className="AddCharity">
        <h2>Add Charity</h2>
        <Container>
          <Row>
            <Col lg="4">
              <form encType="multipart/form-data">
                Charity Name: <input type="text" value={this.state.name} onChange={(e) => { this.handleInputChange("name", e) }} /> <br />
                Sector
          <select name="Sector" value={this.state.sector} onChange={(e) => { this.handleInputChange("sector", e) }}>
                  <option value="Education & Research">Education & Research</option>
                  <option value="Health">Health</option>
                  <option value="Social Services">Social Services</option>
                  <option value="Development & Housing">Development & Housing</option>
                  <option value="Religion">Religion</option>
                  <option value="Law & Advocacy">Law & Advocacy</option>
                  <option value="Culture & Recreation">Culture & Recreation</option>
                  <option value="International Aid">International Aid</option>
                  <option value="Environment/ Animals">Environment/ Animals</option>
                </select>

                <br />
                Website <input type="text" value={this.state.website} onChange={(e) => { this.handleInputChange("website", e) }} /> <br />
                Picture/ Logo <input type="text" value={this.state.pictureUrl} onChange={(e) => { this.handleInputChange("pictureUrl", e) }} />
                <input type="file" name="picture" onChange={(e) => { this.handleInputChange("file", e) }} />
                <br />
                Description <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
                <button onClick={(e) => this.handleClick(e)}>Create charity</button>
              </form>
              <div style={{
                margin: 10,
                backgroundColor: "red",
                display: this.state.message ? "block" : "none"
              }}>
                {this.state.message}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddCharity;
