import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, FormFeedback, FormText } from 'reactstrap';
import { Row } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';

class UpdateService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceId: this.props.match.params.serviceId,
            name: '',
            time: '',
            price: '',
            category: '',
            type: '',
            subtype: '',
            cutprice: '',
            details: '',
            imgurl: '',
            dod: false,
            trending: false,
            touched: {
                name: false,
                time: false,
                price: false,
                category: false,
                type: false,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getService();
        } 
    }

    getService = async() => {
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            const serviceId = this.state.serviceId;
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            await fetch(`https://r54kj5iekh.execute-api.ap-south-1.amazonaws.com/Dev/getservbyid/${serviceId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.data);
                    this.setState({
                        name: data.data.name,
                        time: data.data.time,
                        price: data.data.price,
                        category: data.data.category,
                        type: data.data.type,
                        subtype: data.data.subtype,
                        details: data.data.details,
                        cutprice: data.data.cutprice,
                        trending: data.data.trending,
                        dod: data.data.dod,
                    });
                })
                .catch(error => alert(error));
        } 
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

    validate(name, time, price, category, type) {
        const errors = {
            name: '',
            time: '',
            price: '',
            category: '',
            type: '',
        };

        if(this.state.touched.name && name.length === 0)
            errors.name = 'Service Name should not be empty';

        if(this.state.touched.price && price.length === 0)
            errors.price = 'Price should not be empty';

        if(this.state.touched.time && time.length === 0)
            errors.time = 'Time should not be empty';

        if(this.state.touched.category && category.length === 0)
            errors.category = 'Category should not be empty';

        if(this.state.touched.type && type.length === 0)
            errors.type = 'Type should not be empty';

        return errors;
    }

    onDelete = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            const serviceId = this.state.serviceId;
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            await fetch(`https://r54kj5iekh.execute-api.ap-south-1.amazonaws.com/Dev/delservice/${serviceId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Service added");
                    this.props.history.push('/services');
                })
                .catch(error => alert(error));
        } 
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var data = {
                id: this.state.serviceId,
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
            await fetch('https://r54kj5iekh.execute-api.ap-south-1.amazonaws.com/Dev/updateservice', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Service added");
                    this.getService();
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log(this.state);
        console.log(this.state.imgurl);
        
        const errors = this.validate(this.state.name, this.state.time, this.state.price, this.state.category, this.state.type );

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Update Service</h2>
                        <div style={{textAlign: 'right'}}>
                            <Button href={`/coupons/${this.state.serviceId}`}>Create Coupon</Button>{'  '}
                            <Button onClick={this.onDelete}>Delete Service</Button>
                        </div>
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
                                    valid={errors.time === ''}
                                    invalid={errors.time !== ''}  
                                    value={this.state.time} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('time')} 
                                />
                                <FormFeedback>
                                    {errors.time}
                                </FormFeedback>
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
                                value={this.state.subtype} 
                                onChange={this.handleInputChange}  
                            />
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

export default UpdateService;