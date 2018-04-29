import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import houselistingService from '../services/houseinfolist-service';
import ListingDetail from './listing-detail';
import Overlay from './overlay';
import hostService from '../services/host-service';



class ListingCreate extends Component {

    constructor(props) {
        super(props)

        this.STEP = {
            Step1_1: 1.1,
            Step1_2: 1.2,
            Step1_3: 1.3,
            Step1_4: 1.4,
            Step1_5: 1.5,
            Step1_6: 1.6,
            Step1_7: 1.7,
            Step1_8: 1.8,
            Step1_9: 1.9,
            Step1_10: 2,
            Step2_1: 2.1,
            Step2_2: 2.2,
            Step2_3: 2.3,
            Step2_4: 2.4,
            Step2_5: 2.5,
            Step2_6: 2.6,
            PROCESSING: 6,
            SUCCESS: 7,

        }

        this.ROOM_DESCRIPTION = {
            SETUP_FOR_GUESTS:0,
            SETUP_FOR_HOST_BELONGINGS:1

        }
        

        this.state = {
            step: 0,
            roomtype_category:"Entire place",
            roomtype_guests:1,
            roomtype_location:"Hong Kong",
            roomdescription_homeorhotel:"Please choose",
            roomdescription_type:"Please choose",
            roomdescription_guests_have:"Please choose",
            roomdescription_forguestorhost:2,
            roomdescription_title:"",
            roomdescription_phone:"",
            roomdescription_description:"",
            roombasics_guestsnumber:1,
            roombasics_guestbedrooms:0.5,
            roombasics_guestbeds:1,
            roombasics_totalguests:1,
            roombasics_commonspacebeds:1,
            roomstuff_Essentials:1,
            roomstuff_Shampoo:0,
            roomstuff_Closet_drwers:0,
            roomstuff_TV:0,
            roomstuff_Pool:0,
            roomstuff_kitchen:0,
            roomstuff_washer:0,
            roomstuff_dryer:0,
            roomstuff_Park:0,
            roomstuff_Lift:0,
            roomstuff_HotTub:0,
            roomstuff_Gym:0,
            roomstuff_Heat:0,
            roomstuff_aircondition:0,
            roomstuff_breakfastcoffetea:0,
            roomstuff_desk_workspace:0,
            roomstuff_fireplace:0,
            roomstuff_iron:0,
            roomstuff_withKids:0,
            roomstuff_BigGroups:0,
            roomstuff_pets:0,
            roomstuff_hairdryer:0,
            roomstuff_petsinhouse:0,
            roomstuff_private_entrance:0,
            roomstuff_smartpincode:0,
            roomstuff_smartpincode_password:"",
            roomstuff_smartpincode_confirmpassword:"",
            roomstuff_smoke_detector:"",
            roomstuff_Country:"China",
            roomstuff_Street:"",
            roomstuff_Apt:"",
            roomstuff_City:"",
            roomstuff_ZIPCode :"",
            roomdescription_Aboutyour:"",
            roomdescription_guestscan:"",
            roomdescription_interaction:"",
            roomdescription_Otherthings:"",
            roomdescription_neighbourhood:"",
            roomdescription_around:"",
            roomstuff_AreaCode:86,
            selectedPictures:[],
            price_perday:0,
            ETHprice_perday:0,
            user: {user:'Loading...'},
            Categorys:['Entire place','Private Room','Share Room'],
            step1guests:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
            homeorhotels:['Home','hotel','Other'],
            types:['Single room','double room','family suite','business suite'],
            guestshaves:['Entire place'],
            Countrys:["Angola","Afghanistan","Albania","Algeria","Anguilla","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda. ","Bolivia","Botswana","Brunei "," Bulgaria","Bulgaria","Burkina"," Burma"," Burundi ","Canada","the Central African Republic","Chad","Bolivia","Columbia","Congo","the Cook islands","Costa Rica","Cuba","Czech","Denmark","Denmark","Djibouti","Djibouti","Ecuador","Salvatore","Estonia ","Ethiopia","Fiji","Finland","French","French Guiana","Gabon"," Georgia "," German "," Garner "," Gibraltar "," Greece","Grenada","Guam "," Guatemala"," Guinea "," Guyana "," Haiti,"," Honduras,","Honduras","Hongkong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kazakhstan","Kenya","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Italy","Liechtenstein","Lithuania","Macao","Madagascar","Mawlawi","Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Mont salad","Morocco","Mozambique","Malta","Neo","Nepal","New Zealand","New Zealand","Nicaragua "," Niger"," Nigeria "," Norway ","Oman","Pakistan "," Papua New Guinea","Paraguay","Peru","Philippines","Poland","French Polynesia","Portuguese"," Puerto Rico "," Qatar "," Russia "," Saint Lucia ","St. Lucia","Saint Mari"," St. Mari "," Sao Tome and Principe "," Sao Tome and Principe "," Senegal","Seychelles"," Sierra Leone"," Singapore ","Slovakia"," Slovenia "," Somalia","South Africa","Senegal","Sri Lanka","Sultan"," Swaziland "," Sweden "," Switzerland"," the Swiss "," the Taiwan Province","the Taiwan Province","Tajikistan","the Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Turkey"],
            PasswordActibve:1,
            AreaCodes:[86,81,82,83],
            Rapair:1,
            scene:1,
            modalset:0,
            modalimg:'',
            rotate:0,
            range:1,

        }

        this.nextStep = this.nextStep.bind(this);
        this.preStep  = this.preStep.bind(this)
        this.addCommonSpaceBeds = this.addCommonSpaceBeds.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.deletePictures = this.deletePictures.bind(this);
        this.submit = this.submit.bind(this);

        this.CSS={  
            style1:{transform:"rotate(0deg) scale(1)"}  
        } 
    }

