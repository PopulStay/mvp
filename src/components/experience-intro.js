import React, { Component } from 'react';
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';
import { Link } from 'react-router-dom';
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import ListingCard from './listing-card'


class experienceintro extends Component {

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
      <div className="experienceintro">
        <div className="experienceintro_header">
          <img src="../images/experienceintro_bj.jpg" alt=""/>
          <header className="header header__white">
            <nav className="nav navbar-nav navbar-right">
              <div className="navbar-header">
                <butoon  className="glyphicon glyphicon-align-justify navBtn" data-toggle="collapse" data-target="#example-navbar-collapse"></butoon>
                <a className="navbar-brand" href="../">
                <img className="header__logo" src="../images/logo-3.png" alt=""/>
                </a>
              </div>
              <div className="collapse navbar-collapse" id="example-navbar-collapse">  
                <a className="navbar-brand" href="../">
                  <img className="header__logo" src="../images/logo-3.png" alt=""/>
                </a>
                <ul>
                  <li className="Li1">
                    <a className="btn button__fill">Wishlist</a>
                  </li>
                  <li className="Li2">
                    <a className="btn button__fill">Trips</a>
                  </li>
                  <li className="Li3">
                    <a href="" className="btn button__Help">Help</a>
                  </li>
                  <li className="Li5">
                    <GuestRegister/>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <div className="headbox">
              <h2>Host an experience on Populstay</h2>
              <p>Earn money leading people on activities you love.</p>
              <button className="btn1"><a href="/experiencelist">Get Started</a></button>
              <button className="btn2"><a href="/Register">Learn more</a></button>
          </div>
        </div>

        <div className="experienceintro_content">
          <div className="contentbox">
              <img className="col-sm-12 col-md-9 col-lg-9" src="../images/experienceimg1.png" />
              <h3>What are Populsaty Experiences? </h3>
              <p className="col-sm-12 col-md-3 col-lg-3">Populstay Experiences are activities designed and led by inspiring locals. They go beyond typical tours or classes by immersing guests in each host's unique world. it's an opportunity for anyone to share their hobbies, skill, or expertise without needing an extra room.</p>
          </div>


          <div className="contentbox1">
            <h3>Share your passion with the world</h3>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <p className="text1"><span>“</span>Some guests are now writing and sending postcards to penpals around the world,including me!<span>”</span></p>
              <p className="text2">Jena</p>
              <p className="text3">Hosts Postcard Scavenger Hunt  in Oaklan</p>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p className="text4">Introduce guests to the activities and places you're most passionate about. We'll help you design your experience step by step with plenty of resources along the way</p>
            </div>
            <img className="Left" src="../images/experienceimg2.png" />
          </div>

          <div className="contentbox2">
              <h3>Meet interesting people</h3>
              <p>Connect with a community of traveller and locals who share your interests.</p>
              <p>You might make a few new friends, learn from fellow enthusiasts, or get someone excited about a new hobby.</p>
          </div>

          <div className="contentbox3">
              <img className="img1" src="../images/experienceimg3.png" />
              <div className="box1">
                  <p className="text1">
                  <span>“</span>
                  <img src="./images/experienceimg4.png" />
                  This experience is made possible by Tonie's wealth of expertise in regards to Ireland's  LGBTQ history.
                  <span>”</span>
                  </p>
                  <p className="text2">Darragh</p>
                  <p className="text3">Guest on An Untold Story in Dublin</p>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
              </div>
              
              <div className="box2">
                <div className="lists col-sm-4 col-md-4 col-lg-4">
                    <img className="img1" src="../images/experienceimg5.png" />
                    <p>DJ Jigue</p>
                    <p>DJ Jigue is dedicated to sharing his passion for Afro-Cuban music, Some of the guests he's exposed to Cuba's complex musical history even went to see him play a show in Austin, Texas.</p>
                </div>
                <div className="lists col-sm-4 col-md-4  col-lg-4">
                    <img className="img1" src="../images/experienceimg5.png" />
                    <p>Toby</p>
                    <p>Toby has been hosting Airbnb guests in her San Francisco home for years. Now she's opened up her art studio to teach painting techniques to travellers and locals alike.</p>
                </div>
                <div className="lists col-sm-4 col-md-4  col-lg-4">
                    <img className="img1" src="../images/experienceimg5.png" />
                    <p>Mio</p>
                    <p>After studying sewing at an art college, Mio created a kimono dressing ceremony to simplify the art of kimono wearing. Now she shares her personalised ceremony </p>
                </div>
              </div>
          </div>

          <div className="contentbox2">
              <h3>Meet the host community</h3>
              <p>Host are chefs, artists, and other in-the-know locals like you who give their guests access to activities and places they can't typically find on their own. They make everyone feel welcome, and help people in a group connect with one another</p>
          </div>

          <div className="contentbox4">
              <img className="img1" src="../images/experienceimg6.png" />
              <div className="box1">
                  <h3>How to get started</h3>
                  <p>Here’s a brief overview of the process to host an experience on Populstay</p>
              </div>
              <div className="box2">
                  <div className="lists col-sm-4 col-md-4 col-lg-4">
                      <span>1</span>
                      <div>
                          <h3>Learn what we're looking for</h3>
                          <p>Review our quality standards and see if your experience is a fit for Populstay.</p>
                      </div>
                  </div>
                  <div className="lists col-sm-4 col-md-4 col-lg-4">
                      <span>2</span>
                      <div>
                          <h3>Learn what we're looking for</h3>
                          <p>Create a page with descriptions, photos, video, and other detals. </p>
                      </div>
                  </div>
                  <div className="lists col-sm-4 col-md-4 col-lg-4">
                      <span>3</span>
                      <div>
                          <h3>Learn what we're looking for</h3>
                          <p>If your experience meets our quality standards, you can begin hosting.</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="contentbox5">
              <h3>Frequently asked questions</h3>
              <ul>
                  <li>
                      <p>Do i have to host a home to host an experience?</p>
                      <p>No. You don't have to host guests overnight in your home or space to be an experience host.</p>
                  </li>
                  <li>
                      <p>What's the time commitment?</p>
                      <p>You can host as often as you like - feel free to adjust your dates and times until you find what works best for you.</p>
                  </li>
                  <li>
                      <p>Do i need a business license?</p>
                      <p>Depending on activities involved, certain experiences may require a business license. Make sure to check local laws in your area to determine which  licenses may be required for your experience, especially if there is food, alcohol, or transportation involved. <span className="textpink">Learn more</span></p>
                  </li>
                  <li>
                      <span>Show more<b>▼</b></span>
                  </li>
              </ul>
          </div>
          
          <div className="contentbox6">
            <div className="box1">
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
            <div className="box2">
                <div className={this.state.experienceList == 1 ? "show All_experiences" : "hide All_experiences"}>
                    {showListingsRows.map(row => (
                      <div className="col-12 col-md-6 col-lg-3 listing-card">
                      <ListingCard row={row}/>
                      </div>
                    ))}
                </div>
            </div>
          </div>



        </div>

      </div>



    )
  }
}

export default withRouter(experienceintro)
