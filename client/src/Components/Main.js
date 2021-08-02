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
import Coupons from './Coupons';
import CouponInfo from './CouponInfo';
import BarberLog from './BarberLog';
import ChangeRadius from './ChangeRadius';
import Offers from './Offers';
import AddOffer from './AddOffer';
import UpdateOffer from './UpdateOffer';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPhone, LoginOtp } from '../Functions/login';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div>
            <Header loginphone={LoginPhone} loginotp={LoginOtp}/>
            <Switch>
                <Route path="/home" component={() => <Home />} />  
                <Route path="/barbers/:barber" component={(props) => <BarberLog {...props}/>} />
                <Route exact path="/services" component={() => <AllServices />} />
                <Route exact path="/offers" component={() => <Offers />} />
                <Route exact path="/offers/addoffer" component={() => <AddOffer />} />
                <Route exact path="/offers/:name/:serviceId" component={(props) => <UpdateOffer {...props}/>} />
                <Route exact path="/services/sliderupload" component={(props) => <SliderUpload {...props}/>} />
                <Route exact path="/services/sliderdelete" component={(props) => <SliderDelete {...props}/>} />
                <Route exact path="/services/typeupload" component={(props) => <TypeUpload {...props}/>} />
                <Route exact path="/services/typedelete" component={(props) => <TypeDelete {...props}/>} />
                <Route exact path="/services/addservice" component={(props) => <AddService {...props}/>} />
                <Route path="/services/:serviceId" component={(props) => <UpdateService {...props}/>} />
                <Route exact path="/coupons" component={(props) => <Coupons {...props}/>} />
                <Route exact path="/coupon/:name/:serviceId" component={(props) => <CouponInfo {...props}/>} />
                <Route path="/coupons/:serviceId" component={(props) => <CouponCreate {...props}/>} />
                <Route path="/mailer" component={() => <Mailer />} />
                <Route path="/radius" component={() => <ChangeRadius />} />
                <Route path="/coininc" component={() => <AddCoins />} />
                <Redirect to="/home" />
            </Switch>
            {/* <Footer /> */}
        </div>
    );
  }
  
}

export default Main;
