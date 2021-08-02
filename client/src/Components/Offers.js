import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Media } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function RenderOffer({ offer }) {
    var name = offer.name.split(" ");
    var names = name.join("_");

    const url = '/offers/' + names + '/' + offer.serviceId;

    return (
        <Button href={url} variant="outline-secondary" size="lg">
            <div style={{textAlign: 'left'}}>{offer.name}</div>
            <div style={{textAlign: 'right'}}><i className="fa fa-arrow-right"></i></div>
        </Button>
    );
}

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.getOffers();
        } 
    }

    getOffers = async() => {
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
            await fetch('https://ngqdvnidwf.execute-api.ap-south-1.amazonaws.com/Prod/getalloffer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.data);
                    this.setState({
                        offers: data.data
                    });
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log("body");
        console.log("token",localStorage.getItem('token'))
        
        var i = 0;

        const offers = this.state.offers.map((offer) => {
            i++;
            return (
                <RenderOffer key={i} offer={offer} />
            );
        });

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <h2>Offers</h2>
                            <Button href="/offers/addoffer" variant="info" size="lg" style={{float: 'right'}}>
                                Add Offer
                            </Button>
                        </div>
                        <div className="col-12 col-md m-1">
                            <Media list>
                                <div className="d-grid gap-2">
                                    <br />
                                    {this.state.offers.length !== 0 ? offers : null}
                                </div>
                            </Media>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Offers;