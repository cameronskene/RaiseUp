import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import CharityCard from './CharityCard';

class CharityList extends Component {
  
  render() {
  const { handleActiveCharity } = this.props
  const data = this.props.data.map(d =>  <CharityCard key={d._id} data={d} activeCharity={this.props.activeCharity}  handleActiveCharity={handleActiveCharity}/>)     
    return (
      <div className="Charities">
        <ListGroup>
        { data } 
        </ListGroup>
      </div>
    );
  }
};

export default CharityList;