import React, { Component } from 'react';
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';
import { Link } from 'react-router-dom';
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import ListingCard from './listing-card'
import WalletClear from './walletClear';


class experienceintro extends Component {

  constructor(props, context) {
    super(props);
      this.state = {
        listingRows: [],
        listingsPerPage: 8,
        districtCodes:[],
        curDistrictCodeIndex:0,
        experienceList:1,
        introduce:0,
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
         var widthbox = this.state.listingRows.length*220*2;
         this.setState({ listingRows: window.listingRows });
         this.setState({ style : this.style.style_1.width = widthbox+'px' });
         
      }else{
          var uuids = houselistingService.getHouseId(codes.data[0].id,from,to,guests,place).then((data)=>{
          this.setState({ listingRows: data });
          window.listingRows = data;
          var widthbox = this.state.listingRows.length*220*2;
          this.setState({ style : this.style.style_1.width = widthbox+'px' });
      });
      }
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

  onLogOut = () =>{
    this.setState({ registered:false });
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
                  <li className="Li4">
                    <WalletClear onLogOut={this.onLogOut} />
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
            <div className="col-sm-12 col-md-4 col-lg-4">
              <p className="text1"><span>“</span>Some guests are now writing and sending postcards to penpals around the world,including me!<span>”</span></p>
              <p className="text2">Jena</p>
              <p className="text3">Hosts Postcard Scavenger Hunt  in Oaklan</p>
              <ul>
                <li className="bjpink"></li>
                <li></li>
                <li></li>
              </ul>
              <p className="text4">Introduce guests to the activities and places you're most passionate about. We'll help you design your experience step by step with plenty of resources along the way</p>
            </div>
            <img className="Left" src="../images/experienceimg2.png" />
            <h3>Share your passion with the world</h3>
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
                    <li className={this.state.introduce==0 ? "bjpink" : ""} onClick={(e)=>this.setState({introduce:0})}></li>
                    <li className={this.state.introduce==1 ? "bjpink" : ""} onClick={(e)=>this.setState({introduce:1})}></li>
                  </ul>
              </div>
              
              <div className={this.state.introduce==0 ? "show box2" : "hide box2"}>
                <div className="lists col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="img1"></div>
                    <p>Walter Wang</p>
                    <p>Founder and chief executive officer of computer biology of National University of Singapore, the first local data scientist of Singapore Telecom, 5 years Airbnb landlord experience, 2 years Airbnb intelligent door lock cooperation supplier, the design product intelligent key box won the German IF Industrial Design Award, the company is valued over 100 million. Audemars Pigeut to host the landlord experience let him see the block chain technology can solve the existing home platform pain point, choose to give up ten million shares in the peak period of the cause, All in block chain community, to do a larger, more meaningful thing, the creation of the PopulStay tide box.</p>
                </div>
                <div className="lists col-xs-4 col-sm-4 col-md-4  col-lg-4">
                    <div className="img2"></div>
                    <p>Xinpeng Cai</p>
                    <p>Co - founder and chief operating officer, Australia Sven Bourne Institute, a Bachelor of business management, 10 consecutive entrepreneurs, who joined Evonik, led a 20 million euro supply chain start-up, and achieved 25 million euro per year sales of personal care products per year, and founded Wielan Pte Ltd. in 2015.The founder and chief economist of Ling Jun, the founder and CEO, is the founder and the founder of science and technology, and the industrial economics of the Chinese Academy of social sciences is reading Ph. D. and MBA of the Senior Finance School of Shanghai Jiao Tong University. He has been inaugurated by the rejuvenation group, Pacific Insurance and green city group. The real estate industry has a wide range of Social Sciences and resources, and is currently in charge of financing and strategic planning in China.</p>
                </div>
                <div className="lists col-xs-4 col-sm-4 col-md-4  col-lg-4">
                    <div className="img3"></div>
                    <p>Ling Jun</p>
                    <p>The founder and chief economist of the magic formula & the founder and CEO, the industrial economics of the Chinese Academy of Social Sciences, MBA, the Senior Finance School of Shanghai Jiao Tong University, the former inauguration group, the Pacific Insurance, the green city group, the investment base of the real estate investment of 100 billion yuan, to the domestic real estate bank It has social science knowledge and extensive resources, and is currently responsible for financial management and strategic planning in China.</p>
                </div>
              </div>
              <div className={this.state.introduce==1 ? "show box2" : "hide box2"}>
                <div className="lists col-sm-4 col-md-4  col-lg-4 col-md-push-2">
                    <div className="img4"></div>
                    <p>Brain Lin</p>
                    <p>Co founder and chief brand operation officer, Professor of Law School of Chinese business school, Shanghai Jiao Tong University, has been the director of digital marketing in Greater China, Yang Shi. Continuous entrepreneurs, the founder of the time image culture media and the lion air chain fitness investment management partner, the founder of want to be, an evolutionary rabbit in the field of knowledge pay, responsible for business development and operation.</p>
                </div>
                <div className="lists col-sm-4 col-md-4  col-lg-4 col-md-push-2">
                    <div className="img5"></div>
                    <p>Tamir Wu</p>
                    <p>The co founder and market business extends the real estate and urban construction of Tongji University in Shanghai and combines the co founder of science and technology. It is the alliance of the space operation industry chain jointly established by the golden clothing and the famous domestic decoration, furniture and household appliances enterprises and so on. It is committed to creating a high quality, low cost and efficient supply chain service system. To make a better living</p>
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
            <div className="box2">
                <div className={this.state.experienceList == 1 ? "show All_experiences" : "hide All_experiences"}>
                    {showListingsRows.map(row => (
                      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 listing-card">
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
