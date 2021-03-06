import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Search from "./Search";
import CharityList from "./Charity/CharityList";
import CampaignList from "./Campaign/CampaignList";
import MaterialList from "./Material/MaterialList";
import api from "../api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ name: "", _id: "" }],
      activeCharity: { name: "", _id: "" },
      activeCampaign: { title: "" }
    };
  }

  componentDidMount() {
    api
      .getCharities()
      .then(result => {
        this.setState({
          data: result
        });

        const pathname = this.props.location.pathname;

        if (pathname !== "/") {
          const charid = pathname.substring(11, 35);
          const campid = pathname.substring(46, 70);
          api.getCharity(charid).then(result => {
            let activeCampaign = null;
            if (campid) {
              activeCampaign = result._campaigns.find(campaign => campaign._id === campid);
            } else {
              activeCampaign = { title: "" };
            }
            this.setState({
              activeCharity: result,
              activeCampaign
            });
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleSearchQuery(searchQuery) {
    api.getCharitiesByQuery(searchQuery).then(result => {
      const data = result.map(elem => {
        if (elem._charity !== undefined) {
          return elem._charity;
        } else {
          return elem;
        }
      });
      this.setState({
        activeCharity: { name: "", _id: "" },
        activeCampaign: { title: "" },
        data
      });
    });
  }

  handleActiveCharity(activeCharityID) {
    this.setState({
      activeCharity: activeCharityID,
      activeCampaign: { title: "" }
    });
    api.getCharity(activeCharityID).then(result => {
      this.setState({
        activeCharity: result
      });
    });
  }

  handleActiveCampaign(activeCampaignID) {
    const activeCampaign = this.state.activeCharity._campaigns.find(campaign => campaign._id === activeCampaignID);

    this.setState({
      activeCampaign
    });
  }

  render() {
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
              <h4>Materials</h4>
              <MaterialList data={activeCampaign._materials} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
