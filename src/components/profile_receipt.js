import React from 'react';
import ReactDOM from 'react-dom';
import languageService from '../services/language-service';

class Receipt extends React.Component {
  constructor() {
    super();

    this.state = {
    
    };


    languageService.language();
  }


  
  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
  }

  render() {
      const language = this.state.languagelist;
    return (

      <div className="Receipt">
          <div className="box1"><p className="Left"><span></span>To Itinerary</p><p className="Right">Print</p></div>
          <h3>Confirmed: 7 nights in Melbourne, Australia</h3>
          <div className="box2">
              <p className="Left">Booked by <b>Christie Zhong</b> Wednesday, 5 Jul 2017</p>
              <p className="Right"><b>Accepted</b> HMFTDP9Q48</p>
          </div>
          <div className="box3">
            <div className="box4 col-lg-5">
              <div className="box4_1">
                <p className="Left">Check In</p>
                <p className="Right">Check Out</p>
              </div>
              <div className="box4_2 row">
                <p className="col-sm-4 col-md-4 col-lg-4">26 Aug 2017</p>
                <p className="col-sm-4 col-md-4 col-lg-4 text-center"><span></span><span></span><span></span></p>
                <p className="col-sm-4 col-md-4 col-lg-4 text-right">26 Aug 2017</p>
              </div>
              <div className="box4_3 row">
                <h4>Entire home/apt</h4>
                <p>Absolute Melbourne Center Apartment</p>
                <p>Swanston Street Apartment 506</p>
                <p>Melbourne, VIC 3000</p>
                <p>Australia</p>
                <br/><br/>
                <p>Hosted by Mo Han</p>
                <p>Phone: +61 414 526 064</p>
              </div>
              <div className="box4_4 row">
                <h4>3 Travellers on this trip</h4>
                <div className="userlist">
                  <div><img src="/images/uesrimg.png" /></div>
                  <p>user</p>
                </div>
              </div>
            </div>
            <div className="box5 col-lg-7">
              <div className="box5_top">
                  <h3>Charges</h3>
                  <ul>
                    <li>
                      <p className="Left">$139.91 SGD  7 nights</p>
                      <p className="Right">$ 979.35 SGD</p>
                    </li>
                    <li>
                      <p className="Left">Cleaning fees</p>
                      <p className="Right">$ 38.38 SGD</p>
                    </li>
                    <li>
                      <p className="Left">Service fee</p>
                      <p className="Right">$ 119.40 SGD</p>
                    </li>
                  </ul>
                  <button><span className="Left">Total</span><span className="Right">$ 1137.13 SGD</span></button>
              </div>
              <div className="box5_bottom">
                  <h3>Payment</h3>
                  <ul>
                    <li>
                      <p className="Left">Paid with MASTERCARD •••• 9121</p>
                      <p className="Right">$ 1136.00 SGD</p>
                    </li>
                    <li>
                      <p className="Left">Wed, July 05, 2017 @ 10:12 AM +08</p>
                    </li>
                    <li>
                      <h4 className="Left">Total Remaining</h4>
                      <h4 className="Right">$1.13 SGD</h4>
                    </li>
                  </ul>
                  <span className="Adddetails">Add billing details</span>
              </div>
            </div>
          </div>

          <div className="box6">
              <h4>Cost per traveler</h4>
              <p>This trip was <b>$54.15 SGD</b> per person, per night,</p>
              <p>including taxes and other fees.</p>
          </div>

          <div className="box7">
            <ul>
              <li>
                <h4 className="Left">Need help?</h4>
                <p className="Right">HMFTDP9Q48</p>
              </li>
              <li>
                <p className="Left">Visit the <span>Help Center</span> for any questions.</p>
                <p className="Right">Booked by <b>Christie Zhong</b></p>
              </li>
              <li>
                <p className="Right">Wednesday, 5 Jul 2017</p>
              </li>
            </ul>
          </div>
          <div className="box8">
            <p>Cancellation policy: <span>Strict</span>. Certain fees and taxes may be non-refundable. See here for more details.</p>
            <p>A 3% conversion fee was applied to this booking.</p>
            <p>PopulStay Payments UK Ltd. ("Airbnb Payments") is a limited collection agent of your Host. This means that upon your payment of the Total Fees to PopulStay Payments, your payment obligation to your Host is satisfied. Refund requests will be processed in accordance with: (i) the Host's cancellation policy (available on the Listing); or (ii) PopulStay Payment's Guest Refund Policy Terms, available at <span><a href="https://www.PopulStay.com.sg/terms.">https://www.PopulStay.com.sg/terms.</a></span> Questions or complaints: contact Airbnb Payments at +44 203 318 1111.</p>
            <br/>
            <p>Payment processed by:</p>
            <p>PopulStay Payments UK Ltd.</p>
            <p>40 Compton St.</p>
            <p>London</p>
            <p>EC1V 0AP</p>
            <p>United Kingdom</p>
            <br/>
            <p>PopulStay Ireland UC</p>
            <p>The Watermarque Building</p>
            <p>South Lotts Road</p>
            <p>Ringsend, Dublin 4</p>
            <p>Ireland</p>
            <p>VAT Number: IE 9827384L</p>
            <img src="/images/logo_grey.png" />
          </div>
      </div>
    );
  }
}
export default Receipt
