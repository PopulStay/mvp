import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import houselistingService from '../services/houseinfolist-service'
import { withRouter } from 'react-router'
import ListingCard from './listing-card'


class Search extends Component {

  constructor(props) {
    super(props);
      this.state = {
        checkInDate: null,
        checkOutDate: null,
        guests:null,
        place:null,
        locationName:"Tokyo",
        listingRows: [],
        listingsPerPage: 6,
        districtCodes:[],
        curDistrictCodeIndex:0,
        Progress:0,
        Progresshide:0,
        Childen:0,
        Adults:1,
        url:""
      };

  }

  
  locationName(e){
    var DataName = e.currentTarget.getAttribute('data-name');
    this.setState({state: this.state.locationName = DataName});
  }

  componentDidMount() {
      houselistingService.getDistrictCodes().then((codes)=>
      {
       
        this.setListingRows(codes);
        this.setState({Progress:this.state.Progress+35})
      });
      this.setURL();
  }

  setURL =()=>{
      if(this.state.checkInDate && this.state.checkOutDate )
      {
        var checkOutDate = this.state.checkOutDate.toDate().getTime();
        var checkInDate = this.state.checkInDate.toDate().getTime();
        }

        var url = "/home/search?checkInDate="+checkInDate+"&checkOutDate="+checkInDate+"&Adults="+this.state.Adults+"&Childen="+this.state.Childen
        this.setState({url:url});
  }
  
  setListingRows =(codes) =>{
    this.setState({Progress:this.state.Progress+35})
    this.setState({districtCodes:codes.data});
      if( window.listingRows )
      {
         this.setState({ listingRows: window.listingRows });
         this.setState({Progress:this.state.Progress+35})
         if (this.state.Progress>=100) {
            this.timerID = setTimeout(
              () => this.setState({Progresshide:1}),
              1000
            );
          }
      }else{
          var uuids = houselistingService.getRecommand(codes.data[0].id).then((data)=>{
              this.setState({ listingRows: data });
              this.setState({Progress:this.state.Progress+35})

              window.listingRows = data;
              this.setState({Progress:this.state.Progress+35});
              
              if (this.state.Progress>=100) {
                this.timerID = setTimeout(
                  () => this.setState({Progresshide:1}),
                  1000
                );
              }
          });
      }
  }


  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  render() {
       const activePage = this.props.match.params.activePage || 1;
      const showListingsRows = this.state.listingRows.slice(
      this.state.listingsPerPage * (activePage-1),
      this.state.listingsPerPage * (activePage))

    return (
      <div className="form">
        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
        <div className="container index_content">
            <h1>Find dream homes and experiences  on PopulStay</h1>
            <span className="color-pink text-bold">PopulStay-Superior Guest Experience & Maximized Owner Profit</span>
            <h4>Choose your city !</h4>
            <ul className="form__location row">
                <li className="col-md-2 col-lg-2 col-sm-4 active" data-name="Tokyo"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Tokyo" ? "../images/location-13_1.png" : "../images/location-13.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-4" data-name="New York"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "New York" ? "../images/location-14_1.png" : "../images/location-14.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-4" data-name="Shanghai"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Shanghai" ? "../images/location-15_1.png" : "../images/location-15.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-4" data-name="London"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "London" ? "../images/location-16_1.png" : "../images/location-16.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-4" data-name="Paris"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Paris" ? "../images/location-17_1.png" : "../images/location-17.png"} alt="" />
                </li>
                <li className="col-md-2 col-lg-2 col-sm-4" data-name="Singapore"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Singapore" ? "../images/location-18_1.png" : "../images/location-18.png"} alt="" />
                </li>
            </ul>
            <form action="">
                <div className="row">
                    
                    <div className="col-md-12 col-lg-12 col-sm-12 ">

                        <div className=" col-sm-8 col-md-8 col-lg-8 index_box">
                            <div className="col-md-12 col-lg-12 col-sm-12 guestsleft">
                                <div className="form-group">
                                    <label className="col-sm-6 col-md-6 col-lg-6 ">Check in</label>
                                    <label className="col-sm-6 col-md-6 col-lg-6 ">Check out</label>
                                    <DateRangePicker startDate={this.state.checkInDate} startDateId="start_date" endDate={this.state.checkOutDate} endDateId="end_date" onDatesChange={({ startDate, endDate })=> {this.setState({checkInDate: startDate, checkOutDate: endDate });window.searchCondition.checkOutDate = endDate;window.searchCondition.checkInDate = startDate;}} focusedInput={this.state.focusedInput} onFocusChange={focusedInput => this.setState({ focusedInput })} readOnly />
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-6 col-sm-6 guestsnum Left">
                                <div className="form-group">
                                    <label>Adults</label>
                                    <input type="number" className="form-control input-lg" onChange={(e)=> this.setState({Adults: e.target.value}) } />
                                </div>
                            </div>
                      

                            <div className="col-md-6 col-lg-6 col-sm-6 guestsnum Right">
                                <div className="form-group">
                                    <label>Childen</label>
                                    <input type="number" className="form-control input-lg" onChange={(e)=> this.setState({Childen: e.target.value}) }/>
                                </div>
                            </div>

                        </div>

                        <div className="search  col-sm-3  col-md-3  col-lg-3">
                            <Link to={this.state.url}  >
                            <a onClick={this.setURL} href="#" className="btn button__fill btn-lg form__search">
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
                            <a href="../"><li className="litext1">HOMES</li></a>
                            <li className="liicon">•</li>
                            <a href="/experience"><li className="litext1">EXPERIENCE</li></a>
                        </ul>
                    </div>
                </div>
            </form>
        </div>

        <div className="container index_home">
            <h2>Homes around the world</h2>
            <div className="overflow row">
                  {showListingsRows.map(row => (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 listing-card">
                    <ListingCard row={row}/>
                    </div>
                  ))}
            </div>
            <Link to="/all">
            <h4>Show all ({this.state.listingRows.length > 99 ? this.state.listingRows.length+"+" : this.state.listingRows.length})</h4>
            </Link>
        </div>
        <div className="container index_home">
            <h2>Experiences travellers love</h2>
            <p>Book activities led by local hosts on your next trip</p>
            <div className="overflow row">
                {showListingsRows.map(row => (
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 listing-card">
                  <ListingCard row={row}/>
                  </div>
                ))}
            </div>
            <Link to="/all">
            <h4>Show all ({this.state.listingRows.length > 99 ? this.state.listingRows.length+"+" : this.state.listingRows.length})</h4>
            </Link>
        </div>
    </div>


    )
  }
}

export default withRouter(Search)
