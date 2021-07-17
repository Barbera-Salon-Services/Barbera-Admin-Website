import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Media } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function RenderService({ service }) {
    const url = '/services/' + service.id;

    return (
        <Button href={url} variant="outline-secondary" size="lg">
            <div style={{textAlign: 'left'}}>{service.name}</div>
            <div style={{textAlign: 'right'}}><i className="fa fa-arrow-right"></i></div>
        </Button>
    );
}

class AllServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.getServices();
        } 
    }

    componentDidUpdate() {
        console.log("update");
    }

    getServices = async() => {
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
            await fetch('https://r54kj5iekh.execute-api.ap-south-1.amazonaws.com/Prod/getallservname', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.data);
                    this.setState({
                        services: data.data
                    });
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log("body");
        console.log("token",localStorage.getItem('token'))
        
        const services = this.state.services.map((service) => {
            return (
                <RenderService key={service.id} service={service} />
            );
        });

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <h2>Services</h2>
                            <Button href="/services/addservice" variant="outline-secondary" size="lg" style={{float: 'right'}}>
                                Add Service
                            </Button>
                        </div>
                        <div className="col-12 col-md m-1">
                            <Media list>
                                <div className="d-grid gap-2">
                                    <br />
                                    {services}
                                </div>
                            </Media>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AllServices;