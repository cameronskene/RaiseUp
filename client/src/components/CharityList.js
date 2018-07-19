import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import {ListGroup} from 'reactstrap';
import CharityCard from './CharityCard';

class CharityList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      type: this.props.type,
      active: this.props.active,
    }
  }

  // componentDidMount() {
  //   // on first mount get all charities
  //   if (this.state.data[0]._charity === null) {
  //     api.getCharities()
  //     .then(charities => {
  //       charities.map(charity => {
  //         charity._charity = null
  //       })
  //       this.setState({
  //         data: charities,
  //         type: "charity",
  //         active: charities[0]
  //       })
  //     })
  //     .catch(err => console.log(err))
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (this.state.active === []) {
      this.setState({
      data: nextProps.data,
      active: nextProps.active,
      })
    }
    else {
      this.setState({
        data: nextProps.data,
        // active: nextProps.active
        })
    }
    if(nextProps.data[0] && nextProps.data[0]._charity) {
      // modify above condition if needed
      // console.log("CL render data IF condition ")
      this.setState({
        type: "campaign"
      })
    }
    else if(nextProps.data[0] && !nextProps.data[0]._charity) {
      // modify above condition if needed
      // console.log("CL render data ELSE IF condition ")
      this.setState({
        type: "charity"
      })  
    }  
  }
  handleActive(result, data) {
    // console.log("handleActive Charity List! " + result + "   " + data.name)
    this.setState({
      active: data
    })
    // console.log("CL this.state.active ", this.state.active)
  }

  render() {     
    // console.log("this.state.type in CharityList render ", this.state.type)
    // console.log("CL render data: ", this.state.data)
    // console.log("CL render active: ", this.state.active)
    // console.log("CL render data state type: ", this.state.type)

    return (
      <div className="Charities">

        <ListGroup>
         
        { this.state.data.map(data => { 
          if (this.state.active && this.state.type === "charity") {
            {/* console.log("CL map render type === charity") */}
            return <CharityCard key={data._id}  handleActive={this.handleActive.bind(this)} active={this.state.active._id == data._id} data={data}/>
          } 
            
          else if (this.state.type === "campaign") {
            {/* console.log("CL map render type === campaign, ", this.state.active._charity) */}
            return  <CharityCard key={data._charity._id}  handleActive={this.handleActive.bind(this)} active={this.state.active._id == data._charity._id} data={data._charity}/>  
          }
            
        })} 
        </ListGroup>
    
        
      </div>
    );
  }
}



export default CharityList;

