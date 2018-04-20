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
    this.handlePageChange = this.handlePageChange.bind(this)

    houselistingService.getDistrictCodes().then((codes)=>
    {
      this.setState({districtCodes:codes.data});
      var uuids = houselistingService.getHouseId(codes.data[0].id).then((data)=>{
           this.setState({ listingRows: data });
      });
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
    return (





      <div className="listings-grid">
        <h1>Homes around the world</h1>
        <div className="row">
          <div className="col-lg-8">
            <div className="row">          
              {showListingsRows.map(row => (
                <ListingCard row={row} key={row}/>
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
          totalItemsCount={this.state.listingRows.length}
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
