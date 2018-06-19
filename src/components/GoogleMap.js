import React, { Component } from 'react';
import houselistingService from '../services/houseinfolist-service';
import GoogleMapReact from 'google-map-react';


class GoogleMap extends Component {

  constructor(props) {
    super(props);
      this.state = {
        lat:59.955413,
        lng:30.337844,
        listingRows: [],
        greatPlaces: [
          {id: '￥148', lat: 59.955413, lng: 30.337844},
          {id: '￥588', lat: 59.724, lng: 30.080}
        ]
      };
  }

  componentDidMount() {
      houselistingService.getDistrictCodes().then((codes)=>
      {
        this.setListingRows(codes);
      });
  }

  setListingRows =(codes) =>{
    var uuids = houselistingService.getAllLists(codes.data[0].id).then((data)=>{
       

        this.setState({ listingRows: data});
    });
  }


  render() {
    const AnyReactComponent = ({ text }) => <div className="Mapicon">{text}<span></span></div>;

    const places = this.state.greatPlaces
    .map(place => {
      const {id, ...coords} = place;
      return (
        <AnyReactComponent
          {...coords}
          text={id}
        />
      );
    });


    console.log(this.props.zoom)
    return (
      <div id="Map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyD0WT2bQlRLoaTu1XbQ9U_kam0-xmmWxFA' }}
            defaultCenter={{lat:this.state.lat,lng:this.state.lng}}
            defaultZoom={9}
          >

          {places}
        </GoogleMapReact>
      </div>

    )
  }
}

export default GoogleMap
