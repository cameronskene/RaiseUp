import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import {ListGroup} from 'reactstrap';
import CharityCard from './CharityCard';

class CharityList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{_charity: null}],
      type: "loading"
    }
  }

  componentDidMount() {
    // on first mount get all charities
    if (this.state.data[0]._charity === null) {
      api.getCharities()
      .then(charities => {
        charities.map(charity => {
          charity._charity = null
        })
        this.setState({
          data: charities,
          type: "charity"
        })
      })
      .catch(err => console.log(err))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    })
    if(nextProps.data[0] && nextProps.data[0]._charity) {
      // modify above condition if needed
      console.log("CL render data IF condition ")
      this.setState({
        type: "campaign"
      })
    }
    else if(nextProps.data[0] && !nextProps.data[0]._charity) {
      // modify above condition if needed
      console.log("CL render data ELSE IF condition ")
      this.setState({
        type: "charity"
      })  
    }  
  }


  render() {     
    // console.log("this.state.type in CharityList render ", this.state.type)

    console.log("CL render data: ", this.state.data)

    
    console.log("CL render data state type: ", this.state.type)

    return (
      <div className="Charities">
        

        <ListGroup>
        {this.state.data.map(data => { 
          if (this.state.type === "charity")
            return <CharityCard data={data}/>
          else if (this.state.type === "campaign")
            return  <CharityCard data={data._charity}/>  
        })} 
        </ListGroup>
    
        
      </div>
    );
  }
}



export default CharityList;

