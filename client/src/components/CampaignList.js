import React, { Component } from 'react';
import CampaignCard from './CampaignCard'
import { ListGroup } from 'reactstrap';
import api from '../api';


class CampaignList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
      active: {_id: null},
    }
  }

  // please remove
  componentWillReceiveProps(nextProps) {
    api.getCharity(nextProps.match.params.id).then(result => {
      this.setState({
        data: result
      })
    }) 
  }
  componentDidMount() {
    if (this.state.data === "") {
      api.getCharity(this.props.match.params.id).then(result => {
        this.setState({
          data: result
        })
      }) 
    }
  }
  handleActive(result, data) {
    this.setState({
      active: data
    })
    this.props.handleCampaignActive(this.state.active)
  }

  render() {   
    if  (this.state.data._campaigns) {
      return (
      <div className="CampaignList">
        <ListGroup>
        {this.state.data._campaigns.map(campaign => {
          return <CampaignCard handleActive={this.handleActive.bind(this)} data={campaign} active={this.state.active._id === campaign._id}/>
        })}
        
        </ListGroup>
      </div>
    )};
    return <div className="CampaignList"/>
  }
}          

export default CampaignList;
