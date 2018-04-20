import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Search extends Component {

  constructor(props) {
    super(props)
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
        <div className="col-md-8 col-lg-8 col-sm-8">
        <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-6">
        <div className="form-group">
        <label for="exampleInputEmail1">CHECK IN</label> 
        <input type="text" className="form-control input-lg check-in" value="4th March"/>
        </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-6">
        <div className="form-group">
        <label for="exampleInputEmail1">CHECK OUT</label> 
        <input type="text" className="form-control input-lg check-out" value="8th March"/>
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-6">
        <div className="form-group"><label for="exampleInputEmail1">ADULTS</label> 
        <input type="text" className="form-control input-lg"/>
        </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-6">
        <div className="form-group">
        <label for="exampleInputEmail1">CHILDREN</label> 
        <input type="text" className="form-control input-lg"/></div>
        </div>
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-4 col-md-offset-8 col-lg-offset-8 col-sm-offset-8 text-center">
        <a href="./search.html" className="btn button__fill btn-lg form__search">Search</a>
        </div></div>
        </form>
        </div>
        </div>


    )
  }
}

export default Search
