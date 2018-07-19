import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Route, Link, Switch } from 'react-router-dom';
import Search from './Search';
import CharityList from './CharityList';
import CampaignList from './CampaignList';
import api from '../api';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{name: ""}],
      type: "loading",
      active: []
    }
  }
  componentDidMount() {
    // on first mount get all charities
    if (this.state.data[0].name === "") {
      console.log("homejs mount")
      api.getCharities()
      .then(charities => {
        charities.map(charity => {
          charity._charity = null
        })
        this.setState({
          data: charities,
          active: charities[0]
        })
      })
      .catch(err => console.log(err))
    }
  }

  handleResults(results) {
    // console.log("in app: ", results)
    this.setState({
      data: results,
      active: results[0]
    })
    console.log("home handleres active: ", this.state.active)
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
            <Col ><CharityList  active={this.state.active} type={this.state.type} data={this.state.data}/></Col> 
            <Col ><Route path="/charities/:id" exact component={CampaignList}/></Col>
            <Col >.col3</Col>
            <Col >.col4</Col>
          </Row>
        </Container>  
        {/* <Route path="/charities/:id" exact component={CampaignList}/> */}
      </div>
    );
  }
}

export default Home;