    submit(){
           houselistingService.submitListing(this.state)
              .then((tx) => {
                  this.setState({
                      step: this.STEP.PROCESSING
                  });
                  return houselistingService.waitTransactionFinished(tx);
              })
              .then((blockNumber) => {
                  this.setState({
                      step: this.STEP.SUCCESS
                  });
              })
              .catch((error) => {
                 
              })
    }

    fileChangedHandler(event){
        event.preventDefault();
        

        var files = this.state.selectedPictures;
        let reader = new FileReader();
        let file = event.target.files[0];

          reader.onloadend = () => {
            files.push({
              file: file,
              imagePreviewUrl: reader.result
            });
            this.setState({selectedPictures:files});
          }

        reader.readAsDataURL(file)
    }

    deletePictures(index,e){
      this.setState({
            selectedPictures: this.state.selectedPictures.filter((elem, i) => index != i)
      });

    }

    modalPictures(index,e){
      this.setState({
            state:this.state.modalimg = this.state.selectedPictures[index].imagePreviewUrl
      });
    }

    addCommonSpaceBeds(){
      var number = this.state.roombasics_commonspacebeds+1;
      this.setState({roombasics_commonspacebeds:number});
    }

    nextStep() {
      console.log(this.state);
      if(this.state.step == this.STEP.Step1_1)
      {
        if(this.state.roomtype_location == ''){
          this.setState({step:this.STEP.Step1_1});
        }else{
          this.setState({step:this.STEP.Step1_2});
        }
      }
      
      if(this.state.step == this.STEP.Step1_2)
      {
        if(this.state.roomdescription_forguestorhost == 0 || this.state.roomdescription_forguestorhost == 1){
          this.setState({step:this.STEP.Step1_3});
        }
      }
      if(this.state.step == this.STEP.Step1_3)
      {
        this.setState({step:this.STEP.Step1_4});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_4)
      {
        this.setState({step:this.STEP.Step1_5});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_5)
      {
        this.setState({step:this.STEP.Step1_6});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_6)
      {
        this.setState({step:this.STEP.Step1_7});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_7)
      {
        this.setState({step:this.STEP.Step1_8});
        console.log(this.state);
      }

      if(this.state.step == this.STEP.Step1_8)
      {
        if(this.state.roomstuff_smartpincode == 1){
            if(this.state.roomstuff_smartpincode_password != '' && this.state.roomstuff_smartpincode_confirmpassword != '' && this.state.roomstuff_smartpincode_password == this.state.roomstuff_smartpincode_confirmpassword){
              this.setState({state:this.state.PasswordActibve=1}); 
              console.log(this.state.PasswordActibve);
              this.setState({step:this.STEP.Step1_9});
            }else{
              this.setState({step:this.STEP.Step1_8});
              this.setState({state:this.state.PasswordActibve=0}); 
              console.log(this.state.PasswordActibve);
            }
        }else{
            this.setState({step:this.STEP.Step1_9});
        }
      }
      if(this.state.step == this.STEP.Step1_9)
      {
        this.setState({step:this.STEP.Step1_10});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_10)
      {
        this.setState({step:this.STEP.Step2_1});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_1)
      {
        this.setState({step:this.STEP.Step2_2});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_2)
      {
        this.setState({step:this.STEP.Step2_3});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_3)
      {
        this.setState({step:this.STEP.Step2_4});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_4)
      {
        this.setState({step:this.STEP.Step2_5});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_5)
      {
        this.setState({step:this.STEP.Step2_6});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_6)
      {
        this.setState({step:this.STEP.SUCCESS});
        console.log(this.state);
      }
      

    }

    preStep(){
      console.log(this.state);
      if(this.state.step == this.STEP.Step1_2)
      {
        this.setState({step:this.STEP.Step1_1});
      }
      if(this.state.step == this.STEP.Step1_3)
      {
        this.setState({state:this.state.roomdescription_forguestorhost=2}); 
        this.setState({step:this.STEP.Step1_2});
        console.log(this.state);
      }
       if(this.state.step == this.STEP.Step1_4)
      {
        this.setState({step:this.STEP.Step1_3});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_5)
      {
        this.setState({step:this.STEP.Step1_4});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_6)
      {
        this.setState({step:this.STEP.Step1_5});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_7)
      {
        this.setState({step:this.STEP.Step1_6});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_8)
      {
        this.setState({step:this.STEP.Step1_7});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_9)
      {
        this.setState({step:this.STEP.Step1_8});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_10)
      {
        this.setState({step:this.STEP.Step1_9});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_1)
      {
        this.setState({step:this.STEP.Step1_10});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_2)
      {
        this.setState({step:this.STEP.Step2_1});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_3)
      {
        this.setState({step:this.STEP.Step2_2});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_4)
      {
        this.setState({step:this.STEP.Step2_3});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_5)
      {
        this.setState({step:this.STEP.Step2_4});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step2_6)
      {
        this.setState({step:this.STEP.Step2_5});
        console.log(this.state);
      }


       if(this.state.step == this.STEP.SUCCESS)
      {
        this.setState({step:this.STEP.Step1_1});
        console.log(this.state);
      }


    }

  

    componentWillMount() {
        this.setState({step:this.STEP.Step1_1});
            this.setState({
                account: window.address,
                id: window.address
            });
    }

   
    Categorys(Category){
      this.setState({roomtype_category: Category});
    }
    step1guests(step1guest){
      this.setState({roomtype_guests: step1guest});
    }
    homeorhotels(homeorhotel){
      this.setState({roomdescription_homeorhotel: homeorhotel});
    }
    types(type){
      this.setState({roomdescription_type: type});
    }
    guestshaves(guestshave){
      this.setState({roomdescription_guests_have: guestshave});
    }
    Countrys(Country){
      this.setState({roomstuff_Country: Country});
    }
    AreaCodes(AreaCode){
      this.setState({roomstuff_AreaCode: AreaCode});
    }



