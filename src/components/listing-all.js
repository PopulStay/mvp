import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import { withRouter } from 'react-router'
import ListingCard from './listing-card'

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
    const showListingsRows = this.state.listingRows.slice(
      this.state.listingsPerPage * (activePage-1),
      this.state.listingsPerPage * (activePage))
   
    return (

        <div className="container experience ALL">
            <h2>All experiences</h2>
            <div className={this.state.experienceList == 1 ? "show All_experiences row" : "hide All_experiences row"}>
                {showListingsRows.map(row => (
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 listing-card">
                  <ListingCard row={row}/>
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
