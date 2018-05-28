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
        lunlistingRows:[],
        districtCodes:[],
        curDistrictCodeIndex:0,
        locationtype:"",
      };

      this.style = {
        style_1:{width:"",left:""},
        leftnum:0,
        svl:true,
      }
  }

  componentDidMount() {

    this.handlePageChange = this.handlePageChange.bind(this);
    
      houselistingService.getDistrictCodes().then((codes)=>
      {
        this.setListingRows(codes);
      });
    
  }

   setListingRows =(codes) =>{
      this.setState({districtCodes:codes.data});

      if( window.listingRows ){  
          this.setState({ listingRows: window.listingRows,lunlistingRows: window.listingRows});
          var widthbox = this.state.listingRows.length*220;
          this.setState({ style : this.style.style_1.width = widthbox+'px' });
      }else{
          var uuids = houselistingService.getRecommand(codes.data[0].id).then((data)=>{
          this.setState({ listingRows: data ,lunlistingRows: data});
          var widthbox = this.state.listingRows.length*220;
          this.setState({ style : this.style.style_1.width = widthbox+'px' });
          window.listingRows = data;
        });
     }

     this.setState({Progress:this.state.Progress+100})
      this.timerID = setTimeout(
        () => this.setState({Progresshide:1}),
        1000
      );

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

  locationtype(e){
    var DataIndex = e.currentTarget.getAttribute('data-type');
    this.setState({locationtype:DataIndex})
    houselistingService.getlocationtype(DataIndex).then((data)=>
    {
      this.setState({listingRows:data});
      console.log(this.state.listingRows);
    });
  }

  render() {

    const activePage = this.props.match.params.activePage || 1;
    const showListingsRows = this.state.listingRows;
   
    return (

        <div className="container experience">
        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
            <h2>Explore Experiences</h2>
            <div className="lunbo">
              <div className="pre glyphicon glyphicon-chevron-left" onClick={(e)=>this.prelist(e)}></div>
              <div className="content">
                <div className="listdiv" style={this.style.style_1}>
                    {this.state.lunlistingRows.map(row => (
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
                <li className={this.state.locationtype == "Tokyo" ? "locationActive" : ""} data-type="Tokyo" onClick={(e)=>this.locationtype(e)}>TOKYO</li>
                <li className={this.state.locationtype == "NEW YORK" ? "locationActive" : ""} data-type="NEW YORK" onClick={(e)=>this.locationtype(e)}>NEW YORK</li>
                <li className={this.state.locationtype == "SHANGHAI" ? "locationActive" : ""} data-type="SHANGHAI" onClick={(e)=>this.locationtype(e)}>SHANGHAI</li>
                <li className={this.state.locationtype == "LONDON" ? "locationActive" : ""} data-type="LONDON" onClick={(e)=>this.locationtype(e)}>LONDON</li>
                <li className={this.state.locationtype == "PARIS" ? "locationActive" : ""} data-type="PARIS" onClick={(e)=>this.locationtype(e)}>PARIS</li>
                <li className={this.state.locationtype == "SINGAPORE" ? "locationActive" : ""} data-type="SINGAPORE" onClick={(e)=>this.locationtype(e)}>SINGAPORE</li>
                <Link to="/all">
                  <li>Show All ({this.state.listingRows.length > 99 ? this.state.listingRows.length+"+" : this.state.listingRows.length})</li>
                </Link>
            </ul>
            <div className="All_experiences row">
                {showListingsRows.map(item => (
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 listing-card">
                      <Link to={`/listing/${item.id}`}>
                        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
                        <div className="photo" style={!item.profile.previewImage ? {backgroundImage:"url(/images/registerlist_4.png)"}:{backgroundImage:"url("+item.profile.previewImage+")"}}>
                        </div>
                        <div className="category">{item.houseinfo.category} ({item.houseinfo.beds} beds)</div>
                        <div className="title">{item.houseinfo.location}</div>
                        <div className="price">
                            ￥{Number(item.price).toLocaleString(undefined, {minimumFractionDigits: 3})} pps per night
                        </div>
                        <div className="divxx">
                          <img src="../images/detail-xx01.png" alt="" />
                          <img src="../images/detail-xx01.png" alt="" />
                          <img src="../images/detail-xx01.png" alt="" />
                          <img src="../images/detail-xx01.png" alt="" />
                          <span>200</span> 
                        </div>
                      </Link>
                  </div>
                ))}
            </div>
        </div>

  
    )
  }
}

export default withRouter(Listingexperience)