    guestsnumber(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_guestsnumber = ++this.state.roombasics_guestsnumber});
      }else{
        if(this.state.roombasics_guestsnumber == 1){
          this.setState({state: this.state.roombasics_guestsnumber = 1});
        }else{
          this.setState({state: this.state.roombasics_guestsnumber = --this.state.roombasics_guestsnumber});
        }
      }
    }
    guestbeds(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_guestbeds = ++this.state.roombasics_guestbeds});
      }else{
        if(this.state.roombasics_guestbeds == 1){
          this.setState({state: this.state.roombasics_guestbeds = 1});
        }else{
          this.setState({state: this.state.roombasics_guestbeds = --this.state.roombasics_guestbeds});
        }
      }
    }
    totalguests(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_totalguests = ++this.state.roombasics_totalguests});
      }else{
        if(this.state.roombasics_totalguests == 1){
          this.setState({state: this.state.roombasics_totalguests = 1});
        }else{
          this.setState({state: this.state.roombasics_totalguests = --this.state.roombasics_totalguests});
        }
      }
    }
    guestbedrooms(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_guestbedrooms = this.state.roombasics_guestbedrooms+0.5});
      }else{
        if(this.state.roombasics_guestbedrooms == 0.5){
          this.setState({state: this.state.roombasics_guestbedrooms = 0.5});
        }else{
          this.setState({state: this.state.roombasics_guestbedrooms = this.state.roombasics_guestbedrooms-0.5});
        }
      }
    }

    RotatePictures(e){
      if(this.state.rotate == 360){
        this.state.rotate = 0;
      }
      this.state.rotate = this.state.rotate + 90;

      this.setState({CSS: this.CSS.style1.transform = "rotate("+this.state.rotate+"deg) scale("+this.state.range+")"})

    }

    rangePictures(e){
      this.setState({state: this.state.range = e});
        this.setState({CSS: this.CSS.style1.transform = "rotate("+this.state.rotate+"deg) scale("+this.state.range+")"})
    }

    



  render() {

    const Categoryarr = [];
    this.state.Categorys.forEach((Category,index)=>{
      Categoryarr.push(<li><a onClick={this.Categorys.bind(this,Category)} >{Category}</a></li>)
    })
    const step1guestsarr = [];
    this.state.step1guests.forEach((step1guest,index)=>{
      step1guestsarr.push(<li><a onClick={this.step1guests.bind(this,step1guest)} >for {step1guest} guests</a></li>)
    })
    const homeorhotelarr = [];
    this.state.homeorhotels.forEach((homeorhotel,index)=>{
      homeorhotelarr.push(<li><a onClick={this.homeorhotels.bind(this,homeorhotel)} >{homeorhotel}</a></li>)
    })
    const typearr = [];
    this.state.types.forEach((type,index)=>{
      typearr.push(<li><a onClick={this.types.bind(this,type)} >{type}</a></li>)
    })
    const guestshavearr = [];
    this.state.guestshaves.forEach((guestshave,index)=>{
      guestshavearr.push(<li><a onClick={this.guestshaves.bind(this,guestshave)} >{guestshave}</a></li>)
    })
    const Countryarr = [];
    this.state.Countrys.forEach((Country,index)=>{
      Countryarr.push(<li><a onClick={this.Countrys.bind(this,Country)} >{Country}</a></li>)
    })
    const AreaCodearr = [];
    this.state.AreaCodes.forEach((AreaCode,index)=>{
      AreaCodearr.push(<li><a onClick={this.AreaCodes.bind(this,AreaCode)} >{AreaCode}</a></li>)
    })
    

    return (
      <div className="becomehost-1 container">

        { this.state.step === this.STEP.Step1_1 &&

            <div className="row Step1_1">
              <div className="col-md-12 col-lg-7 col-sm-12">
                  <div className="STEPhead">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>Step 1</p>
                  </div>
                  <h1>Hi,{this.state.user.user}!,Let's get started listing your space</h1>

                  <h2>What's kind of place do you have?</h2>

                  <div className="row">
                  <div className="col-md-6 form-group">
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.roomtype_category}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { Categoryarr }
                        </ul>
                      </div>
                  </div>


                  <div className="col-md-6 form-group">
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">for {this.state.roomtype_guests} guests<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { step1guestsarr } 
                        </ul>
                      </div>
                  </div>
                  </div>


                  <div className="form-group form-group1 col-md-6">
                    <div className="locatedBox">
                      <input type="text" placeholder="For example: Qingdao"  className={this.state.roomtype_location == '' ? 'form-control pinkBorder' : 'form-control'} onChange={(e) => this.setState({roomtype_location: e.target.value})} value={this.state.roomtype_location}/>
                    </div>
                  </div>

                  <div className="STEPBTN">
                      <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>Continue</button>
                  </div>
                  
                  <div className="stepfoot">
                      <img className="stepbg" src="../images/details_page-25_1.png" alt=""/>
                      <p>Listing for a month</p>
                      <h4>insert your advised earning : S$ <span>2018</span><b>/pps value:46700</b><img className="stepbg" src="../images/details_page-22.png" alt=""/></h4>

                      
                  </div>



              </div>


               <div className="col-md-12 col-lg-4 col-md-push-2 col-sm-12">
                  <img className="stepbg" src="../images/becomehost-step1_1.png" alt=""/>
                </div>
            
            
          </div>
        }

        {
          this.state.step === this.STEP.Step1_2 &&
          <div className="becomehost-2 container">
          <div className="row Step1_2">
            <div className="col-md-12 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>What kind of room do you listing?</h1>
              <h2>Is this listing a home,hotel,or something else? </h2>

              <div className="form-group">    
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.roomdescription_homeorhotel}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    { homeorhotelarr } 
                  </ul>
                </div>
              </div>
                
              <div className={this.state.roomdescription_homeorhotel == 'Please choose' ? 'hide':'show'}>  
              <h2>What type is it? </h2>
              <div className="form-group">    
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.roomdescription_type}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    { typearr } 
                  </ul>
                </div>
              </div>
              </div>

              <hr className={this.state.roomdescription_type == 'Please choose' ? 'show':'hide'}/>

              <div className={this.state.roomdescription_type == 'Please choose' ? 'hide':'show'}>
                  <h2>What guests will have? </h2>
                  <div className="form-group">    
                    
                    <div className="btn-group col-md-12">
                      <button type="button" data-toggle="dropdown">{this.state.roomdescription_guests_have}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        { guestshavearr } 
                      </ul>
                    </div>
                  </div>

                   <h2>Is this setup dedicated a guest space?</h2>

                   <div className="radio" onClick={(e) => this.setState({roomdescription_forguestorhost: 0})}>
                      <label className="text-muted"><p><span className={this.state.roomdescription_forguestorhost == 0 ?"show":"hide"}></span></p>Yes,it's primarily set up for guests</label>
                    </div>
                    <div className="radio" onClick={(e) => this.setState({roomdescription_forguestorhost: 1})}>
                      <label className="text-muted"><p><span className={this.state.roomdescription_forguestorhost == 1 ?"show":"hide"}></span></p>No,I keep my personal belongings here</label>
                    </div>
                    
                </div>
              
          
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4  col-sm-4 paddingNone rightbox">
                <div>
                  <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                  <h6>Entire place</h6>
                  <p>Guest have the whole place to themselves.This usually includes a bedroom,a bathroom,and a kitchen</p>
                  <h6>Private room</h6>
                  <p>Guest have their own private room for sleeping. Other areas could be shared.</p>
                  <h6>Shared room</h6>
                  <p>Guest sleep in a bedrooom or common area that could be shared with others.</p>
                </div>
             </div>
             </div>
             </div>

        }

         {
          this.state.step === this.STEP.Step1_3 &&
          <div className="becomehost-3 container">
          <div className="row Step1_3">
          <div className="col-md-7 col-lg-7 col-sm-7">
          <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>
              <h1>How many guests can your place accommodate?</h1>

                  <div className="col-md-12 form-group">
                      <label>Number of guests*</label>
                      <div className="btn-group col-md-4">
                        <button type="button" className="guestBtn">
                          <span className="btnjia" onClick={(e)=>this.guestsnumber(e)} data-name="jia">▲</span>
                          {this.state.roombasics_guestsnumber}
                          <span className="btnjian" onClick={(e)=>this.guestsnumber(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                   <div className="col-md-12 form-group">
                      <label>How many bedrooms can guests use?</label>
                      <div className="btn-group col-md-7">
                        <button type="button" className="guestBtn">
                          <span className="btnjia" onClick={(e)=>this.guestbeds(e)} data-name="jia">▲</span>
                          {this.state.roombasics_guestbeds}
                          <span className="btnjian" onClick={(e)=>this.guestbeds(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                  <div className="col-md-12 form-group">
                      <label>How many beds can guests have*</label>
                      <div className="btn-group col-md-4">
                        <button type="button" className="guestBtn">
                          <span className="btnjia" onClick={(e)=>this.totalguests(e)} data-name="jia">▲</span>
                          {this.state.roombasics_totalguests}
                          <span className="btnjian" onClick={(e)=>this.totalguests(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                  

                  <div className="col-md-12 form-group">
                    
                  
                  <h3 className="text-muted">Sleeping arrangments</h3>
                      <div className="step3box">
                        <div className="divLeft">
                         <h3 className="text-muted">Common space <b>{this.state.roombasics_commonspacebeds}</b> beds</h3>
                        </div>

                        <div className="divRight">
                         <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.addCommonSpaceBeds}>Add beds</button>
                        </div>
                      </div>

                 <div className="STEPBTN">
                    <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                    <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
                  </div>
                  </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
              <div>
                <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                <p>The number and type of beds you have determines how many guests can stay comfortably.</p>
                <p>Sleeping arrangements help guests understand what the sleeping arrangements are like.</p>
              </div>
          </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.Step1_4 &&
          <div className="becomehost-2 container">
          <div className="row Step1_4">
            <div className="col-md-8 col-lg-7 col-sm-8">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>Bathrooms</h1>
              <h2>Number of bathrooms</h2>
              <div className="btn-group col-md-5">
                <button type="button" className="guestBtn">
                  <span className="btnjia" onClick={(e)=>this.guestbedrooms(e)} data-name="jia">▲</span>
                  {this.state.roombasics_guestbedrooms}
                  <span className="btnjian" onClick={(e)=>this.guestbedrooms(e)} data-name="jian">▼</span>
                </button>
              </div>


             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>If you have a toilet separate from the shower,count it as a 0.5 bathroom.</p>
                </div>
             </div>
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step1_5 &&
          <div className="becomehost-2 container">
          <div className="row Step1_5">
            <div className="col-md-8 col-lg-7 col-sm-8">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>Where’s your place located?</h1>
              <div className="btn-group col-md-9 step5box">
                <img className="becomehost__info" src="./images/located.png" alt=""/>
                <input type="text" placeholder="For example: Qingdao"  className={this.state.roomtype_location == '' ? 'form-control pinkBorder' : 'form-control'} onChange={(e) => this.setState({roomtype_location: e.target.value})} value={this.state.roomtype_location}/>
              </div>
             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>Your exact address will only be shared with confirmed guests.</p>
                    <img className="img1 " src="./images/locatedimg.png" alt=""/>
                </div>
             </div>
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step1_6 &&
          <div className="becomehost-2 container">
          <div className="row Step1_6">
            <div className="col-md-8 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>Where’s your place located?</h1>
              
              <div className="Stepbox">
                <div className="col-md-10 col-lg-10 Step1_6box">
                  <h2>Country / Region</h2>
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.roomstuff_Country}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      { Countryarr } 
                    </ul>
                  </div>
                </div>

                <div className="col-md-10 col-lg-10 Step1_6box">
                  <h2>Street Address<span>e.g. Blk 35 Mandalay Road</span></h2>
                  <input onChange={(e) => this.setState({roomstuff_Street: e.target.value})} value={this.state.roomstuff_Street}  type="text" />
                </div>

                <div className="col-md-10 col-lg-10 Step1_6box">
                  <h2>Apt,Suite. (optional)<span>e.g. # 13–37 Mandalay Towers </span></h2>
                  <input onChange={(e) => this.setState({roomstuff_Apt: e.target.value})} value={this.state.roomstuff_Apt}   type="text" />
                </div>

                <div className="col-md-10 col-lg-10 Step1_6box">
                  <div className="col-md-5 col-lg-5 Step1_6box">
                    <h2>City<span>e.g. Singapore</span></h2>
                    <input  onChange={(e) => this.setState({roomstuff_City: e.target.value})} value={this.state.roomstuff_City}   type="text" />
                  </div>
                  <div className="col-md-push-2 col-md-5 col-lg-5 Step1_6box">
                    <h2>ZIP Code<span>e.g. 308215</span></h2>
                    <input  onChange={(e) => this.setState({roomstuff_ZIPCode: e.target.value})} value={this.state.roomstuff_ZIPCode}  type="text" />
                  </div>
                </div>
              </div>




            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>Your exact address will only be shared with confirmed guests.</p>
                    <img className="img1 " src="./images/locatedimg.png" alt=""/>
                </div>
             </div>
             </div>
             </div>

        }

          {
          this.state.step === this.STEP.Step1_7 &&
          <div className="becomehost-2 container">
          <div className="row Step1_7">
            <div className="col-md-8 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>Is the pin in the right place?</h1>
              <h2>If needed,you can drag the pin to adjust its location. Only confirmed guests will see this,so they know how to get to your place.</h2>
              <p>191A Rivervale Drive #11-1318,Singapore,541189,Singapore</p>
              
              <div className="Map">
                <img className="becomehost__info" src="./images/Map.jpg" alt=""/>
              </div>




            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
             </div>
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step1_8 &&
          <div className="becomehost-4 container">
          <div className="row Step1_8">
              <div className="col-md-7 col-lg-7 col-sm-7">
               <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <p>Step 1: Start with the basics</p>
              </div>

              <h1>What amenities do you offer?</h1>

             <div className="Stepbox">

                 <div onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                  <p className="Pinput" >
                    <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <div className="divinput">
                    <p>Essentials</p>
                    <p>Towels,bed sheets,soap,toilet paper,and pillows</p>
                  </div>
                </div>

                <div  onClick={(e) => {if(this.state.roomstuff_Shampoo ==0 )this.setState({roomstuff_Shampoo:1});else this.setState({roomstuff_Shampoo:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Shampoo ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Shampoo</p> 
                 
                </div>

                <div  onClick={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Closet_drwers ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Closet/drawers</p> 
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_TV ==0 )this.setState({roomstuff_TV:1});else this.setState({roomstuff_TV:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_TV ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">TV</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_Heat ==0 )this.setState({roomstuff_Heat:1});else this.setState({roomstuff_Heat:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_Heat ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Heat</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_aircondition ==0 )this.setState({roomstuff_aircondition:1});else this.setState({roomstuff_aircondition:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_aircondition ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Air conditioning</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_breakfastcoffetea ==0 )this.setState({roomstuff_breakfastcoffetea:1});else this.setState({roomstuff_breakfastcoffetea:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_breakfastcoffetea ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Breakfast,coffe,tea</p>
                  
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_desk_workspace ==0 )this.setState({roomstuff_desk_workspace:1});else this.setState({roomstuff_desk_workspace:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_desk_workspace ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Desk/workspace</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_fireplace ==0 )this.setState({roomstuff_fireplace:1});else this.setState({roomstuff_fireplace:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_fireplace ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Fireplace</p>
                  </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_iron ==0 )this.setState({roomstuff_iron:1});else this.setState({roomstuff_iron:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_iron ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Iron</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_hairdryer ==0 )this.setState({roomstuff_hairdryer:1});else this.setState({roomstuff_hairdryer:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_hairdryer ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Hair dryer</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_petsinhouse ==0 )this.setState({roomstuff_petsinhouse:1});else this.setState({roomstuff_petsinhouse:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_petsinhouse ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Pets in the house</p>
                </div>
                  <div onClick={(e) => {if(this.state.roomstuff_private_entrance ==0 )this.setState({roomstuff_private_entrance:1});else this.setState({roomstuff_private_entrance:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_private_entrance ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Private entrance</p>
                </div>

                <h1>Safety amenities</h1>
                 <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0,roomstuff_smartpincode_password:'',roomstuff_smartpincode_confirmpassword :''});}}>
                      <img className={this.state.roomstuff_smartpincode ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput"  onClick={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0,roomstuff_smartpincode_password:'',roomstuff_smartpincode_confirmpassword :''});}}>Smart pin code</p>
                  <div className="control-group">
                  <label className="control-label">Insert your password</label>
                  <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_password: e.target.value})} value={this.state.roomstuff_smartpincode == 1 ? this.state.roomstuff_smartpincode_password : ''} />
                  <span className={this.state.PasswordActibve == 0 ? 'glyphicon glyphicon-remove-sign' : ''}></span>   
                  </div>

                  <div className="control-group control-group1">
                   <label className="control-label">ConFirm your password</label>
                   <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_confirmpassword: e.target.value})} value={this.state.roomstuff_smartpincode == 1 ? this.state.roomstuff_smartpincode_confirmpassword : ''} />
                    <span className={this.state.PasswordActibve == 0 ? 'glyphicon glyphicon-remove-sign' : ''}></span>  
                 </div>
                </div>

                <div className="detector"  onClick={(e) => {if(this.state.roomstuff_smoke_detector ==0 )this.setState({roomstuff_smoke_detector:1});else this.setState({roomstuff_smoke_detector:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_smoke_detector ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Smoke detector</p>
                </div>
          </div>

              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
              </div>
              <div className="col-md-4 col-lg-4  col-sm-4 paddingNone rightbox">
                  <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>Provide the essentials helps guests feel at home in your place.</p>
                    <p>Some hosts provide breakfast,or just coffee and tea. None of there things arerequired,but sometimes they add a nice touch to help guests feel welcome.</p>
                  </div>
               </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.Step1_9 &&
          <div className="becomehost-4 container">
          <div className="row Step1_8">
              <div className="col-md-7 col-lg-7 col-sm-7 ">
               <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <p>Step 1: Start with the basics</p>
              </div>

              <h1>What spaces can guests use?</h1>

             <div className="Stepbox">

                  <div  onClick={(e) => {if(this.state.roomstuff_Pool ==0 )this.setState({roomstuff_Pool:1});else this.setState({roomstuff_Pool:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Pool ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Pool</p> 
                </div>

                <div onClick={(e) => {if(this.state.roomstuff_kitchen ==0 )this.setState({roomstuff_kitchen:1});else this.setState({roomstuff_kitchen:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_kitchen ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">kitchen</p> 
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_washer ==0 )this.setState({roomstuff_washer:1});else this.setState({roomstuff_washer:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_washer ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Laundry - washer</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_dryer ==0 )this.setState({roomstuff_dryer:1});else this.setState({roomstuff_dryer:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_dryer ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Laundry - dryer</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_Park ==0 )this.setState({roomstuff_Park:1});else this.setState({roomstuff_Park:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Park ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Park</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_Lift ==0 )this.setState({roomstuff_Lift:1});else this.setState({roomstuff_Lift:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Lift ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Lift</p>
                  
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_HotTub ==0 )this.setState({roomstuff_HotTub:1});else this.setState({roomstuff_HotTub:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_HotTub ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Hot tub</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_Gym ==0 )this.setState({roomstuff_Gym:1});else this.setState({roomstuff_Gym:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Gym ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Gym</p>
                  </div>

            </div>

              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
              </div>

              <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>Spaces should be on the property. Don’t include laundromats or nearby places that aren’t part of your property. If it’s OK with your neighbours,you can include a pool,hot tub,or other shared space.</p>
                </div>
             </div>
          </div>
          </div>
        }
          
         {
          this.state.step === this.STEP.Step1_10 &&

          <div className="becomehost-5 container">
          <div className="row Step1_10">
          <div className="col-md-6 col-lg-7 col-sm-6">
          <h1>Great process {this.state.user.user}!</h1>
          <h3>Now let's get some details about your place so you can publish your listings </h3>
          <div className="change">
              <div>
                <p>Bedrooms,beds,amenities,and more</p>
                <p className="textpink" onClick={(e) => this.setState({step:1.1})}>change</p>
              </div>
              <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
          </div>

          <div className="Step2box">
            <p className="Step2">Step 2</p>
            <h2>Set the sence</h2>
            <p className="Set">photos,short description,title</p>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.nextStep}>Continue</button>
          </div>

          <div className="Step2box">
            <p className="Step3">Step 3</p>
            <h2>Get ready for guests </h2>
            <p className="Set1">Booking settings,calendar,price</p>
          </div>

          <div className="Stepbox1">
            <h2>The 3rd Party service provided by host </h2>

            <div className="service">
              <div>
                  <h5><p>Home Rapair<span>▲</span></p></h5>
                  <h5><p>Marketing & Brand<span>▼</span></p></h5>
                  <h5><p>Photoshooting<span>▲</span></p></h5>
                  <h5><p>Interior Design<span>▼</span></p></h5>
                  <h5><p>Cleaning & Washing<span>▲</span></p></h5>
              </div>
            </div>

          </div>

          <div className="Rapair" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>
              <img  src="../images/footer_icon-19.png" alt=""/>
              <span className="left">We recommend: </span>
              <span className="right">Home Rapair</span>
          </div>      

          <div  className={this.state.Rapair != 0 ? 'show Shop' : 'hide Shop'}>
              <div className={this.state.Rapair == 1 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div className={this.state.Rapair == 2 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div  className={this.state.Rapair == 3 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>

              <ul className="lilist">
                  <li className={this.state.Rapair == 1 ? 'bjpink' : ''}  onClick={(e) => this.setState({Rapair:1})}></li>
                  <li className={this.state.Rapair == 2 ? 'bjpink' : ''}  onClick={(e) => this.setState({Rapair:2})}></li>
                  <li className={this.state.Rapair == 3 ? 'bjpink' : ''}  onClick={(e) => this.setState({Rapair:3})}></li>
              </ul>
          </div>


          </div>
          <div className="col-md-6 col-lg-4 col-md-push-1 col-sm-6 paddingNone">
              <img className="stepbg" src="../images/1.png" alt=""/>
          </div>
          </div>
          </div>



        }
        
        {
          this.state.step === this.STEP.Step2_1 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 Step2_1">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>Step 2: Set the scene</p>
            </div>

               <h1>Show travellers what your space looks like
                <img src="../images/photoi.png" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}/>
              </h1>

              <div  className={this.state.Rapair == 0 ? 'show rightbox' : 'hide rightbox'}>
                  <span onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>×</span>
                  <ul>
                      <img src="../images/step2_2.png" />
                      <li>Many hosts have at least 8 photos. You can start with just one photo and come back later to add more. Including photos of all the spaces a guest can use helps guests imagine staying at your place.</li>
                      <img src="../images/step2_1.png" />
                      <li>Make sure the room is well-lit. Or take photos during daylight hours.</li>
                      <li>Sometimes shooting from a corner (instead of straight-on) gives you a better shot.</li>
                  </ul>
              </div>
              
              <div className="photos" onChange={(e) => this.setState({step:2.2})}>
                 <div className="photosipt">
                    <img src="../images/addphoto.png" alt=""/>
                    <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={this.fileChangedHandler}/>
                 </div>
              </div>

             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step2_2 &&
          <div className="becomehost-2 container">
          <div className="row Step2_2">
            <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>Step 2: Set the scene</p>
            </div>

              <h1>Show travellers what your space looks like
                <img src="../images/photoi.png" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}/>
              </h1>

              <div  className={this.state.Rapair == 0 ? 'show rightbox' : 'hide rightbox'}>
                  <span onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>×</span>
                  <ul>
                      <img src="../images/step2_2.png" />
                      <li>Many hosts have at least 8 photos. You can start with just one photo and come back later to add more. Including photos of all the spaces a guest can use helps guests imagine staying at your place.</li>
                      <img src="../images/step2_1.png" />
                      <li>Make sure the room is well-lit. Or take photos during daylight hours.</li>
                      <li>Sometimes shooting from a corner (instead of straight-on) gives you a better shot.</li>
                  </ul>
              </div>
              
              <div className="photos">
                  {this.state.selectedPictures.map((file,index) => (
                    <div className="photosimg">
                      <img className="img-thumbnail" data-toggle="modal" data-target="#myModal" onClick={this.modalPictures.bind(this,index)} src={file.imagePreviewUrl} />
                      <span  className="glyphicon glyphicon-trash" onClick={this.deletePictures.bind(this,index)} ></span>
                    </div>
                    ))
                   }
                 <div className="photosipt">
                    <img src="../images/addphoto1.png" />
                    <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={(e)=>this.fileChangedHandler(e)}/>
                 </div>
              </div>

              <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <div className="modal-body">
                      <img  style={this.CSS.style1} src='./images/detail-carousel.jpg' />
                    </div>
                    <div className="modal-footer">
                      <ul className={this.state.modalset == 0 ? "Set modalshow" : "Set hide"}>
                          <li onClick={(e) => this.setState({modalset:1})}><img src="../images/crop.png" />Crop</li>
                          <li onClick={(e) => this.setState({modalset:2})}><img src="../images/Brightness.png" />Adjust Brightness</li>
                          <li onClick={(e) => this.RotatePictures(e)}><img src="../images/Rotate.png" />Rotate</li>
                      </ul>
                      <ul className={this.state.modalset != 0 ? "Brightness show" : "Brightness hide"}>
                          <li  className={this.state.modalset == 1 ? "show" : "hide"}>
                              <p>Zoom</p>
                              <input type="range" onChange={(e)=>this.rangePictures(e.target.value)} name="points"  step="0.02" min="1" max="3" value={this.state.range} />
                          </li>
                          <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                              <p>Brightness</p>
                              <input type="range" name="points" step="0.02" min="1" max="3" />
                          </li>
                          <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                              <p>Contrast Ratio</p>
                              <input type="range" name="points" step="0.02" min="1" max="3" />
                          </li>
                      </ul>
                      <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Cancel show" : "btn Cancel hide"} type="button">Cancel</button>
                      <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Complete show" : "btn Complete hide"} type="button" >Complete</button>
                      <button  className={this.state.modalset == 0 ? "btn Replace show" : "btn Replace hide"} type="button" >Save and Replace</button>
                    </div>
                  </div>
                </div>
              <div className="modal-backdrop fade in"></div>
              </div>

             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             </div>
             </div>

        }
         
         {
          this.state.step === this.STEP.Step2_3 &&
          <div className="becomehost-2 container">
          <div className="row Step2_3">
            <div className="col-md-8 col-lg-8 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <p>Step 2: Set the scene</p>
              </div>

              <h2>Edit your description</h2>
              <h4>Summary</h4>
              <textarea onChange={(e) => this.setState({roomdescription_description: e.target.value})} placeholder="Describe the decor,light,what’s nearby,etc...">{this.state.roomdescription_description}</textarea>

              <h4>My place is great for</h4>

              <div className="box">  
                <div onClick={(e) => {if(this.state.roomstuff_withKids ==0 )this.setState({roomstuff_withKids:1});else this.setState({roomstuff_withKids:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_withKids ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Family (with kids)</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_BigGroups ==0 )this.setState({roomstuff_BigGroups:1});else this.setState({roomstuff_BigGroups:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_BigGroups ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Big groups</p>
                  
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_pets ==0 )this.setState({roomstuff_pets:1});else this.setState({roomstuff_pets:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_pets ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Furry friends (pets)</p>
                </div>
            </div>
              
              <h4 className={this.state.scene == 1 ? 'show cursor' : 'hide'}  onClick={(e) => this.setState({scene:0})}>Add more (optional)</h4>
              <p className={this.state.scene == 1 ? 'show cursor' : 'hide'}  onClick={(e) => this.setState({scene:0})}>only 30% of hosts add more info here</p>

            <div className={this.state.scene == 0 ? 'show' : 'hide'}>
              <h4>About your place (optional)</h4>
              <textarea onChange={(e) => this.setState({roomdescription_Aboutyour: e.target.value})}>{this.state.roomdescription_Aboutyour}</textarea>


              <h4>What guests can access (optional)</h4>
              <textarea onChange={(e) => this.setState({roomdescription_guestscan: e.target.value})}>{this.state.roomdescription_guestscan}</textarea>


              <h4>Your interaction with guests (optional)</h4>
              <textarea onChange={(e) => this.setState({roomdescription_interaction: e.target.value})}>{this.state.roomdescription_interaction}</textarea>

              <h4>Other things to note (optional)</h4>
              <textarea onChange={(e) => this.setState({roomdescription_Otherthings: e.target.value})}>{this.state.roomdescription_Otherthings}</textarea>

              <h2>The neighbourhood</h2>
              

              <h4>About the neighbourhood (optional)</h4>
              <textarea onChange={(e) => this.setState({roomdescription_neighbourhood: e.target.value})}>{this.state.roomdescription_neighbourhood}</textarea>

              <h4>How to get around (optional)</h4>
              <textarea onChange={(e) => this.setState({roomdescription_around: e.target.value})}>{this.state.roomdescription_around}</textarea>
            </div>
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>Your summary description is meant to be a brief overview of your place that guests read before they get into the details.</p>
                    <p>You can also use your description to remind guests that people from all backgrounds are welcome in your home.</p>
                </div>
             </div>
    

             
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step2_4 &&
          <div className="becomehost-2 container">
          <div className="row Step2_4">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <p>Step 2: Set the scene</p>
              </div>

              <h1>Name your place</h1>
              <div className="box">
                <span className={this.state.roomdescription_title.length > 50 ? "textpink" : ""}>{50-this.state.roomdescription_title.length}</span>
                <input placeholder="Listing title" onChange={(e) => this.setState({roomdescription_title: e.target.value})} value={this.state.roomdescription_title}  type="text" />
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>Singapore Home with a View</p>
                </div>
             </div>
    

             
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step2_5 &&
          <div className="becomehost-2 container">
          <div className="row Step2_5">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <p>Step 2: Set the scene</p>
              </div>

              <h1>Add your mobile number</h1>


              <div className="box col-md-10">
                <div className="phoneimg"><img className="becomehost__info" src="./images/phoneimg.png" alt=""/></div>

                <div className="btn-group col-md-12 phonecode">
                  <span data-toggle="dropdown">+{this.state.roomstuff_AreaCode}</span>
                  <ul className="dropdown-menu" role="menu">
                    { AreaCodearr } 
                  </ul>
                </div>
                
                <input onChange={(e) => this.setState({roomdescription_phone: e.target.value})} value={this.state.roomdescription_phone}  type="text" />

                <img className={this.state.roomdescription_phone.length == '11' ? "show" : "hide"} src="./images/landloard_page-30.png" alt=""/>
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>Only confirmed guests get your phone number. This helps guests contact you quickly if needed. </p>
                </div>
             </div>
    

             
             </div>
             </div>

        }


        {
          this.state.step === this.STEP.Step2_6 &&

          <div className="becomehost-5 container">
          <div className="row Step1_10">
          <div className="col-md-6 col-lg-7 col-sm-6">
          <h1>Great process {this.state.user.user}!</h1>
          <h3>Now let's get some details about your place so you can publish your listings </h3>
          <div className="change">
              <div>
                <p>Bedrooms,beds,amenities,and more</p>
                <p className="textpink" onClick={(e) => this.setState({step:1.1})}>change</p>
              </div>
              <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
          </div>

          <div className="change">
              <div>
                <p>Photos, short description, title</p>
                <p className="textpink" onClick={(e) => this.setState({step:2.1})}>change</p>
              </div>
              <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
          </div>

          <div className="Step2box">
            <p className="Step2">Step 3</p>
            <h2>Get ready for guests</h2>
            <p className="Set">Booking settings, calendar, price</p>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.submit}>Continue</button>
          </div>


          <div className="Stepbox1">
            <h2>The 3rd Party service provided by host </h2>

            <div className="service">
              <div>
                  <h5><p>Home Rapair<span>▲</span></p></h5>
                  <h5><p>Marketing & Brand<span>▼</span></p></h5>
                  <h5><p>Photoshooting<span>▲</span></p></h5>
                  <h5><p>Interior Design<span>▼</span></p></h5>
                  <h5><p>Cleaning & Washing<span>▲</span></p></h5>
              </div>
            </div>

          </div>

          <div className="Rapair" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>
              <img  src="../images/footer_icon-19.png" alt=""/>
              <span className="left">We recommend: </span>
              <span className="right">Home Rapair</span>
          </div>      

          <div  className={this.state.Rapair != 0 ? 'show Shop' : 'hide Shop'}>
              <div className={this.state.Rapair == 1 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop1</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div className={this.state.Rapair == 2 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop2</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div  className={this.state.Rapair == 3 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">Shop3</span>
                          <span className="right">Home - Fix</span>  
                      </div>
                      <ul>
                          <li><span>Address: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>Contact No:</span>  +65 84736394</li>
                          <li><span>Email Address : </span> HFC@homefix.com</li>
                          <li><span>Reference :</span> "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>

              <ul className="lilist">
                  <li className={this.state.Rapair == 1 ? 'bjpink' : ''}  onClick={(e) => this.setState({Rapair:1})}></li>
                  <li className={this.state.Rapair == 2 ? 'bjpink' : ''}  onClick={(e) => this.setState({Rapair:2})}></li>
                  <li className={this.state.Rapair == 3 ? 'bjpink' : ''}  onClick={(e) => this.setState({Rapair:3})}></li>
              </ul>
          </div>


          </div>
          <div className="col-md-6 col-lg-4 col-md-push-1 col-sm-6 paddingNone">
              <img className="stepbg" src="../images/1.png" alt=""/>
          </div>
          </div>
          </div>



        }



        {
          this.state.step === this.STEP.SUCCESS &&

          <div className="becomehost-8 container">
          <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 Step-8">
            <h1>Submission of success</h1>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.preStep}>Back</button>
          </div>
          </div>
          </div>





        }





      </div>
    )
  }
}

export default ListingCreate
