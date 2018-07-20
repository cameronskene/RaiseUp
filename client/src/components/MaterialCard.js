import React, { Component } from 'react';
import { ListGroupItem, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';


class MaterialCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
    // this.handleCampaignClick = this.handleCampaignClick.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  // handleCampaignClick(e) {
  //   // console.log("Campaign Click handled")
  //   // console.log("handlecharityclick tag state.active", this.state.active)
   
  // }

  render() {
    // console.log("MatC Data: ", this.state.data)  
    // console.log("MatC render match", this.props.data)
    
    return (
      <div className="MaterialCard">
            <Card>
              <img className="full-card-img" src={this.state.data.pictureUrl}/>
              <CardBody>
                <CardTitle>{this.state.data.title}</CardTitle>
                <CardText>From {this.state.data.dateRangeStart} to {this.state.data.dateRangeEnd}</CardText>
              </CardBody>
              <CardFooter>{this.state.data.description}</CardFooter>
            </Card>
      </div>
    );
  }
}  
       


// my old:
// <Col className="no-border flex"><div className="whitespace flex"><img className="thin-card-img campaign-img" src={this.state.data.pictureUrl} /></div></Col>
// <Col className="no-border flex"><div className="thin-card-txt">{this.state.data.title}</div></Col>

export default MaterialCard;
