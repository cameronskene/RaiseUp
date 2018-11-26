import React, { Component } from "react";
import CampaignCard from "./CampaignCard";
import { ListGroup } from "reactstrap";

class CampaignList extends Component {
  render() {
    if (this.props.data) {
      const { activeCampaign, handleActiveCampaign } = this.props;
      const data = this.props.data.map(campaign => (
        <CampaignCard
          key={campaign._id}
          data={campaign}
          activeCampaign={activeCampaign}
          handleActiveCampaign={handleActiveCampaign}
        />
      ));
      return (
        <div className="CampaignList">
          <ListGroup>{data}</ListGroup>
        </div>
      );
    }
    return <div className="CampaignList" />;
  }
}

export default CampaignList;
