import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button,Form, FormGroup, Label, Input, Col, Row, FormFeedback, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class TypeUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            type: '',
            image: '',
            tab: false,
            touched: {
                category: false,
                image: false,
            }
        }
    }

    handleInputChange = async(event) => {
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

    validate(category, image) {
        const errors = {
            category: '',
            image: ''
        };

        if(this.state.touched.category && category.length === 0)
            errors.category = 'Category should not be empty';

        if(this.state.touched.image && image.length === 0)
            errors.image = 'Image not uploaded';

        return errors;
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.category === '' || this.state.image === '') {
                alert('Please fill the full form');
                console.log('Submission failed');
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var data = {
                    category: this.state.category,
                    type: this.state.type ? this.state.type : null,
                    image: this.state.image,
                    tab: this.state.tab
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://897izsv5m6.execute-api.ap-south-1.amazonaws.com/Prod/typeupload', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Type Image Uploaded");
                        this.setState({
                            category: '',
                            type: '',
                            image: '',
                            tab: false,
                            touched: {
                                category: false,
                                image: false,
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

        const errors = this.validate(this.state.category, this.state.image);

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="col-12" style={{paddingTop: '5%'}}>
                        <h2>Type Image Upload</h2>
                    </div>
                    <Form style={{paddingTop: '5%'}} onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="category" sm={2}>Category</Label>
                            <Col sm={5}>
                                <Input type="text" id="category" 
                                    name="category" 
                                    placeholder="Category"
                                    valid={errors.category === ''}
                                    invalid={errors.category !== ''} 
                                    value={this.state.category} 
                                    onChange={this.handleInputChange} 
                                    onBlur={this.handleBlur('category')} 
                                />
                                <FormFeedback>
                                    {errors.category}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="type" sm={2}>Type</Label>
                            <Col sm={5}>
                                <Input type="text" id="type" 
                                    name="type" 
                                    placeholder="Type"
                                    value={this.state.type} 
                                    onChange={this.handleInputChange} 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="tab" sm={2}>Tabs</Label>
                            <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" id="tab" 
                                    name="tab" 
                                    checked={this.state.tab}
                                    onChange={this.handleInputChange} 
                                />{' '}
                                    Tabs
                                </Label>
                            </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="file" sm={2}>Image</Label>
                            <Col sm={10}>
                            <Input type="file" name="file" 
                                id="file" 
                                accept=".jpeg, .png, .jpg"
                                value={this.state.image}
                                onChange={this.onChange}
                            />
                            <FormText color="muted">
                                Only .jpeg, .png, .jpg files
                            </FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup check row style={{paddingLeft: '0px'}}>
                            <Col sm={{ size: 10, offset: 0 }}>
                                <Button ><i className="fa fa-paper-plane"></i>{' '}Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

export default TypeUpload;