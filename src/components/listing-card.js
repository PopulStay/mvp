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
      lister: null
    }
  }

  componentDidMount() {

    console.log(this.props.listingId);
    houselistingService.getHouseInfoDetail(this.props.listingId)
    .then((result) => {
        console.log(result[0].toNumber());
        console.log(result[1].toNumber());
        console.log(result[2]);
        console.log(result[3].toNumber());
        console.log(result[4]);
        console.log(result[5]);
        var roominfo = JSON.parse(result[5]);
        this.setState({price:result[0].toNumber()});
        this.setState({category:roominfo.category});
        this.setState({location:roominfo.location});
        this.setState({beds:roominfo.beds});

    }).catch((error) => {
      console.error(error);
    })
  }

  render() {

    return (
      <div className="col-12 col-md-6 col-lg-4 listing-card">
        <Link to={`/listing/${this.props.listingId}`}>
          <div className="photo" style={{backgroundImage:`url("${
            (this.state.pictures && this.state.pictures.length>0 &&
              (new URL(this.state.pictures[0])).protocol === "data:") ?
                this.state.pictures[0] :
                '/images/default-image.jpg'}")`
          }}>
          </div>
          <div className="category">{this.state.category} ({this.state.beds} beds)</div>
          <div className="title">{this.state.location}</div>
          <div className="price">
              {Number(this.state.price).toLocaleString(undefined, {minimumFractionDigits: 3})} PPS / day
          </div>
        </Link>
      </div>
    )
  }
}

export default ListingCard
