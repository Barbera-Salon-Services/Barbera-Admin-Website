import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Media } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function RenderCoupon({ coupon }) {
    const url = '/coupon/' + coupon.name + '/' + coupon.service.id;

    return (
        <Button href={url} variant="outline-secondary" size="lg">
            <div style={{textAlign: 'left'}}>{coupon.name}</div>
            <div style={{textAlign: 'right'}}><i className="fa fa-arrow-right"></i></div>
        </Button>
    );
}

class Coupons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupons: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.getCoupons();
        } else {
            this.props.history.push('/home');
        }
    }

    getCoupons = async() => {
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
            await fetch('https://zlhjfiu498.execute-api.ap-south-1.amazonaws.com/Dev/getallcoupons', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.data);
                    this.setState({
                        coupons: data.data
                    });
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log("body");
        console.log("token",localStorage.getItem('token'))
        
        const coupons = this.state.coupons.map((coupon) => {
            return (
                <RenderCoupon key={coupon.service.id} coupon={coupon} />
            );
        });

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <h2>Coupons</h2>
                        </div>
                        <div className="col-12 col-md m-1">
                            <Media list>
                                <div className="d-grid gap-2">
                                    <br />
                                    {this.state.coupons.length !== 0 ? coupons : null}
                                </div>
                            </Media>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Coupons;