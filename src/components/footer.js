import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

    constructor(props) {
    super(props);
      this.state = {
        checkInDate: null,
        checkOutDate: null,
        guests:null,
        place:null,
        locationName:"Tokyo",
        Country:'America',
        CountryImg:'../images/America.png',
        CountryCurrency:'USD',
        CountryList:[
            {img:'../images/America.png',Country:'America',currency:'USD'},
            {img:'../images/China.png',Country:'China',currency:'CNY'},
            {img:'../images/Japan.png',Country:'Japan',currency:'JPY'},
            {img:'../images/France.png',Country:'France',currency:'EUR'},
            {img:'../images/Britain.png',Country:'Britain',currency:'GBP'},
            {img:'../images/Hongkong.png',Country:'Hongkong',currency:'HKD'}
        ],
      };
      window.searchCondition = this.state;
  }
  locationName(e){
    var DataName = e.currentTarget.getAttribute('data-name');
    this.setState({state: this.state.locationName = DataName});
  }
    render() {
    
    return (

    <div>
    {this.props.hideTagFooter !="NO" &&
    <footer className="footer">
        <div className="footer__brand-info container">
            <img className="footer__logo" src="../images/logo-2.png" alt="" />
            <div className="footer_ul">
                <ul>
                    <Link to="/create">
                        <li>Become a Host</li>
                    </Link>
                    <li>Help Center</li>
                    <li>About Populstay</li>
                </ul>
            </div>
            <div className="footer__dropdown pull-right">
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown"><img src={this.state.CountryImg} />{this.state.Country}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    {this.state.CountryList.map((item,index) => (
                        <li><a onClick={(e)=>this.setState({Country:item.Country,CountryImg:item.img,CountryCurrency:item.currency})} ><img src={item.img} />{item.Country}</a></li>
                      ))
                    }
                  </ul>
                </div>
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.CountryCurrency}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    {this.state.CountryList.map((item,index) => (
                        <li><a onClick={(e)=>this.setState({Country:item.Country,CountryImg:item.img,CountryCurrency:item.currency})} >{item.currency}</a></li>
                      ))
                    }
                  </ul>
                </div>
            </div>
        </div>
        <div className="footer__social-info bg-blue">
            <div className="container text-right"><span className="footer__copyright color-white pull-left">2018@copyright</span>
                <ul className="social">
                    <li><a className="social__facebook social__icon" target="__blank" href="https://fb.me/populstay"></a></li>
                    <li><a className="social__youtube social__icon" target="_blank" href="https://youtu.be/lrWl11R2ar8"></a></li>
                    <li><a className="social__telegram social__icon" target="_blank" href="https://t.me/PopulStay01"></a></li>
                    <li><a className="social__twitter social__icon" target="_blank" href="https://twitter.com/populstay"></a></li>
                    <li><a className="social__reddit social__icon" target="_blank" href="https://www.reddit.com/user/PopulStay/"></a></li>
                    <li><a className="social__wechat social__icon" href="#wechatmodal" data-toggle="modal" data-target="#wechatModal"></a></li>
                </ul>
            </div>
        </div>
        <div className="modal fade qrcod-modal" id="wechatModal" tabindex="-1" role="dialog" aria-labelledby="wechatModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header"><button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                    <div className="modal-body"><img src="./images/qrcode.jpg" alt=""/></div>
                </div>
            </div>
        </div>
    </footer>
    }
    </div>
  )
  }
}

export default Footer
