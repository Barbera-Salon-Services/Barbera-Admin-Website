import React, { Component } from 'react';
import BarChart from './BarChart';
import { Redirect } from 'react-router-dom';

class BarberLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barber: this.props.match.params.barber,
            logs: [],
            items: [],
            item: '',
            quantity: '',
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type ==='checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting:",this.state);
        if(localStorage.getItem('token') !== null){
            if(this.state.item === '' || this.state.quantity === '') {
                alert("Please fill the required details");
                console.log("Submission Failed");
            } else {
                const token = localStorage.getItem('token');
                console.log(token); 
                var barber = this.state.barber.split(',');
                const barberId = barber[0];
                var data = {
                    barberId: barberId,
                    item: this.state.item,
                    quantity: this.state.quantity,
                };
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                };
                await fetch('https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/additem', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Service added");
                        this.setState({
                            item: '',
                            quantity: '',
                        });
                        this.getItems();
                    })
                    .catch(error => alert(error));
            }
        } 
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            console.log(this.state);
            this.getLogs();
            this.getItems();
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
            await fetch(`https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/getlogs/${barberId}`, requestOptions)
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

    getItems = async() => {
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token');
            console.log(token); 
            var barber = this.state.barber.split(',');
            const barberId = barber[0];
            var data = {
                barberId: barberId
            };

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            };

            await fetch(`https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/getitems`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        items: data.data,
                    });
                })
                .catch(error => alert(error));
        } 
    }

    render() {
        console.log(this.state);

        var barber = this.state.barber.split(',');
        const barberId = barber[0];
        const barberName = barber[1];
        const barberPhone = barber[2];

        var dates = [];
        var distances = [];

        for(var i=0; i<this.state.logs.length; i++) {
            dates.push(this.state.logs[i].date);
            distances.push(this.state.logs[i].distance.toFixed(2));
        }

        var id = 0;

        const items = this.state.items.map((item) => {
            id++;
            console.log(item.date);
            return (
                <li key={id}>{item.date}{'   ------>   '}{item.item}{'   ------>   '}{item.quantity}</li>
            );
        });

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
                    <div className="container">
                        <div style={{paddingTop: '5%'}}>
                            <h2>
                                Items
                            </h2>
                        </div>
                        { this.state.items.length !==0 ? <ul>{items}</ul> : null}
                        <div>
                            <form onSubmit={this.onSubmit}>
                                <label for="item">Item:</label>
                                <input name="item" id="item" type="text" onChange={this.handleInputChange} value={this.state.item} />
                                <label for="quantity">Quantity:</label>
                                <input name="quantity" id="quantity" type="text" onChange={this.handleInputChange} value={this.state.quantity}/>
                                <input name="submit" id="submit" type="submit" /> 
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default BarberLog;