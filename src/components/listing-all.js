import React, { Component } from 'react';
import houselistingService from '../services/houseinfolist-service';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router';
import ListingCard from './listing-card';
import { Link } from 'react-router-dom';
import tagService from '../services/tag-service';

class Listingall extends Component {

  constructor(props, context) {
    super(props);
      this.state = {
        listingRows: [],
        listingsPerPage: 20,
        districtCodes:[],
        curDistrictCodeIndex:0,
        experienceList:1,
      };

      window.searchCondition = this.state;
  }

  componentDidMount() {
    this.handlePageChange = this.handlePageChange.bind(this);
    
      houselistingService.getDistrictCodes().then((codes)=>
      {
        this.setListingRows(codes);
      });

      this.timerID = setTimeout(
        () => this.setState({Progresshide:1}),
        1000
      );
  }

  setListingRows =(codes) =>{
    this.setState({districtCodes:codes.data});
    
    var CityStorage =  sessionStorage.getItem('City');
    var AdultStorage =  JSON.parse(sessionStorage.getItem('guests'));
    var Home_TypeStorage =  sessionStorage.getItem('Home_Type');
    var PriceminStorage =  sessionStorage.getItem('Pricemin');
    var PricemaxStorage =  sessionStorage.getItem('Pricemax');

    if(AdultStorage){
        var GuestStorage = AdultStorage.Adult +  AdultStorage.children + AdultStorage.Baby;
    }

    if( window.listingRows ){
         this.setState({ listingRows: window.listingRows });
    }else{
          var uuids = houselistingService.getRecommand(codes.data[0].id).then((data)=>{
          var lists = [];
              for(var i=0;i<data.length;i++){
                var City = data[i].place.toUpperCase();
                var guests = Number(data[i].guests);
                var category = data[i].houseinfo.category;
                var price = data[i].price;
                console.log(CityStorage)
                console.log(Home_TypeStorage)
                if(!CityStorage && !Home_TypeStorage && !GuestStorage && !PricemaxStorage){
                    lists.push(data[i]);
                    this.setState({ listingRows: lists});
                }else if(!CityStorage && Home_TypeStorage && GuestStorage && PricemaxStorage){
                  console.log(2)
                  if(guests >= GuestStorage && category == Home_TypeStorage && price >= PriceminStorage && price <= PricemaxStorage){
                    console.log(data[i])
                    lists.push(data[i]);
                    this.setState({ listingRows: lists});
                  }
                }else{
                  console.log(3)
                  if(City == CityStorage && guests >= GuestStorage && category == Home_TypeStorage && price >= PriceminStorage && price <= PricemaxStorage){
                    console.log(data[i])
                    lists.push(data[i]);
                    this.setState({ listingRows: lists});
                  }
                }
              }
              window.listingRows = data;
          });
      }
  }


  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  nextlist(e){
    this.setState({state: this.state.lists.push(this.state.lists[0])});
    this.setState({
        lists: this.state.lists.filter((elem, i) => 0 != i)
    });
  }
  prelist(e){
    this.setState({state: this.state.lists.unshift(this.state.lists[this.state.lists.length-1])});
    this.setState({
        lists: this.state.lists.filter((elem, i) => this.state.lists.length-1 != i)
    });
  }

  render() {

    const activePage = this.props.match.params.activePage || 1;
    const showListingsRows = this.state.listingRows;
   
    return (

        <div className="container experience ALL">
        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
            <h2>All experiences</h2>
            <div className={this.state.experienceList == 1 ? "show All_experiences row" : "hide All_experiences row"}>
                {showListingsRows.map(item => (
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 listing-card">
                      <Link to={`/listing/${item.id}`}>
                        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
                        <div className="photo" style={!item.profile.previewImage ? {backgroundImage:"url(/images/registerlist_4.png)"}:{backgroundImage:"url("+item.profile.previewImage+")"}}>
                        </div>
                        <div className="category">{item.houseinfo.category} ({item.houseinfo.beds} beds)</div>
                        <div className="title">{item.houseinfo.location}</div>
                        <div className="price">
                            ￥{Number(item.price).toLocaleString(undefined, {minimumFractionDigits: 3})} pps per night
                        </div>
                        <div className="divxx">
                          <img src="../images/detail-xx01.png" alt="" />
                          <img src="../images/detail-xx01.png" alt="" />
                          <img src="../images/detail-xx01.png" alt="" />
                          <img src="../images/detail-xx01.png" alt="" />
                          <span>200</span> 
                        </div>
                      </Link>
                  </div>
                ))}
            </div>
            <div className="listspan">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={this.state.listingsPerPage}
                totalItemsCount={this.state.listingRows.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                hideDisabled="true"
              />
              <span className={this.state.experienceList == 1 ? "active hide" : ""}  onClick={(e)=>this.setState({experienceList:1})}></span>
              <span className={this.state.experienceList == 1 ? "active hide" : ""}  onClick={(e)=>this.setState({experienceList:2})}></span>
              <span className={this.state.experienceList == 1 ? "active hide" : ""}  onClick={(e)=>this.setState({experienceList:3})}></span>
            </div>
        </div>

  
    )
  }
}

export default withRouter(Listingall)
