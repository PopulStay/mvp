import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import { withRouter } from 'react-router'
import ListingCard from './listing-card'
import languageService from '../services/language-service';
import GoogleMap from './GoogleMap'


class ListingsGrid extends Component {

  constructor(props, context) {
    super(props);
      this.state = {
        listingRows: [],
        listingsPerPage: 8,
        districtCodes:[],
        curDistrictCodeIndex:0,
        Progress:0,
        Progresshide:0,
        languagelist:{},
      };

    languageService.language();
  }
  componentWillMount() {
    this.setState({ languagelist:window.languagelist });


    this.handlePageChange = this.handlePageChange.bind(this);

    var windowUrl = window.location.href;
    var url = windowUrl.split("&");
    for(var i = 0;i<url.length;i++){
        url[i] = url[i].split("=");
        var from = url[0][1];
        var to = url[1][1];
        var guests = url[2][1];
        var place = url[3][1];
    }

    if(window.codes)
    {
      this.setListingRows(window.codes,from,to,guests,place);
    }else{
      houselistingService.getDistrictCodes().then((codes)=>
      {
        window.codes = codes; 
        this.setListingRows(codes,from,to,guests,place);
      });
    }
  }

  setListingRows =(codes,from,to,guests,place) =>{
      this.setState({districtCodes:codes.data});
      var uuids = houselistingService.getHouseId(codes.data[0].id,from,to,guests,place).then((data)=>{
      this.setState({ listingRows: data });
    });
  }

  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  render() {
    const activePage = this.props.match.params.activePage || 1;
    const showListingsRows = this.state.listingRows.slice(
      this.state.listingsPerPage * (activePage-1),
      this.state.listingsPerPage * (activePage))

    const position = { longitude: 120, latitude: 32 }
    const language = this.state.languagelist;


    return (

      <div className="listings-grid">
        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
        <h1>{language.Homes_around_the_world}</h1>
        <div className="row">
          <div className="col-md-8 col-lg-8">
            <div className="row">          
              {showListingsRows.map(row => (
                <div className="col-sm-6 col-md-6 col-lg-4 listing-card">
                <ListingCard row={row}/>
                </div>
              ))}
             </div>
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
          </div>
          <div className="col-md-4 col-lg-4">
            <GoogleMap />
          </div>
        </div>
        
      </div>
  
    )
  }
}

export default withRouter(ListingsGrid)
