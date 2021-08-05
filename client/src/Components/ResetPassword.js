import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, FormFeedback, FormText } from 'reactstrap';
import { Row } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldpass: '',
            newpass1: '',
            newpass2: '',
            touched: {
                oldpass: false,
                newpass1: false,
                newpass2: false,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type ==='checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        });
    }

    validate(oldpass, newpass1, newpass2) {
        const errors = {
            oldpass: '',
            newpass1: '',
            newpass2: ''
        };

        if(this.state.touched.oldpass && oldpass.length === 0)
            errors.oldpass = 'Old Password should not be empty';

        if(this.state.touched.newpass1 && newpass1.length < 8)
            errors.newpass1 = 'New Password should be longer than 8 characters';

        if(this.state.touched.newpass2 && newpass2.length < 8)
            errors.newpass2 = 'New Password should be longer than 8 characters';

        if(this.state.touched.newpass1 && this.state.touched.newpass2 && newpass1 !== newpass2 && newpass1.length >= 8 && newpass2.length >= 8) {
            errors.newpass1 = 'New Passwords are not the match';
            errors.newpass2 = 'New Passwords are not the match';
        }

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const errors = this.validate(this.state.oldpass, this.state.newpass1, this.state.newpass2);
            if(errors.oldpass !== '' || errors.newpass1 !== '' || errors.newpass2 !== '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    oldpassword: this.state.oldpass,
                    newpassword: this.state.newpass1,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/resetpass', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Password Reset successful");
                        console.log(data);
                        this.setState({
                            oldpass: '',
                            newpass1: '',
                            newpass2: '',
                            touched: {
                                oldpass: false,
                                newpass1: false,
                                newpass2: false
                            }
                        })
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.oldpass, this.state.newpass1, this.state.newpass2);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Reset Password</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="oldpass" sm={2}>Old Password</Label>
                            <Col sm={10}>
                                <Input type="password" id="oldpass" 
                                    name="oldpass" 
                                    placeholder="Old Password"
                                    valid={errors.oldpass === ''}
                                    invalid={errors.oldpass !== ''} 
                                    value={this.state.oldpass} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('oldpass')} 
                                />
                                <FormFeedback>
                                    {errors.oldpass}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="newpass1" sm={2}>New Password</Label>
                            <Col sm={10}>
                                <Input type="password" id="newpass1" 
                                    name="newpass1" 
                                    placeholder="New Password"
                                    valid={errors.newpass1 === ''}
                                    invalid={errors.newpass1 !== ''} 
                                    value={this.state.newpass1} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('newpass1')} 
                                />
                                <FormFeedback>
                                    {errors.newpass1}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="newpass2" sm={2}>Retype New Password</Label>
                            <Col sm={10}>
                                <Input type="password" id="newpass2" 
                                    name="newpass2" 
                                    placeholder="Retype New Password"
                                    valid={errors.newpass2 === ''}
                                    invalid={errors.newpass2 !== ''} 
                                    value={this.state.newpass2} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('newpass2')} 
                                />
                                <FormFeedback>
                                    {errors.newpass2}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup check row style={{paddingLeft: '0px'}}>
                            <Col sm={{ size: 10, offset: 0 }}>
                            <Button><i className="fa fa-paper-plane"></i>{' '}Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

export default ResetPassword;