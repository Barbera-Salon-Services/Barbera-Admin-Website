import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, FormFeedback, FormText } from 'reactstrap';
import { Row } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';

class AddBarber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            touched: {
                phone: false,
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

    validate(phone) {
        const errors = {
            phone: ''
        };

        if(this.state.touched.phone && phone.length === 0)
            errors.phone = 'Phone Number should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.phone === '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    phone: this.state.phone,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/addbarber', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Barber added");
                        this.setState({
                            phone: '',
                            touched: {
                                phone: false,
                            }
                        })
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.phone);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Add New Barber</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="phone" sm={2}>Phone Number</Label>
                            <Col sm={10}>
                                <Input type="text" id="phone" 
                                    name="phone" 
                                    placeholder="Phone Number"
                                    valid={errors.phone === ''}
                                    invalid={errors.phone !== ''} 
                                    value={this.state.phone} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('phone')} 
                                />
                                <FormFeedback>
                                    {errors.phone}
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

export default AddBarber;