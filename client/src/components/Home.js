import React, { Component } from 'react';
import Search from './Search';
import CharityList from './CharityList';

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
        <CharityList data={this.state.data}/>
        
      </div>
    );
  }
}

export default Home;
