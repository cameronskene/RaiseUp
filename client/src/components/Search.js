import React from 'react';
import { Col } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Input,
  Button } from 'reactstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      isOpen: false,
      searchBy: "",
      query: "",
      dropdownTag: "Search by"
    };
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  handleSearch(e) {
    e.preventDefault();
    let searchQuery = {[this.state.searchBy]: this.state.query};
    this.props.handleSearchQuery(searchQuery);
    this.setState({
      isOpen: false,
      searchBy: "",
      query: "",
      dropdownTag: "Search by"
    })
  };

  handleDropdownClick(e) {
    this.setState({
      searchBy: e.target.getAttribute("data-action"),
      dropdownTag: e.target.firstChild.data 
    })
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
      <Col md="3">
          <NavbarBrand className='mr-2' href="/"><img className="brand" src="/raiseup_transparent.png" alt="Logo of RaiseUp"/></NavbarBrand>
      </Col>    
      <Col md="9" className="mx-auto">    
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav  navbar>
              <UncontrolledDropdown nav inNavbar className="mb-2 mr-sm-2 mb-sm-0 mt-0.5">
                <DropdownToggle nav caret={this.state.dropdownTag === "Search by"} className="mb-2 mr-sm-2 mb-sm-0 mt-0.5">
                  {this.state.dropdownTag}
                </DropdownToggle>
                <div className="selector">
                <DropdownMenu left="true"> 
                  <DropdownItem data-action="name" onClick={this.handleDropdownClick}>
                    Charity Name
                  </DropdownItem>
                  <DropdownItem data-action="sector" onClick={this.handleDropdownClick}>
                    Charity Sector
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem data-action="title" onClick={this.handleDropdownClick}>
                    Campaign Title
                  </DropdownItem>
                  <DropdownItem data-action="fundraisingType" onClick={this.handleDropdownClick}>
                    Campaign Fundraising Type
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem data-action="channels" onClick={this.handleDropdownClick}>
                    Material Channel
                  </DropdownItem>
                </DropdownMenu>
                </div>
              </UncontrolledDropdown>
              <div>
              <Form  onSubmit={this.handleSearch} inline >
                <FormGroup row>
                    <Input className="mb-2 mr-sm-2 mb-sm-0" type="text" name="query" onChange={this.handleInputChange} id="search" value={this.state.query} placeholder="What are you looking for?" />
                    <Button className="mb-2 mr-sm-2 mb-sm-0" >Search</Button>
                </FormGroup>
              </Form>
              </div>  
            </Nav>
          </Collapse>
        </Col>  
        </Navbar>
      </div>
    );
  }
};

export default Search;