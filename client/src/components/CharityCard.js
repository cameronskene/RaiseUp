import React, { Component } from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';


class CharityCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      active: this.props.active
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      active: nextProps.active
    })
  }

  render() {    
    // console.log("CC render data: ", this.state.data)
    return (
      <div>
        <ListGroupItem className="thin-card">
          <Row> 
          <Col className="no-border flex"><img className="thin-card-img" src={this.state.data.pictureUrl} /></Col>
          <Col className="no-border flex"><div className="thin-card-txt">{this.state.data.name}</div></Col>
          </Row>
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
