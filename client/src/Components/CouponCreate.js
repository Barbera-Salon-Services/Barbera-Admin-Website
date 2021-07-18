import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class CouponCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            serviceId: this.props.match.params.serviceId,
            name: '',
            discount: '0',
            touched: {
                name: false,
                discount: false,
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

    validate(name, discount) {
        const errors = {
            name: '',
            discount: ''
        };

        if(this.state.touched.name && name.length === 0)
            errors.name = 'Coupon Name should not be empty';

        if(this.state.touched.discount && discount === '0')
            errors.discount = 'Discount should be greater than 0';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var data = {
                serviceid: this.state.serviceId,
                name: this.state.name,
                discount: Number(this.state.discount),
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
                        discount: '0',
                        touched: {
                            name: false,
                            discount: false,
                        }
                    });
                    event.target.reset();
                })
                .catch(error => alert(error));
        } 
    }

    onSubmit

    render() {

        console.log(this.state);

        const errors = this.validate(this.state.name, this.state.discount);

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
                            <Input type="number" id="discount" 
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