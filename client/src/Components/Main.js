import React, {Component} from 'react';
import Header from './Header';
import AddService from './AddService';
import AllServices from './AllServices';
import Home from './Home';
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
                <Route path="/services/addservice" component={() => <AddService />} />
                {/* <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={Contact} /> */}
                <Redirect to="/home" />
            </Switch>
            {/* <Footer /> */}
        </div>
    );
  }
  
}

export default Main;
