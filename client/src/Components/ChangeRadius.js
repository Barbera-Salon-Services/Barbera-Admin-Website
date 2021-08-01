import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, FormFeedback, FormText } from 'reactstrap';
import { Row } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';

class ChangeRadius extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distance: '',
            touched: {
                distance: false,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getDistance();
        } 
    }

    getDistance = async() => {
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
            await fetch(`https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/getradius`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Distance Received");
                    console.log(data.data);
                    this.setState({
                        distance: data.data.distance,
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

    validate(distance) {
        const errors = {
            distance: '',
        };

        if(this.state.touched.distance && distance.length === 0)
            errors.distance = 'Distance should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.distance === '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    distance: this.state.distance,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/bookradius', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Distance updated");
                        this.getDistance();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.distance);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Booking Radius Change</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="distance" sm={2}>Distance</Label>
                            <Col sm={10}>
                                <Input type="text" id="distance" 
                                    name="distance" 
                                    placeholder="Distance"
                                    valid={errors.distance === ''}
                                    invalid={errors.distance !== ''} 
                                    value={this.state.distance} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('distance')} 
                                />
                                <FormFeedback>
                                    {errors.distance}
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

export default ChangeRadius;