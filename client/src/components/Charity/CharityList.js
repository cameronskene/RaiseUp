import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import CharityCard from "./CharityCard";

class CharityList extends Component {
  render() {
    const { handleActiveCharity, activeCharity } = this.props;
    const data = this.props.data.map(charity => (
      <CharityCard
        key={charity._id}
        data={charity}
        activeCharity={activeCharity}
        handleActiveCharity={handleActiveCharity}
      />
    ));

    return <ListGroup className="Charities">{data}</ListGroup>;
  }
}

export default CharityList;
