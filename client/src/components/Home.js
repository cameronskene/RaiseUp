import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Route, Link, Switch } from 'react-router-dom';
import Search from './Search';
import CharityList from './CharityList';
import CampaignList from './CampaignList';
import MaterialList from './MaterialList';
import api from '../api';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{ name: "" }],
      type: "loading",
      active: [],
      campaignList: false,
      materialList: false,
      activeCampaign: null
    }
  }
  componentDidMount() {
    // on first mount get all charities
    if (this.state.data[0].name === "") {

      api.getCharities()
        .then(charities => {
          console.log("raiseup java backend. get all charities: ", charities)
          charities.map(charity => {
            charity._charity = null
          })
          this.setState({
            data: charities,
            active: charities[0]
          })
        })
        .catch(err => console.log("home js api getCharities error: ", err))
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== "/") {
      this.setState({
        campaignList: true,
        materialList: true,
      })
    }
  }

  handleResults(results) {

    this.setState({
      data: results,
      active: results[0],
      campaignList: false,
      materialList: false,
    })
  }

  handleCampaignActive(campaign) {
    this.setState({
      activeCampaign: campaign
    })
  }

  render() {
    const MaterialsRoute = ({ data }) => (
      <Route path="/charities/:charid/campaigns/:campid/materials"
        render={(props) => { return <MaterialList {...props} data={data} /> }}
      />
    );
    return (
      <div className="Home">
        <Search handleResults={this.handleResults.bind(this)} />
        <Container>
          <Row>
            <Col className="home-col"> <h4>Charities</h4><CharityList active={this.state.active} type={this.state.type} data={this.state.data} /></Col>
            <Col className="home-col"> <h4>Campaigns</h4>{this.state.campaignList && <Route path="/charities/:id" render={(props) => { return <CampaignList {...props} handleCampaignActive={this.handleCampaignActive.bind(this)} /> }} />}</Col>
            <Col className="home-col" xs="6"> <h4>Materials</h4>
              {this.state.materialList && this.state.activeCampaign && <MaterialsRoute data={this.state.activeCampaign} />}
              {this.state.materialList && !this.state.activeCampaign && <MaterialsRoute />}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
