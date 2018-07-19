import React, { Component } from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class CampaignCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      // active: this.props.active
    }
    // this.handleCharityClick = this.handleCharityClick.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      // active: nextProps.active
    })
    // console.log("CC cWRP: ", nextProps.active)
  }

  // handleCharityClick(e) {
  //   // console.log("Charity Click handled")
  //   // console.log("handlecharityclick tag state.active", this.state.active)
  //   let newState = {
  //     active: !this.state.active
  //   }
  //   this.setState(newState)
  //   this.props.handleActive(!this.state.active, this.state.data)
  // }

  render() {    
    return (
      <div>
        <ListGroupItem className="thin-card">
          
          <Row> 
          <Col className="no-border flex"><div className="whitespace flex"><img className="thin-card-img" src={this.state.data.pictureUrl} /></div></Col>
          <Col className="no-border flex"><div className="thin-card-txt">{this.state.data.name}</div></Col>
          </Row>
          
        </ListGroupItem>
      </div>
    );
  }
}  

        {/* <ListGroupItem active={this.state.active} className="thin-card" onClick={this.handleCharityClick}>
          <Link to={"/charities/" + this.state.data._id}>
          <Row> 
          <Col className="no-border flex"><div className="whitespace flex"><img className="thin-card-img" src={this.state.data.pictureUrl} /></div></Col>
          <Col className="no-border flex"><div className="thin-card-txt">{this.state.data.name}</div></Col>
          </Row>
          </Link>
        </ListGroupItem> */}

export default CampaignCard;
