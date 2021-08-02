import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class UpdateOffer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceId: this.props.match.params.serviceId,
            serviceName: '',
            name: this.props.match.params.name.split("_").join(" "),
            discount: '',
            user_limit: '',
            terms: '',
            image: '',
            pic: '',
            start: 'Monday',
            end: 'Monday',
            touched: {
                discount: false,
                user_limit: false,
                terms: false,
                start: false,
                end: false,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getOffer();
        } 
    }

    getOffer = async() => {
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var data = {
                serviceId: this.state.serviceId,
                name: this.state.name
            };
            console.log(data);
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            };
            await fetch(`https://ngqdvnidwf.execute-api.ap-south-1.amazonaws.com/Prod/getoffer`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Offer Found");
                    console.log(data.data);

                    if(data.data.start === 1) {
                        data.data.start = 'Monday';
                    } else if(data.data.start === 2) {
                        data.data.start = 'Tuesday';
                    } else if(data.data.start === 3) {
                        data.data.start = 'Wednesday';
                    } else if(data.data.start === 4) {
                        data.data.start = 'Thursday';
                    } else if(data.data.start === 5) {
                        data.data.start = 'Friday';
                    } else if(data.data.start === 6) {
                        data.data.start = 'Saturday';
                    } else if(data.data.start === 7) {
                        data.data.start = 'Sunday';
                    }

                    if(data.data.end === 1) {
                        data.data.end = 'Monday';
                    } else if(data.data.end === 2) {
                        data.data.end = 'Tuesday';
                    } else if(data.data.end === 3) {
                        data.data.end = 'Wednesday';
                    } else if(data.data.end === 4) {
                        data.data.end = 'Thursday';
                    } else if(data.data.end === 5) {
                        data.data.end = 'Friday';
                    } else if(data.data.end === 6) {
                        data.data.end = 'Saturday';
                    } else if(data.data.end === 7) {
                        data.data.end = 'Sunday';
                    }

                    this.setState({
                        serviceName: data.data.serviceName,
                        discount: data.data.discount,
                        user_limit: data.data.user_limit,
                        terms: data.data.terms,
                        pic: data.data.image,
                        start: data.data.start,
                        end: data.data.end,
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

    validate(discount, user_limit, terms, start, end) {
        const errors = {
            discount: '',
            user_limit: '',
            terms: '',
            start: '',
            end: '',
        };

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

    onDelete = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var data = {
                serviceId: this.state.serviceId,
                name: this.state.name
            };
            console.log(data);
            const requestOptions = {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            };
            await fetch(`https://ngqdvnidwf.execute-api.ap-south-1.amazonaws.com/Prod/deloffer`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Offer deleted");
                    this.props.history.push('/offers');
                })
                .catch(error => alert(error));
        } 
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.name === '' || this.state.serviceId === '' || this.state.start === '' || this.state.end === '' || this.state.terms === '' || this.state.user_limit === '' || this.state.discount === '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    serviceId: this.state.serviceId,
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
                await fetch('https://ngqdvnidwf.execute-api.ap-south-1.amazonaws.com/Prod/updateoffer', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Offer Updated");
                        this.getOffer();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    render() {

        console.log(this.state);
        
        const errors = this.validate(this.state.discount, this.state.user_limit, this.state.terms, this.state.start, this.state.end);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Update Offer</h2>
                        <div style={{textAlign: 'right'}}>
                            <Button onClick={this.onDelete}>Delete Offer</Button>
                        </div>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
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
                            <Label for="name" sm={2}>Offer Name</Label>
                            <Col sm={10}>
                                <Input type="text" id="name" 
                                    name="name" 
                                    placeholder="Offer Name"
                                    value={this.state.name} 
                                />
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

export default UpdateOffer;