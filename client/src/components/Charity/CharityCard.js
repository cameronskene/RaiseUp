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
  
  // please remove
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      active: nextProps.active
    })
  }

  handleCharityClick(e) {
    let newState = {
      active: !this.state.active
    }
    this.setState(newState)
    this.props.handleActive(!this.state.active, this.state.data)
  }

  render() {
    const data =this.state.data;    
    return (
      <div className="CharityCard">
        <ListGroupItem active={this.state.active} className="thin-card" onClick={this.handleCharityClick}>
          <Link to={"/charities/" + data._id}>
          <Row> 
          <Col md="6" className="no-border flex"><div className="whitespace flex"><img className="thin-card-img" src={data.pictureUrl} alt={"Image of " + data.name} /></div></Col>
          <Col md="6" className="no-border flex"><div className="thin-card-txt">{data.name}</div></Col>
          </Row>
          </Link>
        </ListGroupItem>
      </div>
    );
  }
}          

export default CharityCard;
