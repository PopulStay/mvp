import React, { Component } from 'react';
import houselistingService from '../services/houseinfolist-service';
import GoogleMapReact from 'google-map-react';


class GoogleMap extends Component {

  constructor(props) {
    super(props);
      this.state = {
        lat:9.6075,
        lng:8.9303,
        listingRows: [],
        greatPlaces: []
      };
  }

  componentWillMount () {
      houselistingService.getDistrictCodes().then((codes)=>
      {
        this.setListingRows(codes);
      });
  }

  setListingRows =(codes) =>{
    var uuids = houselistingService.getAllLists(codes.data[0].id).then((data)=>{
        var greatPlaces = [];
        for(var i=0;i<data.length;i++){
          var obj = {};
          var latnum = (Math.random()*20).toFixed(4);
          var lngnum = (Math.random()*18).toFixed(4);
          obj.id =  data[i].price;
          obj.lat =  latnum;
          obj.lng =  lngnum;
          greatPlaces.push(obj);
        }

        console.log(greatPlaces)

        this.setState({ 
          listingRows: data,
          greatPlaces:greatPlaces,
          lat:greatPlaces[0].lat,
          lng:greatPlaces[0].lng
        });
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
            defaultZoom={6}
          >

          {places}
        </GoogleMapReact>
      </div>

    )
  }
}

export default GoogleMap
