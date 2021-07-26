import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class CoinIncrease extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            increase: '0',
            touched: {
                phone: false,
                increase: false,
            }
        }
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

    validate(phone, increase) {
        const errors = {
            phone: '',
            increase: '',
        };

        if(this.state.touched.phone && phone.length === 0)
            errors.phone = 'Barber Phone No. should not be empty';

        if(this.state.touched.increase && increase === '0')
            errors.increase = 'Type should be more than 0';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var data = {
                barberphone: this.state.phone,
                increase: Number(this.state.increase),
            };
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            };
            await fetch('https://0dy1hsrsu8.execute-api.ap-south-1.amazonaws.com/Dev/coininc', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Coins Added");
                    this.setState({
                        phone: '',
                        increase: '0',
                        touched: {
                            phone: false,
                            increase: false,
                        }
                    });
                    event.target.reset();
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log(this.state);

        const errors = this.validate(this.state.phone, this.state.increase);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Adding Coins</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="phone" sm={2}>Barber Phone No.</Label>
                            <Col sm={5}>
                                <Input type="text" id="phone" 
                                    name="phone" 
                                    placeholder="Barber Phone No."
                                    valid={errors.phone === ''}
                                    invalid={errors.phone !== ''} 
                                    value={this.state.phone} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('phone')} 
                                />
                                <FormFeedback>
                                    {errors.phone}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="increase" sm={2}>Increase</Label>
                            <Col sm={5}>
                                <Input type="number" id="increase" 
                                    name="increase" 
                                    placeholder="Increase"
                                    valid={errors.increase === ''}
                                    invalid={errors.increase !== ''} 
                                    value={this.state.increase} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('increase')} 
                                />
                                <FormFeedback>
                                    {errors.increase}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup check row style={{paddingLeft: '0px'}}>
                            <Col sm={{ size: 10, offset: 0 }}>
                                <Button ><i className="fa fa-paper-plane"></i>{' '}Add</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

export default CoinIncrease;