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
            isDropOpen1: false,
            isDropOpen2: false,
            isEmailModalOpen: false,
            isPassModalOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModalEmail = this.toggleModalEmail.bind(this);
        this.toggleModalPass = this.toggleModalPass.bind(this);
        this.handleLoginEmail = this.handleLoginEmail.bind(this);
        this.handleLoginPass = this.handleLoginPass.bind(this);
        this.Logout= this.Logout.bind(this);
    }

    toggleDropdown1 = () => {
        this.setState({
            isDropOpen1: !this.state.isDropOpen1
        });
    }

    toggleDropdown2 = () => {
        this.setState({
            isDropOpen2: !this.state.isDropOpen2
        });
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModalEmail() {
        this.setState({
            isEmailModalOpen: !this.state.isEmailModalOpen
        });
    }

    toggleModalPass() {
        this.setState({
            isPassModalOpen: !this.state.isPassModalOpen
        });
    }

    Logout(event) {
        localStorage.removeItem('token');
        this.setState({
            isLoggedIn: false
        });
        event.preventDefault();
    }

    handleLoginEmail(event) {
        if(this.email.value === '' || this.email.value === null){
            alert('No email was entered');
            event.preventDefault();
        } else {
            this.toggleModalEmail();
            this.toggleModalPass();
            console.log("Email: " + this.email.value );
            const data = {
                email: this.email.value,
                mode: 'web'
            };
            this.props.loginemail(data);
            event.preventDefault();
        }
    }

    handleLoginPass(event) {
        if(this.password.value === '' || this.password.value === null){
            alert('No password entered');
            event.preventDefault();
        } else {
            this.toggleModalPass();
            console.log("OTP: " + this.password.value);
            var data = {
                password: this.password.value,
                role: 'admin'
            }
            var login = this.props.loginpass(data);
            if(login) {
                this.setState({
                    isLoggedIn: true
                });
            }
            event.preventDefault();
        }
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
                                        <NavItem>
                                            <NavLink className="nav-link" to="/addadmin">
                                                <span className="fa fa-user-plus fa-lg"></span> Add Admin
                                            </NavLink>
                                        </NavItem>
                                        <Dropdown nav isOpen={this.state.isDropOpen1} toggle={this.toggleDropdown1}>
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
                                        <NavItem>
                                            <NavLink className="nav-link" to="/coupons">
                                                <span className="fa fa-credit-card fa-lg"></span> Coupons
                                            </NavLink>
                                        </NavItem> 
                                        <NavItem>
                                            <NavLink className="nav-link" to="/radius">
                                                <span className="fa fa-street-view fa-lg"></span> Booking Radius
                                            </NavLink>
                                        </NavItem> 
                                        <NavItem>
                                            <NavLink className="nav-link" to="/offers">
                                                <span className="fa fa-percent fa-lg"></span> Offers
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
                                    <Dropdown nav isOpen={this.state.isDropOpen2} toggle={this.toggleDropdown2}>
                                        <DropdownToggle nav caret>
                                            <span className="fa fa-user-circle fa-lg" style={{color: "whitesmoke"}}></span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                <NavLink className="nav-link" to="/pass" style={{color: 'blue'}}>
                                                    Reset Password
                                                </NavLink>
                                            </DropdownItem>
                                            <DropdownItem divider></DropdownItem>
                                            <DropdownItem>
                                                <NavLink className="nav-link" to="/home" onClick={this.Logout} style={{color: 'blue'}}>
                                                    Logout
                                                </NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Nav> : 
                                <Nav className="ml-auto" navbar style={{marginLeft: 'auto'}}>
                                    <NavItem>
                                        <Button outline onClick={this.toggleModalEmail}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login/Signup
                                        </Button>
                                    </NavItem>
                                </Nav> 
                            }
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isEmailModalOpen} toggle={this.toggleModalEmail}>
                    <ModalHeader toggle={this.toggleModalEmail}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLoginEmail}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email" 
                                    innerRef={(input) => this.email = input }
                                />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isPassModalOpen} toggle={this.toggleModalPass}>
                    <ModalHeader toggle={this.toggleModalPass}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLoginPass}>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" 
                                    innerRef={(input) => this.password = input }/>
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