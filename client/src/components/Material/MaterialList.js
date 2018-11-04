import React, { Component } from 'react';
import { Col } from 'reactstrap';
import MaterialCard from './MaterialCard';

class MaterialList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {_id: null, _materials: null},
    }
  }
  
  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }
  
  render() {   
    const materials = this.state.data._materials;
    let leftMaterialColumn = [];
    let rightMaterialColumn = [];

    if (materials) {
      materials.forEach((material, i) => {
        if (i % 2 === 0)
          leftMaterialColumn.push(<MaterialCard data={material}/>); 
        else 
          rightMaterialColumn.push(<MaterialCard data={material}/>);
      });
    };

    return (
      <div className="MaterialList">
            <Col xs="6" className="material-left">
              {leftMaterialColumn.map(elem => elem)}
            </Col> 
            <Col xs="6" className="material-right">
              {rightMaterialColumn.map(elem  => elem)}
            </Col>  
      </div>) 
  }
}          



export default MaterialList;
