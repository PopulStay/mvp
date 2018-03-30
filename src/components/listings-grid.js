import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import { withRouter } from 'react-router'

import ListingCard from './listing-card'

// const alertify = require('../../node_modules/alertify/src/alertify.js')

class ListingsGrid extends Component {

  constructor(props, context) {
    super(props);
    this.state = {
      listingIds: [],
      listingsPerPage: 12,
      districtCodes:[],
      curDistrictCodeIndex:0
    };
  }

  componentWillMount() {
    this.handlePageChange = this.handlePageChange.bind(this)

    houselistingService.getDistrictCodes().then((codes)=>
    {
      this.setState({districtCodes:codes});
      houselistingService.getHouseId(codes[this.state.curDistrictCodeIndex]).then((uuids)=>{
           this.setState({ listingIds: uuids });
      });
    });
  }

  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  render() {
    const activePage = this.props.match.params.activePage || 1;

    console.log(this.state.listingIds);


    const showListingsIds = this.state.listingIds.slice(
      this.state.listingsPerPage * (activePage-1),
      this.state.listingsPerPage * (activePage))
    return (





      <div className="listings-grid">
        <h1>Homes around the world</h1>
        <div className="row">
          <div className="col-lg-8">
            <div className="row">          
              {showListingsIds.map(listingId => (
                <ListingCard listingId={listingId} key={listingId}/>
              ))}
             </div>
          </div>
          <div className="col-lg-4">
           <img className="img-thumbnail" src="./images/search-map.jpg" role="presentation" />
          </div>
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={this.state.listingsPerPage}
          totalItemsCount={this.state.listingIds.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          hideDisabled="true"
        />
      </div>
    )
  }
}

export default withRouter(ListingsGrid)
