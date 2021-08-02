import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class AddService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            time: '',
            price: '',
            category: '',
            type: '',
            subtype: '',
            cutprice: '',
            details: '',
            dod: false,
            trending: false,
            touched: {
                name: false,
                price: false,
                category: false,
                type: false,
                subtype: false,
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

    validate(name, price, category, type, subtype) {
        const errors = {
            name: '',
            price: '',
            category: '',
            type: '',
            subtype: '',
        };

        if(this.state.touched.name && name.length === 0)
            errors.name = 'Service Name should not be empty';

        if(this.state.touched.price && price.length === 0)
            errors.price = 'Price should not be empty';

        if(this.state.touched.category && category.length === 0)
            errors.category = 'Category should not be empty';

        if(this.state.touched.type && type.length === 0)
            errors.type = 'Type should not be empty';

        if(this.state.touched.subtype && subtype.length === 0)
            errors.subtype = 'Subtype should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.name === '' || this.state.price === '' || this.state.category === '' || this.state.type === '' || this.state.subtype === '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    name: this.state.name,
                    time: this.state.time,
                    price: this.state.price,
                    category: this.state.category,
                    type: this.state.type,
                    subtype: (this.state.subtype === '') ? null : this.state.subtype,
                    cutprice: this.state.cutprice,
                    details: this.state.details,
                    dod: this.state.dod,
                    trending: this.state.trending,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://897izsv5m6.execute-api.ap-south-1.amazonaws.com/Prod/addservice', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Service added");
                        this.setState({
                            name: '',
                            time: '',
                            price: '',
                            category: '',
                            type: '',
                            subtype: '',
                            details: '',
                            cutprice: '',
                            trending: false,
                            dod: false,
                            touched: {
                                name: false,
                                price: false,
                                category: false,
                                type: false,
                                subtype: false,
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
        
        const errors = this.validate(this.state.name, this.state.price, this.state.category, this.state.type, this.state.subtype);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Add Service</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="name" sm={2}>Service Name</Label>
                            <Col sm={10}>
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
                        <FormGroup row>
                            <Label for="time" sm={2}>Time</Label>
                            <Col sm={10}>
                                <Input type="text" id="time" 
                                    name="time" 
                                    placeholder="Time"  
                                    value={this.state.time} 
                                    onChange={this.handleInputChange} 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="price" sm={2}>Price</Label>
                            <Col sm={10}>
                                <Input type="text" id="price" 
                                    name="price" 
                                    placeholder="Price"
                                    valid={errors.price === ''}
                                    invalid={errors.price !== ''}  
                                    value={this.state.price} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('price')}
                                />
                                <FormFeedback>
                                    {errors.price}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="details" sm={2}>Details</Label>
                            <Col sm={10}>
                            <Input type="textarea" id="details" 
                                rows="5" cols="10"
                                name="details" 
                                placeholder="Details"
                                value={this.state.details ? this.state.details : ''} 
                                onChange={this.handleInputChange} 
                            />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="cutprice" sm={2}>Cut Price</Label>
                            <Col sm={10}>
                                <Input type="text" id="cutprice" 
                                    name="cutprice" 
                                    placeholder="Cut Price" 
                                    value={this.state.cutprice} 
                                    onChange={this.handleInputChange} 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="category" sm={2}>Category</Label>
                            <Col sm={10}>
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
                            <Col sm={10}>
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
                            <Col sm={10}>
                                <Input type="text" id="subtype" 
                                    name="subtype" 
                                    placeholder="Sub Type" 
                                    valid={errors.subtype === ''}
                                    invalid={errors.subtype !== ''}
                                    value={this.state.subtype} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('subtype')} 
                                />
                                <FormFeedback>
                                    {errors.subtype}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="trending" sm={2}>Trending</Label>
                            <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" id="trending" 
                                    name="trending" 
                                    checked={this.state.trending}
                                    onChange={this.handleInputChange} 
                                />{' '}
                                    Trending
                                </Label>
                            </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="dod" sm={2}>Deal of the Day</Label>
                            <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" id="dod" 
                                    name="dod"
                                    checked={this.state.dod}
                                    onChange={this.handleInputChange} 
                                />{' '}
                                    Deal of the Day
                                </Label>
                            </FormGroup>
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

export default AddService;