import React, { Component } from 'react';
import { ListGroupItem, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
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
    // console.log("Material Click handled")
    console.log("handlematerialclick modal: ", this.state.modal)
    let newState = {modal : !this.state.modal}
    this.setState(newState)
  }

  render() {
    // console.log("MatC Data: ", this.state.data)  
    // console.log("MatC render match", this.props.data)
    
    return (
      <div className="MaterialCard" onClick={this.handleMaterialClick}>
            <Card>
              <img className="full-card-img" src={this.state.data.pictureUrl}/>
              <CardBody>
                <CardTitle>{this.state.data.title}</CardTitle>
                <CardText>From {this.state.data.dateRangeStart} to {this.state.data.dateRangeEnd}</CardText>
              </CardBody>
              <CardFooter className="card-footer">{this.state.data.description}</CardFooter>
            </Card>
            {this.state.modal && <MaterialModal data={this.state.data} modal={this.state.modal}/>}
      </div>
    );
  }
}  
       


// my old:
// <Col className="no-border flex"><div className="whitespace flex"><img className="thin-card-img campaign-img" src={this.state.data.pictureUrl} /></div></Col>
// <Col className="no-border flex"><div className="thin-card-txt">{this.state.data.title}</div></Col>

export default MaterialCard;
