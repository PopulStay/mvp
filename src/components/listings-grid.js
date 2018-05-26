import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import { withRouter } from 'react-router'
import ListingCard from './listing-card'

class ListingsGrid extends Component {

  constructor(props, context) {
    super(props);
      this.state = {
        listingRows: [],
        listingsPerPage: 12,
        districtCodes:[],
        curDistrictCodeIndex:0
      };

  }
  componentWillMount() {
    

    this.handlePageChange = this.handlePageChange.bind(this);
    if( window.searchCondition.checkInDate )
    {
      var from   = window.searchCondition.checkInDate.toDate().getTime();
    }

    if( window.searchCondition.checkOutDate )
    {
      var to = window.searchCondition.checkOutDate.toDate().getTime();
    }

    if( window.searchCondition )
    {
      var guests = window.searchCondition.guests;
      var place  = window.searchCondition.place;      
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
    console.log(this.state.listingRows);
    const showListingsRows = this.state.listingRows.slice(
      this.state.listingsPerPage * (activePage-1),
      this.state.listingsPerPage * (activePage))

    const position = { longitude: 120, latitude: 32 }


    return (

      <div className="listings-grid">
        <h1>Homes around the world</h1>
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
            <img src="./images/search-map.jpg" />
          </div>
        </div>
        
      </div>
  
    )
  }
}

export default withRouter(ListingsGrid)
