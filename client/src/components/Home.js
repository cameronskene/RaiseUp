import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
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
    return (
      <div className="Home">
      
        <Search handleResults={this.handleResults.bind(this)}/>
        <Container>
          <Row>
            <Col><CharityList data={this.state.data}/></Col> 
            <Col>.col2</Col>
            <Col>.col3</Col>
            <Col>.col4</Col>
          </Row>
        </Container>  
        
      </div>
    );
  }
}

export default Home;
