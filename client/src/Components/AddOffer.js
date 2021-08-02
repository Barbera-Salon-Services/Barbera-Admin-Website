import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class AddOffer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceName: '',
            name: '',
            discount: '',
            user_limit: '',
            terms: '',
            image: '',
            start: 'Monday',
            end: 'Monday',
            touched: {
                serviceName: false,
                name: false,
                discount: false,
                user_limit: false,
                terms: false,
                image: false,
                start: false,
                end: false,
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

    onChange = (e) => {
        console.log("file to upload:", e.target.files[0]);
        let file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        this.setState({
            image: btoa(binaryString)
        })
    }

    validate(serviceName, name, discount, user_limit, terms, start, end) {
        const errors = {
            serviceName: '',
            name: '',
            discount: '',
            user_limit: '',
            terms: '',
            start: '',
            end: '',
        };

        if(this.state.touched.serviceName && serviceName.length === 0)
            errors.serviceName = 'Service Name should not be empty';

        if(this.state.touched.name && name.length === 0)
            errors.name = 'Name should not be empty';

        if(this.state.touched.discount && discount.length === 0)
            errors.discount = 'Discount should not be empty';

        if(this.state.touched.user_limit && user_limit.length === 0)
            errors.user_limit = 'User Limit should not be empty';

        if(this.state.touched.terms && terms.length === 0)
            errors.terms = 'Terms should not be empty';

        if(this.state.touched.start && start.length === 0)
            errors.start = 'Start day should not be empty';

        if(this.state.touched.end && end.length === 0)
            errors.end = 'End day should not be empty';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.name === '' || this.state.serviceName === '' || this.state.start === '' || this.state.end === '' || this.state.terms === '' || this.state.user_limit === '' || this.state.image === '' || this.state.discount === '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    servicename: this.state.serviceName,
                    name: this.state.name,
                    discount: this.state.discount,
                    userlimit: this.state.user_limit,
                    terms: this.state.terms,
                    image: this.state.image,
                    start: this.state.start,
                    end: this.state.end,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://ngqdvnidwf.execute-api.ap-south-1.amazonaws.com/Prod/createoffer', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Offer Created");
                        this.setState({
                            serviceName: '',
                            name: '',
                            discount: '',
                            user_limit: '',
                            terms: '',
                            image: '',
                            start: 'Monday',
                            end: 'Monday',
                            touched: {
                                serviceName: false,
                                name: false,
                                discount: false,
                                user_limit: false,
                                terms: false,
                                image: false,
                                start: false,
                                end: false,
                            }
                        });
                        event.target.reset();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.serviceName, this.state.name, this.state.discount, this.state.user_limit, this.state.terms, this.state.start, this.state.end);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Create Offer</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="serviceName" sm={2}>Service Name</Label>
                            <Col sm={10}>
                                <Input type="text" id="serviceName" 
                                    name="serviceName" 
                                    placeholder="Service Name"
                                    valid={errors.serviceName === ''}
                                    invalid={errors.serviceName !== ''} 
                                    value={this.state.serviceName} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('serviceName')} 
                                />
                                <FormFeedback>
                                    {errors.serviceName}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Offer Name</Label>
                            <Col sm={10}>
                                <Input type="text" id="name" 
                                    name="name" 
                                    placeholder="Offer Name"
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
                        <FormGroup row>
                            <Label for="terms" sm={2}>Terms & Conditions</Label>
                            <Col sm={10}>
                            <Input type="textarea" id="terms" 
                                rows="5" cols="10"
                                name="terms" 
                                placeholder="Terms & Conditions"
                                valid={errors.terms === ''}
                                invalid={errors.terms !== ''}
                                value={this.state.terms} 
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur('terms')} 
                            />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="user_limit" sm={2}>User Limit</Label>
                            <Col sm={10}>
                                <Input type="text" id="user_limit" 
                                    name="user_limit" 
                                    placeholder="User Limit"
                                    valid={errors.user_limit === ''}
                                    invalid={errors.user_limit !== ''}  
                                    value={this.state.user_limit} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('user_limit')} 
                                />
                                <FormFeedback>
                                    {errors.user_limit}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="start" sm={2}>Start Day</Label>
                            <Col sm={10}>
                                <Input type="select" name="start" id="start" onBlur={this.handleBlur('start')} onChange={this.handleInputChange} value={this.state.start}>
                                    <option value="Monday" >Monday</option>
                                    <option value="Tuesday" >Tuesday</option>
                                    <option value="Wednesday" >Wednesday</option>
                                    <option value="Thursday" >Thursday</option>
                                    <option value="Friday" >Friday</option>
                                    <option value="Saturday" >Saturday</option>
                                    <option value="Sunday" >Sunday</option>
                                </Input>
                                <FormFeedback>
                                    {errors.start}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="end" sm={2}>End Day</Label>
                            <Col sm={10}>
                                <Input type="select" name="end" id="end" onBlur={this.handleBlur('end')} onChange={this.handleInputChange} value={this.state.end}>
                                    <option value="Monday" >Monday</option>
                                    <option value="Tuesday" >Tuesday</option>
                                    <option value="Wednesday" >Wednesday</option>
                                    <option value="Thursday" >Thursday</option>
                                    <option value="Friday" >Friday</option>
                                    <option value="Saturday" >Saturday</option>
                                    <option value="Sunday" >Sunday</option>
                                </Input>
                                <FormFeedback>
                                    {errors.end}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="file" sm={2}>Offer Image</Label>
                            <Col sm={10}>
                            <Input type="file" name="file" 
                                id="file" 
                                accept=".jpeg, .png, .jpg"
                                onChange={this.onChange}
                            />
                            <FormText color="muted">
                                Only .jpeg, .png, .jpg files
                            </FormText>
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

export default AddOffer;