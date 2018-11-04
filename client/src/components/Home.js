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
      activeCharity: {},
      activeCampaign: {}
    }
  }

  componentDidMount() {
    api.getCharities()
    .then(result => {
      this.setState({
        data: result
      })
    })
    .catch(err => console.log(err))
  }
  

  handleSearchQuery(searchQuery) {
    api.getCampaignsByQuery(searchQuery)
    .then(results => {
      this.setState({
        data: results,
      })
    })
  };


  
  render() {
    // const CampaignsRoute = ({ data }) => (
    //   <Route path="/charities/:charid/campaigns" 
    //   render={ (props) =>  <CampaignList {...props} data={data}/> }
    //   />
    // );
    // const MaterialsRoute = ({ data }) => (
    //   <Route path="/charities/:charid/campaigns/:campid/materials"
    //     render={ (props) =>  <MaterialList {...props}  data={data} /> }
    //   />
    // );
    return (
      <div className="Home">
        <Search handleSearchQuery={this.handleSearchQuery.bind(this)} />
        <Container> 
          <Row>
            <Col className="home-col"> 
              <h4>Charities</h4>
              <CharityList  data={this.state.data} />
            </Col>
            <Col className="home-col"> 
              {/* <h4>Campaigns</h4> 
              <CampaignsRoute data={} />  */}
            </Col>
            <Col className="home-col" xs="6"> 
              {/* <h4>Materials</h4>
              <MaterialsRoute data={} />  */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
