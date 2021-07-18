import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, 
    Collapse, NavItem, Button, Modal, 
    ModalBody, ModalHeader, FormGroup, Form, Input, 
    Label, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: (localStorage.getItem('token') === null) ? false : true,
            isNavOpen: false,
            isDropOpen: false,
            isPhoneModalOpen: false,
            isOtpModalOpen: false,
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModalPhone = this.toggleModalPhone.bind(this);
        this.toggleModalOtp = this.toggleModalOtp.bind(this);
        this.handleLoginPhone = this.handleLoginPhone.bind(this);
        this.handleLoginOtp = this.handleLoginOtp.bind(this);
        this.Logout= this.Logout.bind(this);
    }

    toggleDropdown() {
        this.setState({
            isDropOpen: !this.state.isDropOpen
        });
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModalPhone() {
        this.setState({
            isPhoneModalOpen: !this.state.isPhoneModalOpen
        });
    }

    toggleModalOtp() {
        this.setState({
            isOtpModalOpen: !this.state.isOtpModalOpen
        });
    }

    Logout(event) {
        localStorage.removeItem('token');
        this.setState({
            isLoggedIn: false
        });
        event.preventDefault();
    }

    handleLoginPhone(event) {
        this.toggleModalPhone();
        this.toggleModalOtp();
        console.log("Phone: " + this.phone.value );
        const data = {
            phone: this.phone.value
        };
        this.props.loginphone(data);
        event.preventDefault();
    }

    handleLoginOtp(event) {
        this.toggleModalOtp();
        console.log("OTP: " + this.otp.value);
        var data = {
            otp: this.otp.value,
            role: 'admin'
        }
        var login = this.props.loginotp(data);
        if(login) {
            this.setState({
                isLoggedIn: true
            });
        }
        event.preventDefault();
    }

    
    render() {
        console.log(this.state.isLoggedIn);
        return (
            <>              
                { this.state.isLoggedIn ? null : <Redirect to="/home" /> }
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/home">
                            <img src="/assets/logo.jpeg" height="30" width="30" alt="Barbera-Admin" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                {
                                    this.state.isLoggedIn ? 
                                    <>
                                        <Dropdown nav isOpen={this.state.isDropOpen} toggle={this.toggleDropdown}>
                                            <DropdownToggle nav caret>
                                                <span className="fa fa-info fa-lg"></span> Services
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>
                                                    <NavLink className="nav-link" to="/services" style={{color: 'black'}}>
                                                        Services
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem divider></DropdownItem>
                                                <DropdownItem>
                                                    <NavLink className="nav-link" to="/services/addservice" style={{color: 'black'}}>
                                                        Add Service
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavLink className="nav-link" to="/services/sliderupload" style={{color: 'black'}}>
                                                        Slider Upload
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavLink className="nav-link" to="/services/sliderdelete" style={{color: 'black'}}>
                                                        Slider Delete
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavLink className="nav-link" to="/services/typeupload" style={{color: 'black'}}>
                                                        Type Upload
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavLink className="nav-link" to="/services/typedelete" style={{color: 'black'}}>
                                                        Type Delete
                                                    </NavLink>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/mailer">
                                                <span className="fa fa-envelope fa-lg"></span> Mailer
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/coininc">
                                                <span className="fa fa-bitcoin fa-lg"></span> Coins
                                            </NavLink>
                                        </NavItem> 
                                    </>
                                    :
                                    null
                                }
                            </Nav>
                            { 
                                this.state.isLoggedIn ?
                                <Nav className="ml-auto" navbar style={{marginLeft: 'auto'}}>
                                    <NavItem>
                                        <Button outline onClick={this.Logout}>
                                            <span className="fa fa-sign-in fa-lg"></span> Logout
                                        </Button>
                                    </NavItem>
                                </Nav> : 
                                <Nav className="ml-auto" navbar style={{marginLeft: 'auto'}}>
                                    <NavItem>
                                        <Button outline onClick={this.toggleModalPhone}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login/Signup
                                        </Button>
                                    </NavItem>
                                </Nav> 
                            }
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isPhoneModalOpen} toggle={this.toggleModalPhone}>
                    <ModalHeader toggle={this.toggleModalPhone}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLoginPhone}>
                            <FormGroup>
                                <Label htmlFor="phone">Phone No.</Label>
                                <Input type="text" id="phone" name="phone" 
                                    innerRef={(input) => this.phone = input }/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isOtpModalOpen} toggle={this.toggleModalOtp}>
                    <ModalHeader toggle={this.toggleModalOtp}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLoginOtp}>
                            <FormGroup>
                                <Label htmlFor="otp">OTP</Label>
                                <Input type="password" id="otp" name="otp" 
                                    innerRef={(input) => this.otp = input }/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login/Signup</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Header;