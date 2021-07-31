import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class TypeDelete extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            type: '',
            tab: false,
            touched: {
                category: false,
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

    validate(category ) {
        const errors = {
            category: '',
        };

        if(this.state.touched.category && category.length === 0)
            errors.category = 'Category should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.category === '') {
                alert('Please fill the form');
                console.log("Submission Failed")
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    category: this.state.category,
                    type: this.state.type,
                    tab: this.state.tab
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://r54kj5iekh.execute-api.ap-south-1.amazonaws.com/Dev/typedelete', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Type Image deleted");
                        this.setState({
                            category: '',
                            type: '',
                            tab: false,
                            touched: {
                                category: false,
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

        const errors = this.validate(this.state.category);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Type Image Delete</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="category" sm={2}>Category</Label>
                            <Col sm={5}>
                                <Input type="text" id="category" 
                                    name="category" 
                                    placeholder="Category"
                                    valid={errors.category === ''}
                                    invalid={errors.category !== ''} 
                                    value={this.state.category} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('category')} 
                                />
                                <FormFeedback>
                                    {errors.category}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="type" sm={2}>Type</Label>
                            <Col sm={5}>
                                <Input type="text" id="type" 
                                    name="type" 
                                    placeholder="Type" 
                                    value={this.state.type} 
                                    onChange={this.handleInputChange} 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="tab" sm={2}>Tabs</Label>
                            <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" id="tab" 
                                    name="tab" 
                                    checked={this.state.tab}
                                    onChange={this.handleInputChange} 
                                />{' '}
                                    Tabs
                                </Label>
                            </FormGroup>
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

export default TypeDelete;