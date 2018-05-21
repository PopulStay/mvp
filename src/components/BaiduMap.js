import React from 'react';
import ReactDOM from 'react-dom';

class BaiduMap extends React.Component {
  componentDidMount () {
    var BMap = window.BMap;
    var map = new BMap.Map("allmap"); 
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    map.addControl(new BMap.MapTypeControl()); 
    map.setCurrentCity("北京");
    map.enableScrollWheelZoom(true); 
  }
  render() {
    return (
        <div id='allmap'></div>
    );
  }
}
export default BaiduMap
