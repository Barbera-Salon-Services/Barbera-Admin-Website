import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Mailer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            to: 'user',
            subject: '',
            body: '',
            touched: {
                to: false,
                subject: false,
                body: false,
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

    validate(to, subject, body) {
        const errors = {
            to: '',
            subject: '',
            body: '',
        };

        if(this.state.touched.to && to.length === 0)
            errors.to = 'One of the options should be selected';

        if(this.state.touched.subject && subject.length === 0)
            errors.subject = 'Subject should not be empty';

        if(this.state.touched.body && body.length === 0)
            errors.body = 'Body should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.to === '' || this.state.body === '' || this.state.subject === '') {
                alert('Please fill the full form');
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    to: this.state.to,
                    subject: this.state.subject,
                    body: this.state.body,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://xwtij1tqrc.execute-api.ap-south-1.amazonaws.com/Dev/sendmail', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Service added");
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.to, this.state.subject, this.state.body);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Send Mail</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="exampleSelect" sm={2}>To</Label>
                            <Col sm={10}>
                                <Input type="select" name="to" id="to" onBlur={this.handleBlur('to')} onChange={this.handleInputChange} value={this.state.to}>
                                    <option value="user" >user</option>
                                    <option value="barber" >barber</option>
                                </Input>
                                <FormFeedback>
                                    {errors.to}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="subject" sm={2}>Subject</Label>
                            <Col sm={10}>
                                <Input type="text" id="subject" 
                                    name="subject" 
                                    placeholder="Subject"
                                    valid={errors.subject === ''}
                                    invalid={errors.subject !== ''} 
                                    value={this.state.subject} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('subject')} 
                                />
                                <FormFeedback>
                                    {errors.subject}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="body" sm={2}>Body</Label>
                            <Col sm={10}>
                                <Input type="textarea" id="body" 
                                    rows="10" cols="10"
                                    name="body" 
                                    placeholder="Body"
                                    valid={errors.body === ''}
                                    invalid={errors.body !== ''}  
                                    value={this.state.body ? this.state.body : ''} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('body')} 
                                />
                                <FormFeedback>
                                    {errors.body}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup check row style={{paddingLeft: '0px'}}>
                            <Col sm={{ size: 10, offset: 0 }}>
                            <Button><i className="fa fa-paper-plane"></i>{' '}Send</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

export default Mailer;