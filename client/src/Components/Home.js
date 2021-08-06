import React, { Component } from 'react';
import BarChart from './BarChart';
import { Button } from 'react-bootstrap';
import { Media } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function RenderBarber({ barber }) {
    const url = '/barbers/' + barber.id + ',' + barber.name + ',' + barber.phone;

    return (
        <Button href={url} variant="outline-secondary" size="lg">
            <div style={{textAlign: 'left'}}>{barber.name} ({barber.phone})</div>
            <div style={{textAlign: 'right'}}><i className="fa fa-arrow-right"></i></div>
        </Button>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barbers: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getBarbers();
        } 
    }

    getBarbers = async() => {
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
            await fetch(`https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/getbarbs`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        barbers: data.data,
                    });
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log("body");
        console.log("token",localStorage.getItem('token'))
        
        const barbers = this.state.barbers.map((barber) => {
            return (
                <RenderBarber key={barber.id} barber={barber} />
            );
        });

        return (
            <>
                {
                    localStorage.getItem('token') ? 
                    <div className="container">
                        <div className="row row-content">
                            <div className="col-12">
                                <h2>Barbers</h2>
                                <Button href="/addbarb" variant="info" size="lg" style={{float: 'right'}}>
                                    Add Barber
                                </Button>
                            </div>
                            <div className="col-12 col-md m-1">
                                <Media list>
                                    <div className="d-grid gap-2">
                                        <br />
                                        {this.state.barbers.length !== 0 ? barbers : null}
                                    </div>
                                </Media>
                            </div>
                        </div>
                    </div> : null
                }
            </>
        );
    }
}

export default Home;