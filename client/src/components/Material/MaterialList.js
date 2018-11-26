import React, { Component } from "react";
import { Col } from "reactstrap";
import MaterialCard from "./MaterialCard";

class MaterialList extends Component {
  render() {
    const { data } = this.props;
    let leftMaterialColumn = [];
    let rightMaterialColumn = [];

    if (data) {
      data.forEach((material, i) => {
        const materialCard = (
          <MaterialCard data={material} key={material._id} />
        );

        if (i % 2 === 0) leftMaterialColumn.push(materialCard);
        else rightMaterialColumn.push(materialCard);
      });
      return (
        <div className="MaterialList">
          <Col xs="6" className="material-left">
            {leftMaterialColumn}
          </Col>
          <Col xs="6" className="material-right">
            {rightMaterialColumn}
          </Col>
        </div>
      );
    }
    return <div className="MaterialsList" />;
  }
}

export default MaterialList;
