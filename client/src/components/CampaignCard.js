import React, { Component } from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class CampaignCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      active: this.props.active
    }
    this.handleCampaignClick = this.handleCampaignClick.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    
    let newState
    
    newState = {data: nextProps.data}
    
    this.setState(newState)
    
  }

  handleCampaignClick(e) {
    // console.log("Campaign Click handled")
    // console.log("handlecharityclick tag state.active", this.state.active)
    let newState = {
      active: !this.state.active
    }
    this.setState(newState)
    // this.props.handleActive(!this.state.active, this.state.data)
    this.props.handleActive(!this.state.active, this.state.data)
  }

  render() {
    // console.log("CampC Data: ", this.state.data)  
    // console.log("CampC render match", this.props.data)
    let inactiveLink = ("/charities/" + this.state.data._charity + "/campaigns/" + this.state.data._id + "/materials")
    let activeLink = ("/charities/" + this.state.data._charity)  
    return (
      <div className="CampaignCard">
        <ListGroupItem  active={this.state.active} className="thin-card" onClick={this.handleCampaignClick}>
          <Link to={this.state.active ? activeLink : inactiveLink}> 
          <Row> 
            <Col className="no-border flex"><div className="whitespace flex"><img className="thin-card-img campaign-img" src={this.state.data.pictureUrl} /></div></Col>
            <Col className="no-border flex"><div className="thin-card-txt">{this.state.data.title}</div></Col>
          </Row>
          </Link>  
        </ListGroupItem>
      </div>
    );
  }
}  



export default CampaignCard;
