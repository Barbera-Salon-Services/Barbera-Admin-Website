import React, {Component} from 'react';
import Header from './Header';
import AddService from './AddService';
import AllServices from './AllServices';
import UpdateService from './UpdateService';
import Home from './Home';
import Mailer from './Mailer';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPhone, LoginOtp } from '../Functions/login';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        services: []
    };
  }

  render() {

    return (
        <div>
            <Header loginphone={LoginPhone} loginotp={LoginOtp}/>
            <Switch>
                <Route path="/home" component={() => <Home />} />  
                <Route exact path="/services" component={() => <AllServices />} />
                <Route exact path="/services/addservice" component={(props) => <AddService {...props}/>} />
                <Route path="/services/:serviceId" component={(props) => <UpdateService {...props}/>} />
                <Route exact path="/mailer" component={() => <Mailer />} />
                {/* <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={Contact} /> */}
                <Redirect to="/home" />
            </Switch>
            {/* <Footer /> */}
        </div>
    );
  }
  
}

export default Main;
