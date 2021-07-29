import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class SliderDelete extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            touched: {
                name: false,
            }
        }
    }

    handleInputChange = async(event) => {
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

    validate(name) {
        const errors = {
            name: ''
        };

        if(this.state.touched.name && name.length === 0)
            errors.name = 'Service Name should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.name === '') {
                alert('Please fill the full form');
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    name: this.state.name
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://r54kj5iekh.execute-api.ap-south-1.amazonaws.com/Dev/sliderdelete', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Slider deleted");
                        this.setState({
                            name: '',
                            touched: {
                                name: false,
                            }
                        });
                        event.target.reset();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);

        const errors = this.validate(this.state.name);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Slider Delete</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="name" sm={2}>Service Name</Label>
                            <Col sm={5}>
                                <Input type="text" id="name" 
                                    name="name" 
                                    placeholder="Service Name"
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''} 
                                    value={this.state.name} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('name')} 
                                />
                                <FormFeedback>
                                    {errors.name}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup check row style={{paddingLeft: '0px'}}>
                            <Col sm={{ size: 10, offset: 0 }}>
                                <Button ><i className="fa fa-trash"></i>{' '}Delete</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

export default SliderDelete;