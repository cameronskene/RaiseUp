import React, { Component } from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class CampaignList extends Component {

  render() {    
    // console.log("CC render active: " + this.state.data.name + "  " + this.state.active)
    return (
      <div>
        <span> Campaign List </span>
      </div>
    );
  }
}          

          {/* <ListGroupItem active tag="a" href="#" action>Cras justo odio
          <ListGroupItem tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem> */}

export default CampaignList;
