import React, { Component } from 'react';
import languageService from '../services/language-service';
import guestService from '../services/guest-service';

class House_step1 extends Component {

  constructor(props) {
    super(props)

    this.state={
      roomtype_category:"Whole house",
      roomtype_guests:1,
      roomtype_location:"",
      Categorys:['Whole house','Private Room','Share Room'],
      step1guests:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
      languagelist:{},
    };

    this.nextStep = this.nextStep.bind(this);

    languageService.language();
  }

  componentWillMount(){
    guestService.getGuesterInfo(window.address).then((data)=>{
      if(data)
        {
            console.log(data.user)
            this.setState({ user:data.user });
        }
    });
    this.setState({
        state:this.state.languagelist=window.languagelist,
        account: window.address,
        id: window.address,
        state:this.state.roomtype_category=this.state.languagelist.Whole_house,
        Categorys:[this.state.languagelist.Whole_house,this.state.languagelist.Private_Room,this.state.languagelist.Share_Room],
        state:this.state.roomtype_location=this.state.languagelist.TOKYO
    });
  }

  nextStep=()=>{
      sessionStorage.setItem('step', 2);
      this.props.house_step1(2,this.state.roomtype_category,this.state.roomtype_guests,this.state.roomtype_location);
  }


  render() {

        const language = this.state.languagelist;

    return (
      <div className="row Step1_1">
        <div className="col-md-6 col-lg-6  col-sm-12">
            <div className="STEPhead">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <p>{language.Step} 1</p>
            </div>
            <h1>{language.Hi},{this.state.user}!,{language.Lets_get_started_listing_your_space}</h1>

            <h2>{language.Whats_kind_of_place_do_you_have}</h2>

            <div className="box1">
              <div className="col-md-6 form-group">
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.roomtype_category}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {this.state.Categorys.map((item,index) => (
                          <li><a onClick={(e)=>this.setState({roomtype_category:item})} >{item}</a></li>
                        ))
                      }
                    </ul>
                  </div>
              </div>


              <div className="col-md-6 form-group">
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.roomtype_guests} {language.guests}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {this.state.step1guests.map((item,index) => (
                          <li><a onClick={(e)=>this.setState({roomtype_guests:item})} >{item} {language.guests}</a></li>
                        ))
                      }
                    </ul>
                  </div>
              </div>
            </div>


            <div className="form-group form-group1 col-md-6">
              <div className="locatedBox">
                <input type="text" placeholder={language.For_example_Qingdao}  className={this.state.roomtype_location == '' ? 'form-control pinkBorder' : 'form-control'} onChange={(e) => this.setState({roomtype_location: e.target.value})} value={this.state.roomtype_location}/>
              </div>
            </div>

            <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>{language.Continue}</button>
            </div>
            
            <div className="stepfoot">
                <img className="stepbg" src="../images/details_page-25_1.png" alt=""/>
                <p>{language.Listing_for_a_month}</p>
                <h4>{language.insert_your_advised_earning}$ <span>2018</span><b>/pps {language.value}:46700<img className="stepbg" src="../images/details_page-22.png" alt=""/></b></h4>

                
            </div>
        </div>
        <div className="col-md-5 col-lg-4 col-md-push-2 col-sm-12 rightbj">
            <img className="stepbg rightimg" src="../images/becomehost-step1_1.png" alt=""/>
        </div>
      </div>

    )
  }
}

export default House_step1