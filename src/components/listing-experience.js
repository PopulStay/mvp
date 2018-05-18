import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import { withRouter } from 'react-router'
import ListingCard from './listing-card'
import { Link } from 'react-router-dom';
import ipfsService from '../services/ipfs-service'

class Listingexperience extends Component {

  constructor(props, context) {
    super(props);
      this.state = {
        listingRows: [],
        listingsPerPage: 8,
        districtCodes:[],
        curDistrictCodeIndex:0,
        locationtype:0,
      };

      this.style = {
        style_1:{width:"",left:""},
        leftnum:0,
        svl:true,
      }
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


    houselistingService.getDistrictCodes().then((codes)=>
    {
      this.setState({districtCodes:codes.data});
      var uuids = houselistingService.getHouseId(codes.data[0].id,from,to,guests,place).then((data)=>{
          this.setState({ listingRows: data });
          
          var widthbox = this.state.listingRows.length*220*2;
          this.setState({ style : this.style.style_1.width = widthbox+'px' });
      });
    });

    
  }

  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  nextlist(e){
    var leftnum = this.style.leftnum;
    var widthnum = parseInt(this.style.style_1.width);
    leftnum = leftnum-220
    if(widthnum/2+leftnum==0){
      leftnum = 0;
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }else{
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }
  }

  prelist(e){
    var leftnum = this.style.leftnum;
    var widthnum = parseInt(this.style.style_1.width);
    console.log(-widthnum/2)
    if(leftnum==0){
      leftnum = -widthnum/2+220
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }else{
      leftnum = leftnum+220;
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }
  }

  render() {

    const activePage = this.props.match.params.activePage || 1;
    const showListingsRows = this.state.listingRows.slice(
      this.state.listingsPerPage * (activePage-1),
      this.state.listingsPerPage * (activePage))
   
    return (

        <div className="container experience">
            <h2>Explore Experiences</h2>
            <div className="lunbo">
              <div className="pre glyphicon glyphicon-chevron-left" onClick={(e)=>this.prelist(e)}></div>
              <div className="content">
                <div className="listdiv" style={this.style.style_1}>
                    {showListingsRows.map(row => (
                      <div className="lists">
                        <ListingCard row={row}/>
                      </div>
                    ))}
                    {showListingsRows.map(row => (
                      <div className="lists">
                        <ListingCard row={row}/>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="next glyphicon glyphicon-chevron-right" onClick={(e)=>this.nextlist(e)}></div>
            </div>
            <h2>All experiences</h2>
            <ul className="experiences_ul">
                <li className={this.state.locationtype == 1 ? "locationActive" : ""} onClick={(e)=>this.setState({locationtype:1})}>Tokyo</li>
                <li className={this.state.locationtype == 2 ? "locationActive" : ""} onClick={(e)=>this.setState({locationtype:2})}>Singapore</li>
                <li className={this.state.locationtype == 3 ? "locationActive" : ""} onClick={(e)=>this.setState({locationtype:3})}>Seoul</li>
                <li className={this.state.locationtype == 4 ? "locationActive" : ""} onClick={(e)=>this.setState({locationtype:4})}>Osaka</li>
                <li className={this.state.locationtype == 5 ? "locationActive" : ""} onClick={(e)=>this.setState({locationtype:5})}>Bangkok</li>
                <Link to="/all">
                  <li>Show All ({this.state.listingRows.length > 99 ? this.state.listingRows.length+"+" : this.state.listingRows.length})</li>
                </Link>
            </ul>
            <div className="All_experiences row">
                {showListingsRows.map(row => (
                  <div className="col-12 col-md-4 col-lg-3 listing-card">
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
            </div>
        </div>

  
    )
  }
}

export default withRouter(Listingexperience)
