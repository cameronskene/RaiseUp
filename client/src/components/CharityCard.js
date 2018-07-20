import React, { Component } from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class CharityCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      active: this.props.active
    }
    this.handleCharityClick = this.handleCharityClick.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      active: nextProps.active
    })
    // console.log("CC cWRP: ", nextProps.active)
  }

  handleCharityClick(e) {
    // console.log("Charity Click handled")
    // console.log("handlecharityclick tag state.active", this.state.active)
    let newState = {
      active: !this.state.active
    }
    this.setState(newState)
    this.props.handleActive(!this.state.active, this.state.data)
  }

  render() {    
    // console.log("CC render active: " + this.state.data.name + "  " + this.state.active)
    return (
      <div className="CharityCard">
        <ListGroupItem active={this.state.active} className="thin-card" onClick={this.handleCharityClick}>
          <Link to={"/charities/" + this.state.data._id}>
          <Row> 
          <Col md="6" className="no-border flex"><div className="whitespace flex"><img className="thin-card-img" src={this.state.data.pictureUrl} /></div></Col>
          <Col md="6" className="no-border flex"><div className="thin-card-txt">{this.state.data.name}</div></Col>
          </Row>
          </Link>
        </ListGroupItem>
      </div>
    );
  }
}          

          {/* <ListGroupItem active tag="a" href="#" action>Cras justo odio
          <ListGroupItem tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem> */}

export default CharityCard;
