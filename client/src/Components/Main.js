import React, {Component} from 'react';
import Header from './Header';
import AddService from './AddService';
import AllServices from './AllServices';
import UpdateService from './UpdateService';
import Home from './Home';
import Mailer from './Mailer';
import SliderUpload from './SliderUpload';
import SliderDelete from './SliderDelete';
import TypeUpload from './TypeUpload';
import TypeDelete from './TypeDelete';
import AddCoins from './AddCoins';
import CouponCreate from './CouponCreate';
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
                <Route exact path="/services/sliderupload" component={(props) => <SliderUpload {...props}/>} />
                <Route exact path="/services/sliderdelete" component={(props) => <SliderDelete {...props}/>} />
                <Route exact path="/services/typeupload" component={(props) => <TypeUpload {...props}/>} />
                <Route exact path="/services/typedelete" component={(props) => <TypeDelete {...props}/>} />
                <Route exact path="/services/addservice" component={(props) => <AddService {...props}/>} />
                <Route path="/services/:serviceId" component={(props) => <UpdateService {...props}/>} />
                <Route path="/coupons/:serviceId" component={(props) => <CouponCreate {...props}/>} />
                <Route path="/mailer" component={() => <Mailer />} />
                <Route path="/coininc" component={() => <AddCoins />} />
                {/* <Route exact path="/contactus" component={Contact} /> */}
                <Redirect to="/home" />
            </Switch>
            {/* <Footer /> */}
        </div>
    );
  }
  
}

export default Main;
