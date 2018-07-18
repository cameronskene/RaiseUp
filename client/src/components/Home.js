import React, { Component } from 'react';
import Search from './Search';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{name: ""}]
    }
  }
  handleResults(results) {
    // console.log("in app: ", results)
    this.setState({
      data: results
    })
  }
  // this goes to the new children components
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     data: nextProps.data
  //   })
  // }
  render() {   
    // console.log(" this.state.data in HOME", this.state.data)             
    return (
      <div className="Home">
        <Search handleResults={this.handleResults.bind(this)}/>
        <h2>Home</h2>
        <p>THIS IS THE HOME PAGE: {this.state.data[0].title}</p>
        
      </div>
    );
  }
}

export default Home;
