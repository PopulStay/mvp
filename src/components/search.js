import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';


class Search extends Component {

  constructor(props) {
    super(props);
      this.state = {
        checkInDate: null,
        checkOutDate: null,
        adults:null,
        children:null
      };
      window.searchCondition = this.state;
  }

  render() {

    return (
      <div className="form bg-blue">
       <div className="container">
        <h1 className="color-pink text-bold">
        Find dream homes on PopulStay
        </h1>
        <span className="color-white">Superior Guest Experience &amp; Maximized Owner Prof<span>i</span>t</span>
        <h4 className="color-pink text-bold">START YOUR TRIP!</h4>
        <ul className="form__location row">
        <li className="col-md-2 col-lg-2 col-sm-2 active" name="Tokyo">
        <img src="../images/home-location-1.png" alt=""/> 
        <img src="../images/home-location-m-1.png" alt=""/>
        </li>
        <li className="col-md-2 col-lg-2 col-sm-2" name="New York">
        <img src="../images/home-location-2.png" alt=""/> 
        <img src="../images/home-location-m-2.png" alt=""/>
        </li>
        <li className="col-md-2 col-lg-2 col-sm-2" name="Shanghai">
        <img src="../images/home-location-3.png" alt=""/> 
        <img src="../images/home-location-m-3.png" alt=""/>
        </li>
        <li className="col-md-2 col-lg-2 col-sm-2" name="London">
        <img src="../images/home-location-4.png" alt=""/> 
        <img src="../images/home-location-m-4.png" alt=""/>
        </li>
        <li className="col-md-2 col-lg-2 col-sm-2" name="Paris">
        <img src="../images/home-location-5.png" alt=""/>
        <img src="../images/home-location-m-5.png" alt=""/>
        </li>
        <li className="col-md-2 col-lg-2 col-sm-2" name="Singapore">
        <img src="../images/home-location-6.png" alt=""/> 
        <img src="../images/home-location-m-6.png" alt=""/>
        </li>
        </ul>
        <form action="">
        <div className="row">
        <div className="col-md-10 col-lg-10 col-sm-10">
        <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-4">
          <div className="form-group"><label>When</label> 
                     <DateRangePicker
                    startDate={this.state.checkInDate}
                    startDateId="start_date"
                    endDate={this.state.checkOutDate}
                    startDatePlaceholderText="Check In"
                    endDatePlaceholderText="Check Out"
                    endDateId="end_date"
                    onDatesChange={({ startDate, endDate }) => {this.setState({checkInDate: startDate, checkOutDate: endDate });window.searchCondition.checkOutDate = endDate;window.searchCondition.checkInDate = startDate;}}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                  />
           </div>       

        </div>
        <div className="col-md-3 col-lg-3 col-sm-3">
        <div className="form-group"><label>ADULTS</label> 
        <input type="number" className="form-control input-lg" onChange={(e) => window.searchCondition.adults = e.target.value } />
        </div>
        </div>
        <div className="col-md-3 col-lg-3 col-sm-3">
        <div className="form-group">
        <label>CHILDREN</label> 
        <input type="number" className="form-control input-lg"  onChange={(e) => window.searchCondition.children = e.target.value } /></div>
        </div>
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-4 col-md-offset-8 col-lg-offset-8 col-sm-offset-8 text-center">
        <Link to="/home">
            <a href="#" className="btn button__fill btn-lg form__search">Search</a>
        </Link>
        </div></div>
        </form>
        </div>
        </div>


    )
  }
}

export default Search
