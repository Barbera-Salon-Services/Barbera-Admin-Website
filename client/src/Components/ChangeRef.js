import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, FormFeedback, FormText } from 'reactstrap';
import { Row } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';

class ChangeRef extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discount: '',
            couponName: '',
            touched: {
                discount: false,
                couponName: false,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getRef();
        } 
    }

    getRef = async() => {
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            await fetch(`https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/getref`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Distance Received");
                    console.log(data.data);
                    this.setState({
                        discount: data.data.discount,
                        couponName: data.data.couponName
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

    validate(discount, couponName) {
        const errors = {
            discount: '',
            couponName: ''
        };

        if(this.state.touched.discount && discount.length === 0)
            errors.discount = 'Discount should not be empty';

        if(this.state.touched.couponName && couponName.length === 0)
            errors.couponName = 'Coupon Name should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.discount === '' || this.state.couponName === '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    discount: this.state.discount,
                    name: this.state.couponName,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/updref', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Ref Coupon updated");
                        this.getRef();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.discount, this.state.couponName);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Referral Coupon Change</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="couponName" sm={2}>Ref Coupon Name</Label>
                            <Col sm={10}>
                                <Input type="text" id="couponName" 
                                    name="couponName" 
                                    placeholder="Ref Coupon Name"
                                    valid={errors.couponName === ''}
                                    invalid={errors.couponName !== ''} 
                                    value={this.state.couponName} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('couponName')} 
                                />
                                <FormFeedback>
                                    {errors.couponName}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="discount" sm={2}>Discount</Label>
                            <Col sm={10}>
                                <Input type="text" id="discount" 
                                    name="discount" 
                                    placeholder="Discount"
                                    valid={errors.discount === ''}
                                    invalid={errors.discount !== ''} 
                                    value={this.state.discount} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('discount')} 
                                />
                                <FormFeedback>
                                    {errors.discount}
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

export default ChangeRef;