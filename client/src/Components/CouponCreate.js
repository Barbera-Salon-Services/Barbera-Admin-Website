import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class CouponCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            serviceId: this.props.match.params.serviceId,
            name: '',
            discount: '',
            upperpricelim: '',
            lowerpricelim: '',
            userlim: '',
            touched: {
                name: false,
                discount: false,
                lowerpricelim: false,
            }
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token') === null)this.props.history.push('/');
    }

    handleInputChange = async(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        });
    }

    validate(name, discount, lowerpricelim) {
        const errors = {
            name: '',
            discount: '',
            lowerpricelim: ''
        };

        if(this.state.touched.name && name.length === 0)
            errors.name = 'Coupon Name should not be empty';

        if(this.state.touched.discount && discount.length === 0)
            errors.discount = 'Discount should not be empty';

        if(this.state.touched.lowerpricelim && lowerpricelim.length === 0)
            errors.lowerpricelim = 'Lower Price Limit should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.name === '' || this.state.discount === '' || this.state.lowerpricelim === '') {
                alert("Please fill the full form");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    serviceid: this.state.serviceId,
                    name: this.state.name,
                    discount: Number(this.state.discount),
                    lowerlimit: Number(this.state.lowerpricelim),
                    upperlimit: Number(this.state.upperpricelim),
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
                await fetch('https://zlhjfiu498.execute-api.ap-south-1.amazonaws.com/Dev/couponcreate', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Coupon Created");
                        this.setState({
                            name: '',
                            discount: '',
                            upperpricelim: '',
                            lowerpricelim: '',
                            userlim: '',
                            touched: {
                                name: false,
                                discount: false,
                                lowerpricelim: false,
                            }
                        });
                        event.target.reset();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    onSubmit

    render() {

        console.log(this.state);

        const errors = this.validate(this.state.name, this.state.discount, this.state.lowerpricelim);

        return(
            <div className="container">
                <div className="col-12" style={{paddingTop: '5%'}}>
                    <h2>Create a Coupon</h2>
                </div>
                <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label for="name" sm={2}>Coupon Name</Label>
                        <Col sm={5}>
                            <Input type="text" id="name" 
                                name="name" 
                                placeholder="Coupon Name"
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
                        <Label for="discount" sm={2}>Discount Amount</Label>
                        <Col sm={5}>
                            <Input type="text" id="discount" 
                                name="discount" 
                                placeholder="Discount Amount"
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
                        <Label for="upperpricelim" sm={2}>Upper Price Limit</Label>
                        <Col sm={5}>
                            <Input type="text" id="upperpricelim" 
                                name="upperpricelim" 
                                placeholder="Upper Price Limit" 
                                value={this.state.upperpricelim} 
                                onChange={this.handleInputChange}  
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="lowerpricelim" sm={2}>Lower Price Limit</Label>
                        <Col sm={5}>
                            <Input type="text" id="lowerpricelim" 
                                name="lowerpricelim" 
                                placeholder="Lower Price Limit"
                                valid={errors.lowerpricelim === ''}
                                invalid={errors.lowerpricelim !== ''} 
                                value={this.state.lowerpricelim} 
                                onChange={this.handleInputChange} 
                                onBlur={this.handleBlur('lowerpricelim')} 
                            />
                            <FormFeedback>
                                {errors.lowerpricelim}
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="userlim" sm={2}>User Limit</Label>
                        <Col sm={5}>
                            <Input type="text" id="userlim" 
                                name="userlim" 
                                placeholder="User Limit" 
                                value={this.state.userlim} 
                                onChange={this.handleInputChange} 
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup check row style={{paddingLeft: '0px'}}>
                        <Col sm={{ size: 10, offset: 0 }}>
                            <Button ><i className="fa fa-paper-plane"></i>{' '}Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default CouponCreate;