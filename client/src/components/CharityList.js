import React, { Component } from 'react';
import {ListGroup} from 'reactstrap';
import CharityCard from './CharityCard';

class CharityList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      type: this.props.type,
      active: this.props.active,
    }
  };

  //please remove this
  componentWillReceiveProps(nextProps) {
    if (this.state.active === []) {
      this.setState({
      data: nextProps.data,
      active: nextProps.active,
      })
    }
    else {
      this.setState({
        data: nextProps.data,
        })
    }
    if(nextProps.data[0] && nextProps.data[0]._charity) {
      this.setState({
        type: "campaign"
      })
    }
    else if(nextProps.data[0] && !nextProps.data[0]._charity) {
      this.setState({
        type: "charity"
      })  
    }  
  };

  handleActive(result, data) {
    this.setState({
      active: data
    })
  }

  render() {     
    return (
      <div className="Charities">

        <ListGroup>
         
        { this.state.data.forEach(data => { 
          if (this.state.active && this.state.type === "charity") {
            return <CharityCard key={data._id}  handleActive={this.handleActive.bind(this)} active={this.state.active._id === data._id} data={data}/>
          } 
          else if (this.state.type === "campaign") {
            return  <CharityCard key={data._charity._id}  handleActive={this.handleActive.bind(this)} active={this.state.active._id === data._charity._id} data={data._charity}/>  
          }
            
        })} 
        </ListGroup>
      </div>
    );
  }
}



export default CharityList;

