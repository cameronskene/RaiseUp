import React, { Component } from 'react';
import { Card,CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import  MaterialModal  from './MaterialModal';


class MaterialCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      modal: false
    }
    this.handleMaterialClick = this.handleMaterialClick.bind(this)
  }
  
  
  handleMaterialClick(e) {
    let newState = {modal : !this.state.modal}
    this.setState(newState)
  }

  render() {
    const data = this.state.data;
    return (
      <div className="MaterialCard" onClick={this.handleMaterialClick}>
            <Card>
              <img className="full-card-img" src={data.pictureUrl} alt={"Image of " + data.title + " from " + data._charity + "."}/>
              <CardBody>
                <CardTitle>{data.title}</CardTitle>
                <CardText>From {data.dateRangeStart} to {data.dateRangeEnd}</CardText>
              </CardBody>
              <CardFooter className="card-footer">{data.description}</CardFooter>
            </Card>
            {this.state.modal && <MaterialModal data={data} modal={this.state.modal}/>}
      </div>
    );
  }
}  
       

export default MaterialCard;
