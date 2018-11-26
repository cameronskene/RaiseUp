import React, { Component } from "react";
import { ListGroupItem, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class CharityCard extends Component {
  handleCharityClick() {
    this.props.handleActiveCharity(this.props.data._id);
  }

  render() {
    const { data, activeCharity } = this.props;
    return (
      <ListGroupItem
        key={data._id}
        active={data._id === activeCharity || data._id === activeCharity._id}
        className="CharityCard thin-card"
        onClick={this.handleCharityClick.bind(this)}
      >
        <Link to={"/charities/" + data._id}>
          <Row>
            <Col md="6" className="no-border flex">
              <div className="whitespace flex">
                <img
                  className="thin-card-img"
                  src={data.pictureUrl}
                  alt={"Image of " + data.name}
                />
              </div>
            </Col>
            <Col md="6" className="no-border flex">
              <div className="thin-card-txt">{data.name}</div>
            </Col>
          </Row>
        </Link>
      </ListGroupItem>
    );
  }
}

export default CharityCard;
