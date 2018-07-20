import React, { Component } from 'react';
import CampaignCard from './CampaignCard'
import { ListGroup, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api';


class MaterialList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {_id: null, _materials: null},
      // active: ,
    }
  }
  
  componentDidMount() {
    // console.log("ML component did mount")
    this.setState({
      data: this.props.data
    })
  }
  
  

  render() {   
    
    // console.log("ML props:  ", this.state.data)
      return (
      <div className="MaterialList">
        {/* <ListGroup> */}
          <ul>
          {this.state.data._materials && this.state.data._materials.map(material => {
            return <li>{material.title}</li>
          })}
          </ul>
        {/* </ListGroup> */}
      </div>)
    
  }
}          



export default MaterialList;
