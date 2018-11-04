import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Route } from 'react-router-dom';
import Search from './Search';
import CharityList from './Charity/CharityList';
import CampaignList from './Campaign/CampaignList';
import MaterialList from './Material/MaterialList';
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
    api.getCharities()
    .then(data => {
      console.log("Home.js component did mount api: getCharities()")
      this.setState({
        data: data,
        active: data[0]
      })
    })
    .catch(err => console.log(err))
  }
  
  

  // please remove
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
    // what the fuck is this?
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
