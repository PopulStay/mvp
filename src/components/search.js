import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import houselistingService from '../services/houseinfolist-service'
import { withRouter } from 'react-router'
import ListingCard from './listing-card'
import languageService from '../services/language-service';


class Search extends Component {

  constructor(props) {
    super(props);
      this.state = {
        checkInDate: 0,
        checkOutDate: 0,
        guests:1,
        location:"Tokyo",
        locationName:"Tokyo",
        listingRows: [],
        listingsPerPage: 6,
        districtCodes:[],
        curDistrictCodeIndex:0,
        Progress:0,
        Progresshide:0,
        url:"",
        languagelist:{},
      };
    languageService.language();
  }

  
  locationName(e){
    var DataName = e.currentTarget.getAttribute('data-name');
    this.setState({state: this.state.locationName = DataName});
  }

  componentDidMount() {

    this.setState({ languagelist:window.languagelist });

      houselistingService.getDistrictCodes().then((codes)=>
      {
       
        this.setListingRows(codes);
        this.setState({Progress:this.state.Progress+100})
        if (this.state.Progress>=100) {
          this.timerID = setTimeout(
            () => this.setState({Progresshide:1}),
            1000
          );
        }
      });
  }

  setURL =()=> {
      if(this.state.checkInDate && this.state.checkOutDate )
      {
        var checkOutDate = this.state.checkOutDate.toDate().getTime();
        var checkInDate = this.state.checkInDate.toDate().getTime();
        }

        var url = "/home/search?checkInDate="+checkInDate+"&checkOutDate="+checkInDate+"&guests="+this.state.guests+"&location="+this.state.location
        this.setState({url:url});
        window.location.href=url;
  }
  
  setListingRows =(codes) =>{
    this.setState({districtCodes:codes.data});
      if( window.listingRows )
      {
         this.setState({ listingRows: window.listingRows });
      }else{
          var uuids = houselistingService.getRecommand(codes.data[0].id).then((data)=>{
              this.setState({ listingRows: data });

              window.listingRows = data;
          });
      }
  }


  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  render() {
      const language = this.state.languagelist;
      const activePage = this.props.match.params.activePage || 1;
      const showListingsRows = this.state.listingRows.slice(
      this.state.listingsPerPage * (activePage-1),
      this.state.listingsPerPage * (activePage))

    return (
      <div className="form">
        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
        <div className="container index_content">
            <h1>{language.Find_dream_homes_and_experiences_on_PopulStay}</h1>
            <span className="color-pink text-bold">{language.PopulStay_Superior_Guest_Experience_Maximized_Owner_Profit}</span>
            <h4>{language.Choose_your_city}</h4>
            <ul className="form__location row">
                <li className="col-xs-6 col-md-2 col-lg-2 col-sm-4 active" data-name="Tokyo"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Tokyo" ? "../images/location-13_1.png" : "../images/location-13.png"} alt="" />
                </li>
                <li className="col-xs-6 col-md-2 col-lg-2 col-sm-4" data-name="New York"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "New York" ? "../images/location-14_1.png" : "../images/location-14.png"} alt="" />
                </li>
                <li className="col-xs-6 col-md-2 col-lg-2 col-sm-4" data-name="Shanghai"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Shanghai" ? "../images/location-15_1.png" : "../images/location-15.png"} alt="" />
                </li>
                <li className="col-xs-6 col-md-2 col-lg-2 col-sm-4" data-name="London"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "London" ? "../images/location-16_1.png" : "../images/location-16.png"} alt="" />
                </li>
                <li className="col-xs-6 col-md-2 col-lg-2 col-sm-4" data-name="Paris"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Paris" ? "../images/location-17_1.png" : "../images/location-17.png"} alt="" />
                </li>
                <li className="col-xs-6 col-md-2 col-lg-2 col-sm-4" data-name="Singapore"  onClick={(e)=>this.locationName(e)}>
                    <img src={this.state.locationName != "Singapore" ? "../images/location-18_1.png" : "../images/location-18.png"} alt="" />
                </li>
            </ul>
            <form action="">
                <div className="row">
                    
                    <div className="col-md-12 col-lg-12 col-sm-12 ">

                        <div className=" col-sm-12 col-md-8 col-lg-8 index_box">
                            <div className="col-md-12 col-lg-12 col-sm-12 guestsleft">
                                <div className="form-group">
                                    <label className="col-sm-6 col-md-6 col-lg-6 ">{language.Check_in}</label>
                                    <label className="col-sm-6 col-md-6 col-lg-6 Right">{language.Check_out}</label>
                                    <DateRangePicker 
                                      startDatePlaceholderText={language.start_date}
                                      endDatePlaceholderText={language.end_date}
                                      startDate={this.state.checkInDate} 
                                      startDateId='start date' 
                                      endDate={this.state.checkOutDate} 
                                      endDateId='end date' 
                                      onDatesChange={({ startDate, endDate })=> {this.setState({checkInDate: startDate, checkOutDate: endDate });
                                      window.searchCondition.checkOutDate = endDate;window.searchCondition.checkInDate = startDate;}} 
                                      focusedInput={this.state.focusedInput} 
                                      onFocusChange={focusedInput => this.setState({ focusedInput })} 
                                      readOnly 
                                      numberOfMonths
                                    />
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 guestsnum Left">
                                <div className="form-group">
                                    <label>{language.guests}</label>
                                    <input type="number" className="form-control input-lg" value={this.state.guests} onChange={(e)=> this.setState({guests: e.target.value}) } />
                                </div>
                            </div>
                      

                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 guestsnum Right">
                                <div className="form-group">
                                    <label>{language.location}</label>
                                    <input type="text" className="form-control input-lg" value={this.state.location} onChange={(e)=> this.setState({location: e.target.value}) }/>
                                </div>
                            </div>

                        </div>

                        <div className="search  col-sm-12  col-md-3  col-lg-3">
                            <a onClick={this.setURL} href="#" className="btn button__fill btn-lg form__search">
                                <img src="../images/search_home.png" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-12 index_foot">
                        <ul>
                            <li className="liimg"><img src="../images/img_home.png" /></li>
                            <li className="litext">{language.Find_dream}</li>
                            <li className="liicon">•</li>
                            <a href="../"><li className="litext1">{language.HOMES}</li></a>
                            <li className="liicon">•</li>
                            <a><li className="litext1">{language.EXPERIENCE}</li></a>
                        </ul>
                    </div>
                </div>
            </form>
        </div>

        <div className="container index_home">
            <h2>{language.Homes_around_the_world}</h2>
            <div className="overflow row">
                  {showListingsRows.map(row => (
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 listing-card">
                    <ListingCard row={row}/>
                    </div>
                  ))}
            </div>
            <Link to="/all">
            <h4 className={this.state.listingRows.length>=8 ? 'show' : 'hide'}>{language.Show_all} ({this.state.listingRows.length > 99 ? this.state.listingRows.length+"+" : this.state.listingRows.length})</h4>
            </Link>
        </div>
        <div className="container index_home">
            <h2>{language.Stay_tuned}</h2>
        </div>
    </div>


    )
  }
}

export default withRouter(Search)
