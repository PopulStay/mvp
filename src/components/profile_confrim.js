import React from 'react';
import ReactDOM from 'react-dom';
import Timestamp from 'react-timestamp';
import ppsService from '../services/pps-service';
import languageService from '../services/language-service';

class Confrim extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      languagelist:{},
    };


    languageService.language();
  }


  
  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
  }

  render() {
      const language = this.state.languagelist;
    return (

      <div className="Confrim">
          <h3>You’re going to Melbourne!</h3>
          <div className="box1"><p className="Left">Reservation code: HMFTDP9Q48. <span className="color-pink">View receipt</span> or <span className="color-pink">make a change to the reservation.</span></p><p className="Right">{language.Print}</p></div>

          <div className="box2">
            <div className="box3 col-sm-12 col-md-6 col-lg-6">
              <div className="box3_1">
                <p className="Left"><b>Guests</b> <p> 1 of 3 accepted</p></p>
                <button className="Right">Manage Guests</button>
              </div>

              <div className="box3_2">
                <div className="userlist">
                  <div><img src="/images/uesrimg.png" /></div>
                  <p className="text1">user</p>
                  <p className="text2">Accepted</p>
                </div>
              </div>

              <div className="box3_3">
                <div className="divleft col-sm-6 col-md-6 col-lg-6"><b>Check In</b> <p className="Right">Sat, Aug 26 <br/>After 1 PM</p></div>
                <div className="divright col-sm-6 col-md-6 col-lg-6"><b>Check Out</b> <p className="Right">Sat, Aug 26 <br/>After 1 PM</p></div>
              </div>

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>Address</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                <p>339 Swanston Street Apartment 506 Melbourne, VIC 3000 Australia</p>
                <p><span className="color-pink">Get directions</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span className="color-pink">View listing</span></p>
                </div>
              </div>

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>Guidebook</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                <p>Mo recommended 1 place to visit near your listing </p>
                <p><span className="color-pink">See Mo’s recommendations</span></p>
                </div>
              </div>

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>House Rules</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <p>Not suitable for pets</p> 
                  <p>No parties or events</p> 
                  <p>Not safe or suitable for infants (Under 2 years)</p>
                  <p>Check-in is anytime after 1PM</p>
                  <p className="fdx"></p>
                  <p>1. Please empty rubbish regularly by taking it out of the apartment.The door next to the lift on the same floor has garbage chute.</p>
                  <span className="color-pink">+ more</span>
                  <p className="fontWeight">You also acknowledge:</p>
                  <p>Amenity limitations</p>
                </div>
              </div>

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>Billing</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <div className="overflow"><p className="Left">7 nights total</p><p className="Right">$1137.13</p></div> 
                  <div className="overflow"><p className="Left">Per guest</p><p className="Right">$379.04</p></div> 
                  <p><span className="color-pink">Detailed receipt</span></p>
                </div>
              </div>

              <div className="box3_5">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>Need help?</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <p>Visit the <span className="color-pink">Help Center.</span></p>
                </div>
              </div>


            </div>
            <div className="box4 col-sm-12 col-md-6 col-lg-6">
              <div className="box5">
                <br/><br/><br/><br/><br/><br/><br/>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
export default Confrim
