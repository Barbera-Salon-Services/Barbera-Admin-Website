import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, FormFeedback, FormText } from 'reactstrap';
import { Row, Image } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';

class CouponInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceId: this.props.match.params.serviceId,
            serviceName: '',
            couponName: this.props.match.params.name,
            discount: '',
            touched: {
                discount: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getCoupon();
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

    validate(discount) {
        const errors = {
            discount: ''
        };

        if(this.state.touched.discount && discount === '0')
            errors.discount = 'Discount should not be 0';

        return errors;
    }

    getCoupon = async() => {
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            const serviceId = this.state.serviceId;
            var data = {
                couponname: this.state.couponName,
            };
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            };
            await fetch(`https://zlhjfiu498.execute-api.ap-south-1.amazonaws.com/Dev/getcoupon/${serviceId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.data);
                    this.setState({
                        serviceName: data.data.service.name,
                        discount: data.data.discount
                    });
                })
                .catch(error => alert(error));
        } 
    }

    onDelete = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            const serviceId = this.state.serviceId;
            var data = {
                couponname: this.state.couponName,
                serviceid: serviceId
            }
            const requestOptions = {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            };
            await fetch(`https://zlhjfiu498.execute-api.ap-south-1.amazonaws.com/Dev/delcoupon`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Coupon deleted");
                    this.props.history.push('/coupons');
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
            const serviceId = this.state.serviceId;
            var data = {
                couponname: this.state.couponName,
                discount: Number(this.state.discount)
            };
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            };
            await fetch(`https://zlhjfiu498.execute-api.ap-south-1.amazonaws.com/Dev/updcoupon/${serviceId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Service added");
                    this.getCoupon();
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.discount );

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Update Coupon</h2>
                        <div style={{textAlign: 'right'}}>
                            <Button onClick={this.onDelete}>Delete Coupon</Button>
                        </div>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="couponName" sm={2}>Coupon Name</Label>
                            <Col sm={10}>
                                <Input type="text" id="couponName" 
                                    name="couponName" 
                                    placeholder="Coupon Name"
                                    value={this.state.couponName} 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="serviceName" sm={2}>Service Name</Label>
                            <Col sm={10}>
                                <Input type="text" id="serviceName" 
                                    name="serviceName" 
                                    placeholder="Service Name"  
                                    value={this.state.serviceName}  
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="discount" sm={2}>Discount Amount</Label>
                            <Col sm={10}>
                                <Input type="number" id="discount" 
                                    name="discount"
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

export default CouponInfo;