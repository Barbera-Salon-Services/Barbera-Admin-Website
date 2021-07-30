import React, { Component } from 'react';
import BarChart from './BarChart';
import { Redirect } from 'react-router-dom';

class BarberLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barber: this.props.match.params.barber,
            logs: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getLogs();
        } 
    }

    getLogs = async() => {
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var barber = this.state.barber.split(',');
            const barberId = barber[0];
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            await fetch(`https://xwtij1tqrc.execute-api.ap-south-1.amazonaws.com/Dev/getlogs/${barberId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        logs: data.logs,
                    });
                })
                .catch(error => alert(error));
        } 
    }

    render() {
        console.log(this.state.barbers);

        var barber = this.state.barber.split(',');
        const barberId = barber[0];
        const barberName = barber[1];
        const barberPhone = barber[2];

        var dates = [];
        var distances = [];

        for(var i=0; i<this.state.logs.length; i++) {
            dates.push(this.state.logs[i].date);
            distances.push(this.state.logs[i].distance);
        }

        return (
            <>
                { localStorage.getItem('token') ? null : <Redirect to="/home" />}
                <div className="container" >
                    <div style={{paddingTop: '5%'}}>
                        <h2>
                            Log for {barberName} ({barberPhone})
                        </h2>
                    </div>
                    {this.state.logs.length !== 0 ?  
                    <BarChart distances={distances} dates={dates} name={barberName} phone={barberPhone} />
                    : null}
                </div>
            </>
        );
    }
}

export default BarberLog;