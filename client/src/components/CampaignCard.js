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
  

  // please remove
  componentWillReceiveProps(nextProps) {
    
    let newState
    
    newState = {data: nextProps.data}
    
    this.setState(newState)
    
  }

  handleCampaignClick(e) {
    let newState = {
      active: !this.state.active
    }
    this.setState(newState)
    this.props.handleActive(!this.state.active, this.state.data)
  }

  render() {
    const data = this.state.data;
    let inactiveLink = ("/charities/" + data._charity + "/campaigns/" + data._id + "/materials")
    let activeLink = ("/charities/" + data._charity)  
    return (
      <div className="CampaignCard">
        <ListGroupItem  active={this.state.active} className="thin-card" onClick={this.handleCampaignClick}>
          {/* what the fuck */}
          <Link to={this.state.active ? activeLink : inactiveLink}> 
          <Row> 
            <Col className="no-border flex"><div className="whitespace flex"><img className="thin-card-img campaign-img" src={data.pictureUrl} alt={"Image of " + data.title + " from " + data._charity} /></div></Col>
            <Col className="no-border flex"><div className="thin-card-txt">{data.title}</div></Col>
          </Row>
          </Link>  
        </ListGroupItem>
      </div>
    );
  }
}  



export default CampaignCard;
