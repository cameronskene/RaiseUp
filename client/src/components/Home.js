import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { Route } from "react-router-dom";
import Search from "./Search";
import CharityList from "./Charity/CharityList";
import CampaignList from "./Campaign/CampaignList";
import MaterialList from "./Material/MaterialList";
import api from "../api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ name: "" }],
      activeCharity: { name: "" },
      activeCampaign: {}
    };
  }

  componentDidMount() {
    api
      .getCharities()
      .then(result => {
        this.setState({
          data: result
        });
        // persist through refreshes + allow for link sharing
        const pathname = this.props.location.pathname;
        if (pathname !== "/") {
          let charid = pathname.substring(11, 35);
          api.getCharity(charid).then(result => {
            this.setState({
              activeCharity: result
            });
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleSearchQuery(searchQuery) {
    api.getCharitiesByQuery(searchQuery).then(result => {
      this.setState({
        data: result
      });
    });
  }

  handleActiveCharity(activeCharityID) {
    // this handles the isActive for the clicked card while the async call is being made -- makes the user's click feel more 'instant'
    this.setState({
      activeCharity: activeCharityID,
      activeCampaign: { name: "" }
    });
    api.getCharity(activeCharityID).then(result => {
      this.setState({
        activeCharity: result
      });
    });
  }

  handleActiveCampaign(activeCampaignID) {
    this.setState({
      activeCampaign: activeCampaignID
    });
  }

  render() {
    // const CampaignsRoute = ({ data }) => (
    //   <Route
    //     path="/charities/:charid/campaigns"
    //     render={props => <CampaignList {...props} data={data} />}
    //   />
    // );
    // const MaterialsRoute = ({ data }) => (
    //   <Route path="/charities/:charid/campaigns/:campid/materials"
    //     render={ (props) =>  <MaterialList {...props}  data={data} /> }
    //   />
    // );

    console.log("render Home -- data: ", this.state.activeCharity);

    const { activeCharity, activeCampaign, data } = this.state;
    return (
      <div className="Home">
        <Search handleSearchQuery={this.handleSearchQuery.bind(this)} />
        <Container>
          <Row>
            <Col className="home-col">
              <h4>Charities</h4>
              <CharityList
                data={data}
                activeCharity={activeCharity}
                handleActiveCharity={this.handleActiveCharity.bind(this)}
              />
            </Col>
            <Col className="home-col">
              <h4>Campaigns</h4>
              <CampaignList
                data={activeCharity._campaigns}
                activeCampaign={activeCampaign}
                handleActiveCampaign={this.handleActiveCampaign.bind(this)}
              />
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
