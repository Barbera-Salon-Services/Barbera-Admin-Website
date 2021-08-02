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
            lowerlim: '',
            upperlim: '',
            userlim: '',
            touched: {
                discount: false,
                lowerlim: false,
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

    validate(discount, lowerlim) {
        const errors = {
            discount: '',
            lowerlim: ''
        };

        if(this.state.touched.discount && discount.length === 0)
            errors.discount = 'Discount should not be empty';

        if(this.state.touched.lowerlim && lowerlim.length === 0)
            errors.lowerlim = 'Discount should not be empty';

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
            await fetch(`https://z9t3sasx3e.execute-api.ap-south-1.amazonaws.com/Prod/getcoupon/${serviceId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.data);
                    this.setState({
                        serviceName: data.data.service.name,
                        discount: data.data.discount,
                        lowerlim: data.data.lower_price_limit,
                        upperlim: (data.data.upper_price_limit === -1) ? '' : data.data.upper_price_limit,
                        userlim: (data.data.user_limit === -1) ? '' : data.data.user_limit, 

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
            await fetch(`https://z9t3sasx3e.execute-api.ap-south-1.amazonaws.com/Prod/delcoupon`, requestOptions)
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
            if(this.state.discount === '') {
                alert("Please fill the full form");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                const serviceId = this.state.serviceId;
                var data = {
                    couponname: this.state.couponName,
                    discount: Number(this.state.discount),
                    upperlimit: Number(this.state.upperlim),
                    lowerlimit: Number(this.state.lowerlim),
                    userlimit: Number(this.state.userlim)
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch(`https://z9t3sasx3e.execute-api.ap-south-1.amazonaws.com/Prod/updcoupon/${serviceId}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Coupon updated");
                        this.getCoupon();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.discount, this.state.lowerlim );

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
                        <FormGroup row>
                            <Label for="upperlim" sm={2}>Upper Price Limit</Label>
                            <Col sm={10}>
                                <Input type="text" id="upperlim" 
                                    name="upperlim" 
                                    value={this.state.upperlim} 
                                    onChange={this.handleInputChange} 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lowerlim" sm={2}>Lower Price Limit</Label>
                            <Col sm={10}>
                                <Input type="text" id="lowerlim" 
                                    name="lowerlim"
                                    valid={errors.lowerlim === ''}
                                    invalid={errors.lowerlim !== ''}  
                                    value={this.state.lowerlim} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('lowerlim')}
                                />
                                <FormFeedback>
                                    {errors.lowerlim}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="userlim" sm={2}>User Limit</Label>
                            <Col sm={10}>
                                <Input type="text" id="userlim" 
                                    name="userlim" 
                                    value={this.state.userlim} 
                                    onChange={this.handleInputChange} 
                                />
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