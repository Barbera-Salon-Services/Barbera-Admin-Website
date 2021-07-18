import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class TypeDelete extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            type: '',
            subtype: '',
            touched: {
                category: false,
                type: false,
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

    validate(category, type) {
        const errors = {
            category: '',
            type: '',
        };

        if(this.state.touched.category && category.length === 0)
            errors.category = 'Category should not be empty';

        if(this.state.touched.type && type.length === 0)
            errors.type = 'Type should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var data = {
                category: this.state.category,
                type: this.state.type,
                subtype: this.state.subtype ? this.state.subtype : null,
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
                    console.log("Image deleted");
                    this.setState({
                        category: '',
                        type: '',
                        subtype: '',
                        touched: {
                            category: false,
                            type: false,
                        }
                    });
                    event.target.reset();
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log(this.state);

        const errors = this.validate(this.state.category, this.state.type);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Type and Sub Type Image Delete</h2>
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
                                    valid={errors.type === ''}
                                    invalid={errors.type !== ''} 
                                    value={this.state.type} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('type')} 
                                />
                                <FormFeedback>
                                    {errors.type}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="subtype" sm={2}>Sub Type</Label>
                            <Col sm={5}>
                                <Input type="text" id="subtype" 
                                    name="subtype" 
                                    placeholder="Sub Type" 
                                    value={this.state.subtype} 
                                    onChange={this.handleInputChange} 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup check row style={{paddingLeft: '0px'}}>
                            <Col sm={{ size: 10, offset: 0 }}>
                                <Button ><i class="fa fa-trash"></i>{' '}Delete</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

export default TypeDelete;