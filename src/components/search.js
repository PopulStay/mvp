import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';


class Search extends Component {

  constructor(props) {
    super(props);
      this.state = {
        checkInDate: null,
        checkOutDate: null,
        guests:null,
        place:null,
        locationName:"Tokyo",
      };
      window.searchCondition = this.state;
  }
  locationName(e){
    var DataName = e.currentTarget.getAttribute('data-name');
    this.setState({state: this.state.locationName = DataName});
  }

  render() {

    return (
      <div className="form">
        <div className="container index_content">
            <h1>Find dream homes and experiences  on PopulStay</h1>
            <span className="color-pink text-bold">PopulStay-Superior Guest Experience & Maximized Owner Profit</span>
            <h4>Choose your city !</h4>
            <ul className="form__location row">
                <li className="col-md-2 col-lg-2 col-sm-6 active" data-name="Tokyo"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Tokyo" ? "../images/location-13_1.png" : "../images/location-13.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-6" data-name="New York"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "New York" ? "../images/location-14_1.png" : "../images/location-14.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-6" data-name="Shanghai"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Shanghai" ? "../images/location-15_1.png" : "../images/location-15.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-6" data-name="London"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "London" ? "../images/location-16_1.png" : "../images/location-16.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-6" data-name="Paris"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Paris" ? "../images/location-17_1.png" : "../images/location-17.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-6" data-name="Singapore"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Singapore" ? "../images/location-18_1.png" : "../images/location-18.png"} alt="" />
                </li>
            </ul>
            <form action="">
                <div className="row">
                    
                    <div className="col-md-12 col-lg-10 col-sm-10 ">

                        <div className="col-md-9 col-lg-9 index_box">
                            <div className="col-md-12 col-lg-12 col-sm-12 guestsleft">
                                <div className="form-group">
                                    <label className="col-sm-6 col-md-6 col-lg-6 ">Check in</label>
                                    <label className="col-sm-6 col-md-6 col-lg-6 ">Check out</label>
                                    <DateRangePicker startDate={this.state.checkInDate} startDateId="start_date" endDate={this.state.checkOutDate} endDateId="end_date" onDatesChange={({ startDate, endDate })=> {this.setState({checkInDate: startDate, checkOutDate: endDate });window.searchCondition.checkOutDate = endDate;window.searchCondition.checkInDate = startDate;}} focusedInput={this.state.focusedInput} onFocusChange={focusedInput => this.setState({ focusedInput })} />
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-6 col-sm-6 guestsnum">
                                <div className="form-group">
                                    <label>Adults</label>
                                    <input type="number" className="form-control input-lg" onChange={(e)=> window.searchCondition.place = e.target.value } />
                                </div>
                            </div>
                      

                            <div className="col-md-6 col-lg-6 col-sm-6 guestsnum">
                                <div className="form-group">
                                    <label>Childen</label>
                                    <input type="number" className="form-control input-lg" onChange={(e)=> window.searchCondition.guests = e.target.value }/>
                                </div>
                            </div>

                        </div>

                        <div className="search  col-md-3  col-lg-3">
                            <Link to="/home">
                            <a href="#" className="btn button__fill btn-lg form__search">
                                <img src="../images/search_home.png" />
                            </a>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-12 index_foot">
                        <ul>
                            <li className="liimg"><img src="../images/img_home.png" /></li>
                            <li className="litext">Find dream</li>
                            <li className="liicon">•</li>
                            <li className="litext1">HOMES</li>
                            <li className="liicon">•</li>
                            <li className="litext1">EXPERIENCE</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>

        <div className="container index_home">
            <h2>Homes around the world</h2>
            <div className="overflow">
                <div className="col-sm-12 col-md-6 col-lg-4 listing-card">
                  <img className="photo" src="../images/detail-carousel.jpg" role="presentation" />
                  <div className="category">Entire place (0.5 beds)</div>
                  <div className="title">new york</div>
                  <div className="price">
                      ￥200 pps per night
                  </div>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <span>200</span> 
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 listing-card">
                  <img className="photo" src="../images/detail-carousel.jpg" role="presentation" />
                  <div className="category">Entire place (0.5 beds)</div>
                  <div className="title">new york</div>
                  <div className="price">
                      ￥200 pps per night
                  </div>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <span>200</span> 
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 listing-card">
                  <img className="photo" src="../images/detail-carousel.jpg" role="presentation" />
                  <div className="category">Entire place (0.5 beds)</div>
                  <div className="title">new york</div>
                  <div className="price">
                      ￥200 pps per night
                  </div>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <span>200</span> 
                  </div>
                </div>
            </div>
            <h4>Show all (2000+)</h4>
        </div>
        <div className="container index_home">
            <h2>Experiences travellers love</h2>
            <p>Book activities led by local hosts on your next trip</p>
            <div className="overflow">
                <div className="col-sm-12 col-md-6 col-lg-4 listing-card">
                  <img className="photo" src="../images/detail-carousel.jpg" role="presentation" />
                  <div className="category">Entire place (0.5 beds)</div>
                  <div className="title">new york</div>
                  <div className="price">
                      ￥200 pps per night
                  </div>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <span>200</span> 
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 listing-card">
                  <img className="photo" src="../images/detail-carousel.jpg" role="presentation" />
                  <div className="category">Entire place (0.5 beds)</div>
                  <div className="title">new york</div>
                  <div className="price">
                      ￥200 pps per night
                  </div>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <span>200</span> 
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 listing-card">
                  <img className="photo" src="../images/detail-carousel.jpg" role="presentation" />
                  <div className="category">Entire place (0.5 beds)</div>
                  <div className="title">new york</div>
                  <div className="price">
                      ￥200 pps per night
                  </div>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <span>200</span> 
                  </div>
                </div>
            </div>
            <h4>Show all (2000+)</h4>
        </div>
    </div>


    )
  }
}

export default Search
