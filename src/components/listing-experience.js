import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import { withRouter } from 'react-router'
import ListingCard from './listing-card'
import { Link } from 'react-router-dom';

class Listingexperience extends Component {

  constructor(props, context) {
    super(props);
      this.state = {
        listingRows: [],
        listingsPerPage: 8,
        districtCodes:[],
        curDistrictCodeIndex:0,
        experienceList:1,
        lists:[
          {img:"../images/detail-carousel.jpg",location:"Tokyo1",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo2",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo3",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo4",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo5",price:200}
        ],
      };

      console.log("#################search condition#######:",window.searchCondition);
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


    houselistingService.getDistrictCodes().then((codes)=>
    {
      this.setState({districtCodes:codes.data});
      var uuids = houselistingService.getHouseId(codes.data[0].id,from,to,guests,place).then((data)=>{
           this.setState({ listingRows: data });
      });
    });
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

        <div className="container experience">
            <h2>Explore Experiences</h2>
            <div className="lunbo">
              <div className="pre glyphicon glyphicon-chevron-left" onClick={(e)=>this.prelist(e)}></div>
              <div className="content">
                  {this.state.lists.map((item,index) => (
                    <div className="lists">
                        <img src={item.img} />
                        <p>{item.location}</p>
                    </div>
                    ))
                  }
              </div>
              <div className="next glyphicon glyphicon-chevron-right" onClick={(e)=>this.nextlist(e)}></div>
            </div>
            <h2>All experiences</h2>
            <ul className="experiences_ul">
                <li>Tokyo</li>
                <li>Singapore</li>
                <li>Seoul</li>
                <li>Osaka</li>
                <li>Bangkok</li>
                <Link to="/all">
                  <li>Show All (98+)</li>
                </Link>
            </ul>
            <div className={this.state.experienceList == 1 ? "show All_experiences" : "hide All_experiences"}>
                {showListingsRows.map(row => (
                  <div className="col-12 col-md-6 col-lg-3 listing-card">
                  <ListingCard row={row}/>
                  </div>
                ))}
            </div>
            <div className={this.state.experienceList == 2 ? "show All_experiences" : "hide All_experiences"}>
              {this.state.lists.map((item,index) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 listing-card">
                    <img className="photo" src={item.img} role="presentation" />
                    <div className="category">Entire place (0.5 beds)</div>
                    <div className="title">{item.location}</div>
                    <div className="price">
                        ￥{item.price} pps per night
                    </div>
                    <div className="divxx">
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <span>200</span> 
                    </div>
                  </div>
                  ))
                }
            </div>
            <div className={this.state.experienceList == 3 ? "show All_experiences" : "hide All_experiences"}>
              {this.state.lists.map((item,index) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 listing-card">
                    <img className="photo" src={item.img} role="presentation" />
                    <div className="category">Entire place (0.5 beds)</div>
                    <div className="title">{item.location}</div>
                    <div className="price">
                        ￥{item.price} pps per night
                    </div>
                    <div className="divxx">
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <span>200</span> 
                    </div>
                  </div>
                  ))
                }
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

export default withRouter(Listingexperience)
