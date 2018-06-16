import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import ipfsService from '../services/ipfs-service'
import { Link } from 'react-router-dom'

class ListingCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: "Loading...",
      name: "Loading...",
      price: "Loading...",
      ipfsHash: null,
      lister: null,
      descriptioninfo:{},
      previewurl:"",
      Progress:0,
      Progresshide:0,
    }
  }

  componentDidMount() {
    houselistingService.getHouseInfoDetail(this.props.row.id)
    .then((result) => {
        var roominfo = JSON.parse(result._roominfo);
        console.log(roominfo)    
    });
    // houselistingService.getHouseInfoDetail(this.props.row)
    // .then((result) => {
    //     var roominfo = JSON.parse(result[4]);
    //     this.setState({price:result[0],category:roominfo.category,location:roominfo.location,beds:roominfo.beds});
    //     return 
    var roominfo = this.props.row.houseinfo;
    if(roominfo){
      this.setState({Progress:this.state.Progress+100})
      this.timerID = setTimeout(
        () => this.setState({Progresshide:1}),
        1000
      );
    }
    this.setState(
    {
      price:this.props.row.price,
      category:roominfo.category,
      location:roominfo.location,
      beds:roominfo.beds
    });
      
    if( this.props.row.profile )
    {
      this.setState({previewurl: this.props.row.profile.previewImage });
    }
    
    //console.log(new Date())
    // ipfsService.getListing(ipfsHash)    
    //     .then((result)=>{
    //       var descriptioninfo = JSON.parse(result);
    //      this.setState({descriptioninfo:descriptioninfo});
    //      if(descriptioninfo.selectedPictures && descriptioninfo.selectedPictures.length>0 && descriptioninfo.selectedPictures[0].imagePreviewUrl)
    //      {
    //       console.log(new Date())
    //       this.setState({previewurl:descriptioninfo.selectedPictures[0].imagePreviewUrl});
    //       console.log(this.state.previewurl);
    //      }

    // }).catch((error) => {
    //   console.error(error);
    // });
  }
  render() {
    return (
        <Link to={`/listing/${this.props.row.id}`}>
          <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
          <div className="photo" style={this.state.previewurl == '' ? {background:"#fafafa"}:{backgroundImage:"url("+this.state.previewurl+")"}}>
          <img className={this.state.previewurl == '' ? 'show' : 'hide'} src="images/loader.gif" />
          </div>
          <div className="category">{this.state.category} ({this.state.beds} beds)</div>
          <div className="title">{this.state.location}</div>
          <div className="price">
              ￥{Number(this.state.price).toLocaleString(undefined, {minimumFractionDigits: 3})} pps per night
          </div>
          <div className="divxx">
            <img src="../images/detail-xx01.png" alt="" />
            <img src="../images/detail-xx01.png" alt="" />
            <img src="../images/detail-xx01.png" alt="" />
            <img src="../images/detail-xx01.png" alt="" />
            <span>200</span> 
          </div>
        </Link>
    )
  }
}
export default ListingCard
