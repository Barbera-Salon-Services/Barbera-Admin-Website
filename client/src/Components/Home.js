import React, { Component } from 'react';
import BarChart from './BarChart';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barbers: {},
            logs: {},
            ids: []
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
            const serviceId = this.state.serviceId;
            const requestOptions = {
                method: 'OPTIONS',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            await fetch(`https://ivhc87o8xe.execute-api.ap-south-1.amazonaws.com/Dev/getlogs`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        barbers: data.barbers,
                        logs: data.logs,
                        ids: data.ids 
                    });
                })
                .catch(error => alert(error));
        } 
    }

    render() {

        console.log(this.state.ids);
        console.log(this.state.logs);
        console.log(this.state.barbers);

        const logs = this.state.ids.map((id) => {

            var dates = [];
            var distances = [];

            for(var i=0; i<this.state.logs[id].length; i++) {
                dates.push(this.state.logs[id][i].date);
                distances.push(this.state.logs[id][i].distance);
            }

            return (
                <BarChart distances={distances} dates={dates} barber={this.state.barbers[id]} key={id} />
            );
        });

        return (
            <div className="container">
                { 
                    localStorage.getItem('token') ? 
                    <>
                        <div style={{paddingTop: '5%'}}>
                            <h2>
                                Dashboard
                            </h2>
                        </div>
                        {this.state.ids.length !== 0 ? logs : null}
                    </>
                    :
                    null
                }
            </div>
        );
    }
}

export default Home;