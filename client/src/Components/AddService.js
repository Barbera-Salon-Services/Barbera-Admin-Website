import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';

class AddService extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Add Service</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form >
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2} >First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" 
                                        name="firstname" 
                                        placeholder="First Name"
                                        //valid={errors.firstname === ''}
                                        //invalid={errors.firstname !== ''} 
                                        //value={this.state.firstname} 
                                        //onChange={this.handleInputChange} 
                                        //onBlur={this.handleBlur('firstname')}
                                    />
                                    {/* <FormFeedback>
                                        {errors.firstname}
                                    </FormFeedback> */}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2} >Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" 
                                        name="lastname" 
                                        placeholder="Last Name"
                                        //valid={errors.lastname === ''}
                                        //invalid={errors.lastname !== ''}  
                                        //value={this.state.lastname} 
                                        //onChange={this.handleInputChange} 
                                        //onBlur={this.handleBlur('lastname')}
                                    />
                                    {/* <FormFeedback>
                                        {errors.lastname}
                                    </FormFeedback> */}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2} >Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" 
                                        name="telnum" 
                                        placeholder="Contact Tel."
                                        //valid={errors.telnum === ''}
                                        //invalid={errors.telnum !== ''}  
                                        //value={this.state.telnum} 
                                        //onChange={this.handleInputChange} 
                                        //onBlur={this.handleBlur('telnum')}
                                    />
                                    {/* <FormFeedback>
                                        {errors.telnum}
                                    </FormFeedback> */}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2} >Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" 
                                        name="email" 
                                        placeholder="Email"
                                        //valid={errors.email === ''}
                                        //invalid={errors.email !== ''}  
                                        //value={this.state.email} 
                                        //onChange={this.handleInputChange} 
                                        //onBlur={this.handleBlur('email')}
                                    />
                                    {/* <FormFeedback>
                                        {errors.email}
                                    </FormFeedback> */}
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleInputChange}/> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2} >Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" rows="12" value={this.state.message} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}} >
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup> */}
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddService;