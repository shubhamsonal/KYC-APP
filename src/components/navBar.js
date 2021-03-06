import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "./css/navBar.css";
import history from '../history';

export default class KYCNavBar extends React.Component {
    constructor(props){
        super(props);
        let checkedState = localStorage.getItem("theme") === "dark" ? true : false;
        let themeState = localStorage.getItem("theme");

        let lightButtonState, darkButtonState;
        if(themeState==="light"){
            lightButtonState = "idButton active btn btn-outline-primary";
            darkButtonState = "idButton btn btn-outline-primary";
        }
        else{
            lightButtonState = "idButton btn btn-outline-primary";
            darkButtonState = "idButton active btn btn-outline-primary";
        }

        this.state={
            collapsed:true,
            checked : checkedState,
            theme : themeState,
            lightButton: lightButtonState,
            darkButton: darkButtonState,
            currentPage: true
        };
        this.toggleThemeChange=this.toggleThemeChange.bind(this);
        this.toggleNavbar=this.toggleNavbar.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleClickOutside=this.handleClickOutside.bind(this);
    }

  toggleNavbar(){

    if (this.state.collapsed) {
      document.addEventListener('click', this.handleClickOutside, false);
    }
    else {
      document.removeEventListener('click', this.handleClickOutside, false);
    }
    let collapsedState=this.state.collapsed;
    this.setState({
        collapsed: !(collapsedState),
    })
  }

  toggleThemeChange = (themeState) => {
    if (themeState === "dark") {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      this.setState({
        lightButton: "idButton btn btn-outline-primary",
        darkButton: "idButton active btn btn-outline-primary",
      });
    } else {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
        this.setState({
            lightButton: "idButton active btn btn-outline-primary",
            darkButton: "idButton btn btn-outline-primary",
        });
    }
    this.toggleNavbar();
  }

  handleClick(){
    this.toggleNavbar();
    return history.push('/');
  }

  handleClickOutside(e){
    if (this.node.contains(e.target)) {
      return;
    }

    this.toggleNavbar();
  }

  componentDidMount() {
    document
    .getElementsByTagName("HTML")[0]
    .setAttribute("data-theme", localStorage.getItem("theme"));
  }

  render(){
    let CP;
    if(sessionStorage.getItem('currentPage')==='/' || sessionStorage.getItem('currentPage')==='/success'){
      CP=<></>
    }
    else{
      CP = <NavItem><div className="id"><button type="button" className="idButton btn btn-outline-primary" onClick={this.handleClick}>Logout</button></div></NavItem>
    }
    return (
        <div ref={node => { this.node = node; }}>
          <Navbar style={{backgroundColor: '#28a745'}} color="" light>
            <NavbarBrand style={{color: '#fff'}} className="mr-auto">Know Your Customer</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar className="navDrop">
                <div>
                <NavItem>
                    <div className="id"><button type="button" className={this.state.lightButton} onClick={() => this.toggleThemeChange("light")}>Light</button></div>
                </NavItem>
                <NavItem>
                    <div className="id"><button type="button" className={this.state.darkButton} onClick={() => this.toggleThemeChange("dark")}>Dark</button></div>
                </NavItem>
                </div>
                <div>
                  {CP}
                </div>
              </Nav>

            </Collapse>
          </Navbar>
        </div>
    );
  }
}
