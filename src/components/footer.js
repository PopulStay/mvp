import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import languageService from '../services/language-service';

class Footer extends Component {

    constructor(props) {
    super(props);
      this.state = {
        checkInDate: null,
        checkOutDate: null,
        guests:null,
        place:null,
        locationName:"Tokyo",
        Country:'English',
        CountryImg:'../images/America.png',
        CountryCurrency:'USD',
        CountryList:[
            {img:'../images/America.png',Country:'English',currency:'USD',language:'en_US'},
            {img:'../images/China.png',Country:'中文 (简体)',currency:'CNY',language:'zh_CN'}
            // {img:'../images/Hongkong.png',Country:'中文 (繁體)',currency:'HKD',language:''},
            // {img:'../images/Japan.png',Country:'Japanese',currency:'JPY',language:''},
            // {img:'../images/France.png',Country:'French',currency:'EUR',language:''},
            // {img:'../images/Britain.png',Country:'English',currency:'GBP',language:''}
        ],
        language:'en_US',
        languagelist:{},
      };
      window.searchCondition = this.state;
        languageService.language();
  }


  componentDidMount(){
    this.setState({ languagelist:window.languagelist });
           
    this.setState({
        language:localStorage.getItem('language'),
        Country:localStorage.getItem('Country'),
        CountryCurrency:localStorage.getItem('Currency'),
        CountryImg:localStorage.getItem('Countryimg'),
        state:this.state.languagelist=window.languagelist
    });
  }




  locationName(e){
    var DataName = e.currentTarget.getAttribute('data-name');
    this.setState({state: this.state.locationName = DataName});
  }

  languageCookie(e){
    var language = e.currentTarget.getAttribute('data-language');
    var Country = e.currentTarget.getAttribute('data-Country');
    var Currency = e.currentTarget.getAttribute('data-Currency');
    var Countryimg = e.currentTarget.getAttribute('data-Countryimg');

    this.setState({language:language});
   
    window.location.reload();
    
    for (var item in window.localeList) {
        if(item == language){
            var languagelist = window.localeList[item];
        }
    }
    this.setState({ languagelist:languagelist });

    localStorage.setItem('Country',Country);
    localStorage.setItem('Currency',Currency);
    localStorage.setItem('Countryimg',Countryimg);
    localStorage.setItem('language',language);

    sessionStorage.removeItem('step');
    sessionStorage.removeItem('test');


  }
    render() {

        const language = this.state.languagelist;
    
    return (

    <div>
    {this.props.hideTagFooter !="NO" &&
    <footer className="footer">
        <div className="footer__brand-info container">
            <div className="footer_ul">
                <img className="footer__logo" src="../images/logo-2.png" alt="" />
                <ul>
                    <Link to="/create">
                        <li>{language.Become_a_Host}</li>
                    </Link>
                    <li>{language.Help_Center}</li>
                    <li>{language.About_Populstay}</li>
                </ul>
            </div>
            <div className="footer__dropdown pull-right">
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown"><img src={this.state.CountryImg} />{this.state.Country}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                        <li>Used  language</li>
                    {this.state.CountryList.map((item,index) => (
                        <li data-currency={item.currency} data-language={item.language} data-Country={item.Country} data-Countryimg={item.img} onClick={(e)=>this.languageCookie(e)}><a  onClick={(e)=>this.setState({Country:item.Country,CountryImg:item.img,CountryCurrency:item.currency})} ><img src={item.img} />{item.Country}</a></li>
                      ))
                    }
                  </ul>
                </div>
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.CountryCurrency}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                        <li>Used  currency</li>
                    {this.state.CountryList.map((item,index) => (
                        <li data-currency={item.currency} data-language={item.language} data-Country={item.Country} data-Countryimg={item.img} onClick={(e)=>this.languageCookie(e)}><a data-language={item.language} onClick={(e)=>this.setState({Country:item.Country,CountryImg:item.img,CountryCurrency:item.currency})} >{item.currency}</a></li>
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
