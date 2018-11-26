import React, { Component } from "react";
import { ListGroupItem, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class CampaignCard extends Component {
  handleCampaignClick() {
    this.props.handleActiveCampaign(this.props.data._id);
  }

  render() {
    const { data, activeCampaign } = this.props;
    return (
      <div className="CampaignCard">
        <ListGroupItem
          active={data._id === activeCampaign}
          className="thin-card"
          onClick={this.handleCampaignClick.bind(this)}
        >
          {/* <Link to={}> */}
          <Row>
            <Col className="no-border flex">
              <div className="whitespace flex">
                <img
                  className="thin-card-img campaign-img"
                  src={data.pictureUrl}
                  alt={"Image of " + data.title + " from " + data._charity}
                />
              </div>
            </Col>
            <Col className="no-border flex">
              <div className="thin-card-txt">{data.title}</div>
            </Col>
          </Row>
          {/* </Link>   */}
        </ListGroupItem>
      </div>
    );
  }
}

export default CampaignCard;
