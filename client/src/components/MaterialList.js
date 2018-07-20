import React, { Component } from 'react';
import CampaignCard from './CampaignCard'
import { ListGroup, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import MaterialCard from './MaterialCard';

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
    let left = []
    let right = []
    this.state.data._materials && this.state.data._materials.map((material, i) => {
      if (i % 2 === 0) {
        left.push(<MaterialCard data={material}/>)
      }
      else if (i % 2 === 1) {
        right.push(<MaterialCard data={material}/>)
      }
    })
    return (
      <div className="MaterialList">
            <Col xs="6" className="material-left">
              {left.map(elem => elem)}
            </Col> 
            <Col xs="6" className="material-right">
              {right.map(elem  => elem)}
            </Col>  
      </div>) 
  }
}          



export default MaterialList;
