import React, { Component } from 'react';
import CampaignCard from './CampaignCard'
import { ListGroup, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api';


class CampaignList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
      active: {_id: null},
    }
    // this.handleCampaignActive = this.handleCampaignActive.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    // console.log("CampL cWRP nextProps: ", nextProps)
    // query api on subsequent
    api.getCharity(nextProps.match.params.id).then(result => {
      // console.log(result)
      this.setState({
        data: result
      })
    }) 
  }
  componentDidMount() {
    // query api on initial
    if (this.state.data === "") {
      api.getCharity(this.props.match.params.id).then(result => {
        // console.log(result)
        this.setState({
          data: result
        })
      }) 
    }
  }
  handleActive(result, data) {
    // console.log("handleActive Charity List! " + result + "   " + data.name)
    this.setState({
      active: data
    })
    // console.log("CampL this.state.active ", this.state.active)
    this.props.handleCampaignActive(this.state.active)

  }

  render() {   
    // console.log("CampL render campaigns: ", this.state.data.name)
    if  (this.state.data._campaigns) {
      return (
      <div className="CampaignList">
        <ListGroup>
        
        {/* <span> {this.state.data.name} </span> */}
        {this.state.data._campaigns.map(campaign => {
          return <CampaignCard handleActive={this.handleActive.bind(this)} data={campaign} active={this.state.active._id == campaign._id}/>
        })}
        
        </ListGroup>
      </div>
    )};
    return <div className="CampaignList"/>
  }
}          



export default CampaignList;
