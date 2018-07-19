import React, { Component } from 'react';


class CharityCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  render() {    
    // console.log("CC render data: ", this.state.data)
    return (
      <div className="CharityCard">
        <li>{this.state.data.name}</li>
      </div>
    );
  }
}          

export default CharityCard;
