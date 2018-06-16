import React, { Component } from 'react';
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';
import { Link } from 'react-router-dom';
import houselistingService from '../services/houseinfolist-service'
import Pagination from 'react-js-pagination'
import ListingCard from './listing-card'
import WalletClear from './walletClear';
import languageService from '../services/language-service';

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
        clicklogout:false,
        languagelist:{},
      };

      this.style = {
        style_1:{width:"",left:""},
        leftnum:0,
        svl:true,
      }

    languageService.language();
  }

  componentDidMount() {
    this.setState({ languagelist:window.languagelist });


    this.handlePageChange = this.handlePageChange.bind(this);
    
      houselistingService.getDistrictCodes().then((codes)=>
      {
        this.setListingRows(codes);
      });
  }

  onLogOut = (value) =>{
    this.setState({ clicklogout:value });
  }

  setListingRows =(codes) =>{
    this.setState({districtCodes:codes.data});
      if( window.listingRows )
      {
           this.setState({ listingRows: window.listingRows });
           var widthbox = this.state.listingRows.length*220;
           this.setState({ style : this.style.style_1.width = widthbox+'px' });
      }else{
          var uuids = houselistingService.getRecommand(codes.data[0].id).then((data)=>{
              this.setState({ listingRows: data });
              window.listingRows = data;
              var widthbox = this.state.listingRows.length*220;
              this.setState({ style : this.style.style_1.width = widthbox+'px' });
          });
      }
      console.log(this.state.listingRows.length*220)
  }

  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  nextlist(e){
    var leftnum = this.style.leftnum;
    var widthnum = parseInt(this.style.style_1.width);
    leftnum = leftnum-220;
    if(widthnum+leftnum==widthnum/2){
      leftnum = 0;
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }else{
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }
  }

  prelist(e){
    var leftnum = this.style.leftnum;
    var widthnum = parseInt(this.style.style_1.width);
    if(leftnum==0){
      leftnum = -widthnum/2
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }else{
      leftnum = leftnum+220;
      this.setState({ style : this.style.style_1.left = leftnum+'px',style : this.style.leftnum = leftnum });
    }
  }




  render() {
    const language = this.state.languagelist;
    const activePage = this.props.match.params.activePage || 1;
    const showListingsRows = this.state.listingRows;


    return (
      <div className="experienceintro">
        <div className="experienceintro_header">
          <img src="../images/experienceintro_bj.jpg" alt=""/>
          <header className="header header__white">
            <nav className="nav navbar-nav navbar-right">
              <div className="navbar-header">
                <butoon  className="glyphicon glyphicon-align-justify navBtn" onClick={(e)=>{if(this.state.box == 1) this.setState({box:0}); else this.setState({box:1}); }} data-toggle="collapse" data-target="#example-navbar-collapse"></butoon>
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
                    <a className="btn button__fill">{language.Wishlist}</a>
                  </li>
                  <li className="Li2">
                    <a className="btn button__fill">{language.Trips}</a>
                  </li>
                  <li className="Li3">
                    <Link to="/Intro">
                          {language.Help} 
                    </Link>
                  </li>
                  <li className="Li4">
                    <WalletClear clicklogout={this.state.clicklogout} onLogOut={this.onLogOut} />
                  </li>
                  <li className="Li5">
                    <GuestRegister clicklogout={this.state.clicklogout} type='0' onLogOut={this.onLogOut} />
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <div className={this.state.box == 1 ? 'headbox hide' : 'headbox'} >
              <h2>{language.Host_an_experience_on_Populstay}</h2>
              <p>{language.Earn_money_leading_people_on_activities_you_love}</p>
              <button className="btn1"><a href="/experiencelist">{language.Get_Started}</a></button>
              <button className="btn2"><a href="/Register">{language.Learn_more}</a></button>
          </div>
        </div>

        <div className="experienceintro_content">
          <div className="contentbox">
              <img className="col-sm-12 col-md-9 col-lg-9" src="../images/experienceimg1.png" />
              <h3>{language.What_are_Populsaty_Experiences}</h3>
              <p className="col-sm-12 col-md-3 col-lg-3">{language.Populstay_Experiences_are_activities}</p>
          </div>

          <div className="contentbox1">
            <div className="col-sm-12 col-md-4 col-lg-4">
              <p className="text1"><span>“</span>{language.Some_guests_are_now_writing}!<span>”</span></p>
              <p className="text2">{language.Jena}</p>
              <p className="text3">{language.Hosts_Postcard_Scavenger_Hunt_in_Oaklan}</p>
              <ul>
                <li className="bjpink"></li>
                <li></li>
                <li></li>
              </ul>
              <p className="text4">{language.Introduce_guests_to_the_activities}</p>
            </div>
            <img className="Left" src="../images/experienceimg2.png" />
            <h3>{language.Share_your_passion_with_the_world}</h3>
          </div>

          <div className="contentbox2">
              <h3>{language.Meet_interesting_people}</h3>
              <p>{language.Connect_with_a_community}</p>
              <p>{language.You_might_make_a_few_new_friends}</p>
          </div>

          <div className="contentbox3">
              <img className="img1" src="../images/experienceimg3.png" />
              <div className="box1">
                  <p className="text1">
                  <span>“</span>
                  <img src="./images/experienceimg4.png" />
                  {language.This_experience_is_made_possible}
                  <span>”</span>
                  </p>
                  <p className="text2">{language.Darragh}</p>
                  <p className="text3">{language.Guest_on_An_Untold_Story_in_Dublin}</p>
                  <ul>
                    <li className={this.state.introduce==0 ? "bjpink" : ""} onClick={(e)=>this.setState({introduce:0})}></li>
                    <li className={this.state.introduce==1 ? "bjpink" : ""} onClick={(e)=>this.setState({introduce:1})}></li>
                  </ul>
              </div>
              
              <div className={this.state.introduce==0 ? "show box2" : "hide box2"}>
                <div className="lists col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="img1"></div>
                    <p>{language.Walter_Wang}</p>
                    <p className="introduction">{language.Walter_Wang_introduction}</p>
                </div>
                <div className="lists col-xs-4 col-sm-4 col-md-4  col-lg-4">
                    <div className="img2"></div>
                    <p>{language.Xinpeng_Cai}</p>
                    <p className="introduction">{language.Xinpeng_Cai_introduction}</p>
                </div>
                <div className="lists col-xs-4 col-sm-4 col-md-4  col-lg-4">
                    <div className="img4"></div>
                    <p>{language.Brain_Lin}</p>
                    <p className="introduction">{language.Brain_Lin_introduction}</p>
                </div>
              </div>
              <div className={this.state.introduce==1 ? "show box2" : "hide box2"}>
                <div className="lists col-sm-4 col-md-4  col-lg-4 col-md-push-2">
                    <div className="img3"></div>
                    <p>{language.Ling_Jun}</p>
                    <p className="introduction">{language.Ling_Jun_introduction}</p>
                </div>
                <div className="lists col-sm-4 col-md-4  col-lg-4 col-md-push-2">
                    <div className="img5"></div>
                    <p>{language.Tamir_Wu}</p>
                    <p className="introduction">{language.Tamir_Wu_introduction}</p>
                </div>
              </div>
          </div>

          <div className="contentbox2">
              <h3>{language.Meet_the_host_community}</h3>
              <p>{language.Host_are_chefs_artists}</p>
          </div>

          <div className="contentbox4">
              <img className="img1" src="../images/experienceimg6.png" />
              <div className="box1">
                  <h3>{language.How_to_get_started}</h3>
                  <p>{language.Heres_a_brief_overview}</p>
              </div>
              <div className="box2">
                  <div className="lists col-sm-4 col-md-4 col-lg-4">
                      <span>1</span>
                      <div>
                          <h3>{language.Learn_what_were_looking_for}</h3>
                          <p>{language.Review_our_quality_standards}</p>
                      </div>
                  </div>
                  <div className="lists col-sm-4 col-md-4 col-lg-4">
                      <span>2</span>
                      <div>
                          <h3>{language.Learn_what_were_looking_for}</h3>
                          <p>{language.Create_a_page_with_descriptions}</p>
                      </div>
                  </div>
                  <div className="lists col-sm-4 col-md-4 col-lg-4">
                      <span>3</span>
                      <div>
                          <h3>{language.Learn_what_were_looking_for}</h3>
                          <p>{language.If_your_experience_meets}</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="contentbox5">
              <h3>{language.Frequently_asked_questions}</h3>
              <ul>
                  <li>
                      <p>{language.Do_i_have_to_host_a_home_to_host_an_experience}?</p>
                      <p>{language.No_You_dont_have_to_host_guests}</p>
                  </li>
                  <li>
                      <p>{language.Whats_the_time_commitment}?</p>
                      <p>{language.You_can_host_as_often_as_you_like}</p>
                  </li>
                  <li>
                      <p>{language.Do_i_need_a_business_license}?</p>
                      <p>{language.Depending_on_activities_involved}<span className="textpink">{language.Learn_more}</span></p>
                  </li>
                  <li>
                      <span>{language.Show_more}<b>▼</b></span>
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
