import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import houselistingService from '../services/houseinfolist-service';
import ListingDetail from './listing-detail';
import Overlay from './overlay';
import Modal from 'react-modal';
import hostService from '../services/host-service';
import { DateRangePicker } from 'react-dates';
import AvatarEditor from 'react-avatar-editor';
import {reactLocalStorage} from 'reactjs-localstorage';
import guestService from '../services/guest-service';
import Housestep1 from './house-step1';
import languageService from '../services/language-service';


const customStyles = {
  content : {
    top                   : '20%',
    left                  : '35%',
    right                 : '35%',
    bottom                : '20%'
  }
};


class ListingCreate extends Component {

    constructor(props) {
        super(props)

        this.STEP = {
            Step1_1: 1,
            Step1_2: 2,
            Step1_3: 3,
            Step1_4: 4,
            Step1_5: 5,
            Step1_6: 6,
            Step1_7: 7,
            Step1_8: 8,
            Step1_9: 9,
            Step1_10:10,
            Step2_1: 11,
            Step2_2: 12,
            Step2_3: 13,
            Step2_4: 14,
            Step2_5: 15,
            Step2_6: 16,
            Step3_1: 17,
            Step3_2: 18,
            Step3_3: 19,
            Step3_4: 20,
            Step3_5: 21,
            Step3_6: 22,
            Step3_7: 23,
            Step3_8: 24,
            Step3_9: 25,
            Step3_10: 26,
            Step3_11: 27,
            Step3_12: 28,
            Step3_13: 29,
            Step3_14: 30,
            Step3_15: 31,
            Step3_16: 32,
            Step3_17: 33,
            Step3_18: 34,
            Step3_19: 35,
            Step3_20: 36,
            Step3_21: 37,
            PROCESSING:404,
            SUCCESS:200,

        }

        this.ROOM_DESCRIPTION = {
            SETUP_FOR_GUESTS:0,
            SETUP_FOR_HOST_BELONGINGS:1

        }
        

        this.state = {
            step: 1,
            roomtype_category:"",
            roomtype_guests:1,
            roomtype_location:"",
            roomdescription_homeorhotel:"",
            roomdescription_type:"",
            roomdescription_guests_have:"",
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
            roomstuff_submittedPopulStay:"",
            roomdescription_Confirmtime:"",
            roomdescription_manyguests:"",
            roomdescription_Message:"",
            roomdescription_Rules:"",
            roomdescription_information:"",
            roomdescription_Confirmedphone:"",
            roomdescription_Email:"",
            roomstuff_Recommended:"",
            rules_parties:1,
            rules_Smoking:1,
            rules_pets:1,
            rules_infants:1,
            rules_children:1,
            climb_stairs:0,
            property_animals:0,
            property_Weapons:0,
            property_recording:0,
            Amenity_limitations:0,
            shared_spaces:0,
            property_parking:0,
            property_Pet:0,
            Potential_noise:0,
            Payment_information:0,
            guest_message:0,
            last_time:0,
            governmentissued_ID:0,
            Not_safe:0,
            anytime_Checkin:0,
            NO_shoes:0,
            roomstuff_AreaCode:86,
            selectedPictures:[],
            firstPictures:"",
            Currency:"PPS",
            price_perday:0,
            ETHprice_perday:0,
            USDprice_perday:0,
            maxprice_perday:0,
            minprice_perday:0,
            Explainwhy:"",
            question_rented:"Please choose",
            Howoften_guests:"Please choose",
            notice_arrives:"Please choose",
            Howoften_From:"select a time",
            Howoften_To:"select a time",
            advance_book:"Non reservations",
            Price_demand:0,
            Price_fixed:0,
            first_guests_20:0,
            Welcome_guests:0,
            confirmation_booking:0,
            requirements_book:0,
            starting_host:0,
            uncomfortable_controls:0,
            listing_lower:0,
            hours_respond:0,
            discount_Weekly:0,
            discount_Monthly:0,
            user:'Loading...',
            Categorys:[],
            step1guests:[],
            Check_in_time:["flexible","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00(morrow)"],
            homeorhotels:['apartment','Single house','Subsidiary unit','Characteristic house','Breakfast and Breakfast','The Inn Boutique and other types'],
            homeotypes:[
                ["Apartment type residence","A common apartment","Cuban family hotel","Loft","Hotel style apartment"],
                ['A complete set of single house','Bungalow','Log cabin','Cuban family hotel','Holiday wooden house','Village hut','Greeks','Italy Damm','cupola','Primary residence acupoint','Agritainment','A ship’s house','Thatched cottage','Lighthouse','South Korean boarding house','Anglo French shepherd’s hut','Miniature house','Villas','Italy Truro rock top round house','Villa'],
                ['Guest Room','Guest suite','Agritainment'],
                ['The Barn','ship','Bus','Camping car / RV','Camping area','Castle','Cave','cupola','Primary residence acupoint','Agritainment','A ship’s house','Thatched cottage','Ice house','Islands','Lighthouse','South Korean boarding house','aircraft','Anglo French shepherd’s hut','Tent','Miniature house','tepee','Train','Tree House','Windmill house','Mongolian Yurts'],
                ['Breakfast and Breakfast','Cuban family hotel','Agritainment','Taiwan Lodge','Natural Hostel','ryokan'],
                ['The Inn Boutique','The Residence Hotel','India antiquities Hotel','Hostel','Hotel','Natural Hostel','Resort','Hotel style apartment']
            ],
            types:['Single room','double room','family suite','business suite'],
            guestshaves:['Entire place'],
            Countrys:[],
            Months:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
            advance_books:["Anytime","3 months","6 months","9 months","A year","Non reservations"],
            PasswordActibve:1,
            Step3_13Actibve:1,
            AreaCodes:[86,81,82,83],
            Rapair:1,
            scene:1,
            modalset:0,
            modalimg:'',
            rotate:0,
            range:1,
            AdditionalRules:[],
            RulesIpt:"",
            modalIsOpen:false,
            guests_check:false,
            phoneactive:0,
            guests_know:0,
            Date_year: 0,
            Date_month: 0,
            Date_day: 0,
            Date_week: 0,
            Date_Months:"",
            Date_List:[],
            canvasW:0,
            canvasH:0,
            canvasRotate:0,
            canvasScale:1,
            editor:0,
            photosindex:0,
            modalsubmit:false,
            PicturesSize:"",
            National_name:["0244","93","335","213","376","1254","1268","54","374","247","61","43","994","1242","973","880","1246","375","32","501","229","1441","591","267","55","673","359","226","95","257","237","1","1345","236","235","56","86","57","242","682","506","53","357","420","45","253","1890","593","20","503","372","251","679","358","33","594","689","241","220","995","49","233","350","30","1809","1671","502","224","592","509","504","852","36","354","91","62","98","964","353","972","39","225","1876","81","962","855","327","254","82","965","331","856","371","961","266","231","218","423","370","352","853","261","265","60","960","223","356","1670","596","230","52","373","377","976","1664","212","258","264","674","977","599","31","64","505","227","234","850","47","968","92","507","675","595","51","63","48","351","1787","974","262","40","7","1758","1784","684","685","378","239","966","221","248","232","65","421","386","677","252","27","34","94","1758","1784","249","597","268","46","41","963","886","992","255","66","228","676","1809","216","90","993","256","380","971","44","1","598","233","58","84","967","381","263","243","260"],
            Howoften_Froms:["flexible","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00(morrow)"],
            Howoften_Tos:["flexible","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00(morrow)"],
            languagelist:{},
            generate_smart_contract:0


        }
        this.DETA={
            current_year : 1,
            current_month : 1,
            current_day :1,
            select_year : 1,
            select_month : 1,
            select_day : 1,
            history_year : 1,
            history_month : 1,
            history_day : 1,
        }

        this.nextStep = this.nextStep.bind(this);
        this.preStep  = this.preStep.bind(this)
        this.addCommonSpaceBeds = this.addCommonSpaceBeds.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.deletePictures = this.deletePictures.bind(this);
        this.submit = this.submit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteRules = this.deleteRules.bind(this);

        languageService.language();
    }

    componentWillMount() {

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
            Categorys:this.state.languagelist.Categorys,
            Categorys:[this.state.languagelist.Whole_house,this.state.languagelist.Private_Room,this.state.languagelist.Share_Room],
            state:this.state.roomtype_location=this.state.languagelist.TOKYO,
            state:this.state.roomdescription_homeorhotel=this.state.languagelist.Please_choose,
            state:this.state.roomdescription_type=this.state.languagelist.Please_choose,
            state:this.state.roomdescription_guests_have=this.state.languagelist.Please_choose,
            homeorhotels:this.state.languagelist.homeorhotels,
            types:this.state.languagelist.types,
            guestshaves:this.state.languagelist.Categorys,
            state:this.state.roomstuff_Country=this.state.languagelist.roomstuff_Country,
            Countrys:this.state.languagelist.Countrys
        });


        var listStorage =  JSON.parse(sessionStorage.getItem('test'));
        if(listStorage){
            this.setState({
                'step':listStorage.step,
                'roomtype_category': listStorage.roomtype_category,
                'roomtype_guests': listStorage.roomtype_guests,
                'roomtype_location': listStorage.roomtype_location,
                'roomdescription_homeorhotel': listStorage.roomdescription_homeorhotel,
                'roomdescription_type': listStorage.roomdescription_type,
                'roomdescription_guests_have': listStorage.roomdescription_guests_have,
                'roomdescription_forguestorhost': listStorage.roomdescription_forguestorhost,
                'roomdescription_title': listStorage.roomdescription_title,
                'roomdescription_phone': listStorage.roomdescription_phone,
                'roomdescription_description': listStorage.roomdescription_description,
                'roombasics_guestsnumber': listStorage.roombasics_guestsnumber,
                'roombasics_guestbedrooms': listStorage.roombasics_guestbedrooms,
                'roombasics_guestbeds': listStorage.roombasics_guestbeds,
                'roombasics_totalguests': listStorage.roombasics_totalguests,
                'roombasics_commonspacebeds': listStorage.roombasics_commonspacebeds,
                'roomstuff_Essentials': listStorage.roomstuff_Essentials,
                'roomstuff_Shampoo': listStorage.roomstuff_Shampoo,
                'roomstuff_Closet_drwers': listStorage.roomstuff_Closet_drwers,
                'roomstuff_TV': listStorage.roomstuff_TV,
                'roomstuff_Pool': listStorage.roomstuff_Pool,
                'roomstuff_kitchen': listStorage.roomstuff_kitchen,
                'roomstuff_washer': listStorage.roomstuff_washer,
                'roomstuff_dryer':listStorage.roomstuff_dryer,
                'roomstuff_Park':listStorage.roomstuff_Park,
                'roomstuff_Lift':listStorage.roomstuff_Lift,
                'roomstuff_HotTub':listStorage.roomstuff_HotTub,
                'roomstuff_Gym':listStorage.roomstuff_Gym,
                'roomstuff_Heat':listStorage.roomstuff_Heat,
                'roomstuff_aircondition':listStorage.roomstuff_aircondition,
                'roomstuff_breakfastcoffetea':listStorage.roomstuff_breakfastcoffetea,
                'roomstuff_desk_workspace':listStorage.roomstuff_desk_workspace,
                'roomstuff_fireplace':listStorage.roomstuff_fireplace,
                'roomstuff_iron':listStorage.roomstuff_iron,
                'roomstuff_withKids':listStorage.roomstuff_withKids,
                'roomstuff_BigGroups':listStorage.roomstuff_BigGroups,
                'roomstuff_pets':listStorage.roomstuff_pets,
                'roomstuff_hairdryer':listStorage.roomstuff_hairdryer,
                'roomstuff_petsinhouse':listStorage.roomstuff_petsinhouse,
                'roomstuff_private_entrance':listStorage.roomstuff_private_entrance,
                'roomstuff_smartpincode':listStorage.roomstuff_smartpincode,
                'roomstuff_smartpincode_password':listStorage.roomstuff_smartpincode_password,
                'roomstuff_smartpincode_confirmpassword':listStorage.roomstuff_smartpincode_confirmpassword,
                'roomstuff_smoke_detector':listStorage.roomstuff_smoke_detector,
                'roomstuff_Country':listStorage.roomstuff_Country,
                'roomstuff_Street':listStorage.roomstuff_Street,
                'roomstuff_Apt':listStorage.roomstuff_Apt,
                'roomstuff_City':listStorage.roomstuff_City,
                'roomstuff_ZIPCode' :listStorage.roomstuff_ZIPCode,
                'roomdescription_Aboutyour':listStorage.roomdescription_Aboutyour,
                'roomdescription_guestscan':listStorage.roomdescription_guestscan,
                'roomdescription_interaction':listStorage.roomdescription_interaction,
                'roomdescription_Otherthings':listStorage.roomdescription_Otherthings,
                'roomdescription_neighbourhood':listStorage.roomdescription_neighbourhood,
                'roomdescription_around':listStorage.roomdescription_around,
                'roomstuff_submittedPopulStay':listStorage.roomstuff_submittedPopulStay,
                'roomdescription_Confirmtime':listStorage.roomdescription_Confirmtime,
                'roomdescription_manyguests':listStorage.roomdescription_manyguests,
                'roomdescription_Message':listStorage.roomdescription_Message,
                'roomdescription_Rules':listStorage.roomdescription_Rules,
                'roomdescription_information':listStorage.roomdescription_information,
                'roomdescription_Confirmedphone':listStorage.roomdescription_Confirmedphone,
                'roomdescription_Email':listStorage.roomdescription_Email,
                'roomstuff_Recommended':listStorage.roomstuff_Recommended,
                'rules_parties':listStorage.rules_parties,
                'rules_Smoking':listStorage.rules_Smoking,
                'rules_pets':listStorage.rules_pets,
                'rules_infants':listStorage.rules_infants,
                'rules_children':listStorage.rules_children,
                'climb_stairs':listStorage.climb_stairs,
                'property_animals':listStorage.property_animals,
                'property_Weapons':listStorage.property_Weapons,
                'property_recording':listStorage.property_recording,
                'Amenity_limitations':listStorage.Amenity_limitations,
                'shared_spaces':listStorage.shared_spaces,
                'property_parking':listStorage.property_parking,
                'property_Pet':listStorage.property_Pet,
                'Potential_noise':listStorage.Potential_noise,
                'Payment_information':listStorage.Payment_information,
                'guest_message':listStorage.guest_message,
                'last_time':listStorage.last_time,
                'governmentissued_ID':listStorage.governmentissued_ID,
                'Not_safe':listStorage.Not_safe,
                'anytime_Checkin':listStorage.anytime_Checkin,
                'NO_shoes':listStorage.NO_shoes,
                'roomstuff_AreaCode':listStorage.roomstuff_AreaCode,
                'selectedPictures':listStorage.selectedPictures,
                'firstPictures':listStorage.firstPictures,
                'Currency':listStorage.Currency,
                'price_perday':listStorage.price_perday,
                'ETHprice_perday':listStorage.ETHprice_perday,
                'USDprice_perday':listStorage.USDprice_perday,
                'maxprice_perday':listStorage.maxprice_perday,
                'minprice_perday':listStorage.minprice_perday,
                'Explainwhy':listStorage.Explainwhy,
                'question_rented':listStorage.question_rented,
                'Howoften_guests':listStorage.Howoften_guests,
                'notice_arrives':listStorage.notice_arrives,
                'Howoften_From':listStorage.Howoften_From,
                'Howoften_To':listStorage.Howoften_To,
                'advance_book':listStorage.advance_book,
                'Price_demand':listStorage.Price_demand,
                'Price_fixed':listStorage.Price_fixed,
                'first_guests_20':listStorage.first_guests_20,
                'Welcome_guests':listStorage.Welcome_guests,
                'confirmation_booking':listStorage.confirmation_booking,
                'requirements_book':listStorage.requirements_book,
                'starting_host':listStorage.starting_host,
                'uncomfortable_controls':listStorage.uncomfortable_controls,
                'listing_lower':listStorage.listing_lower,
                'hours_respond':listStorage.hours_respond,
                'discount_Weekly':listStorage.discount_Weekly,
                'discount_Monthly':listStorage.discount_Monthly,
                'PasswordActibve':listStorage.PasswordActibve,
                'Step3_13Actibve':listStorage.Step3_13Actibve,
                'Rapair':listStorage.Rapair,
                'scene':listStorage.scene,
                'modalset':listStorage.modalset,
                'modalimg':listStorage.modalimg,
                'rotate':listStorage.rotate,
                'range':listStorage.range,
                'AdditionalRules':listStorage.AdditionalRules,
                'RulesIpt':listStorage.RulesIpt,
                'modalIsOpen':listStorage.modalIsOpen,
                'guests_check':listStorage.guests_check,
                'phoneactive':listStorage.phoneactive,
                'guests_know':listStorage.guests_know,
                'Date_year': listStorage.Date_year,
                'Date_month':  listStorage.Date_month,
                'Date_day':  listStorage.Date_day,
                'Date_week':  listStorage.Date_week,
                'Date_Months': listStorage.Date_Months,
                'Date_List': listStorage.Date_List,
                'canvasW': listStorage.canvasW,
                'canvasH':listStorage.canvasH,
                'canvasRotate':listStorage.canvasRotate,
                'canvasScale':listStorage.canvasScale,
                'editor':listStorage.editor,
                'photosindex':listStorage.photosindex,
                'modalsubmit':listStorage.modalsubmit,
                'PicturesSize':listStorage.PicturesSize
            })
        }
    }

    house_step1 = (obj1,obj2,obj3,obj4) =>{
        this.setState({
            step: obj1,
            roomtype_category:obj2,
            roomtype_guests:obj3,
            roomtype_location:obj4,
        });
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    submit(){
      this.setState({modalsubmit:true});
         houselistingService.submitListing(this.state)
          .then((tx) => {
            console.log(this.state)
              this.setState({
                  step: this.STEP.PROCESSING
              });
              console.log(tx)
              return houselistingService.waitTransactionFinished(tx);
          })
          .then((blockNumber) => {
              this.setState({
                  step: this.STEP.SUCCESS,
                  modalsubmit:false
              });
          })
          .catch((error) => {
              console.log(error)
          })
    }

    fileChangedHandler(event){
        event.preventDefault();
        

        var files = this.state.selectedPictures;
        let reader = new FileReader();
        let file = event.target.files[0];

        var imgsize = (file.size/1024).toFixed(2); 
        console.log(imgsize)
        if(imgsize<600){
            reader.onloadend = () => {
              files.push({
                file: file,
                imagePreviewUrl: reader.result
              });
              this.setState({selectedPictures:files});
            }
          reader.readAsDataURL(file)
          this.setState({
              firstPictures:this.state.selectedPictures[0].imagePreviewUrl,
              PicturesSize:''
          });
        }else{
          this.setState({PicturesSize:'The picture must not exceed 600KB'})
        }
        
    }

    deletePictures(index,e){
      this.setState({
            selectedPictures: this.state.selectedPictures.filter((elem, i) => index != i)
      });

    }


    addCommonSpaceBeds(){
      var number = this.state.roombasics_commonspacebeds+1;
      this.setState({roombasics_commonspacebeds:number});
    }

    nextStep() {
        console.log(this.state);
      this.setState({step:this.state.step+1});
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
      
      if(this.state.step == this.STEP.Step3_8)
      {
        this.setState({step:this.STEP.Step3_10});
        console.log(this.state);
      }

      sessionStorage.setItem('test', JSON.stringify(this.state));
     

    }

    preStep(){
      this.setState({step:this.state.step-1});
     
      if(this.state.step == this.STEP.Step3_10)
      {
        this.setState({step:this.STEP.Step3_8});
        console.log(this.state);
      }

       if(this.state.step == this.STEP.SUCCESS)
      {
        this.setState({step:this.STEP.Step1_1});
        console.log(this.state);
      }


    }
    Getcontent(event){
      return event.target.innerHTML;
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

    modalPictures(index,e){
      var modalBody=document.getElementById("modalBody");
      console.log(modalBody.width)
      this.setState({
            state:this.state.modalimg = this.state.selectedPictures[index].imagePreviewUrl,
            canvasW:modalBody.width,
            canvasH:modalBody.height,
            photosindex:index
      });
    }

    onClickSave = () => {
      if (this.state.editor) {
        var photosindex = this.state.photosindex;
        const canvas = this.state.editor.getImage()
        const canvasScaled = this.state.editor.getImageScaledToCanvas();
        this.setState({state:this.state.selectedPictures[photosindex].imagePreviewUrl = canvasScaled.toDataURL("image/png")})
        console.log(this.state.selectedPictures)
      }
    }

    setEditorRef = (editor) => this.state.editor = editor

  
    AdditionalRules(e){
      e.preventDefault();
      if(this.state.RulesIpt != ''){
        this.setState({state: this.state.AdditionalRules.push(this.state.RulesIpt)});
        this.setState({state: this.state.RulesIpt=""});
      }
    }

    deleteRules(index,e){
      this.setState({
            AdditionalRules: this.state.AdditionalRules.filter((elem, i) => index != i)
      });
    }
    current(){
      var D = new Date();
      if(this.state.advance_book=="Anytime"){
        return D.getFullYear()+3
      }else if(this.state.advance_book=="A year"){
        return D.getFullYear()
      }else{
        return this.state.Months[D.getMonth()]
      }
    }
    phonenumber(e){
      this.setState({state:this.state.roomdescription_phone=e});
      var rephone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if(e.length != "" && rephone.test(e)){
        this.setState({state: this.state.phoneactive=1});
      }else{
        this.setState({state: this.state.phoneactive=0});
      }
    }
    datedome(){

    }

      
    



  render() {
    const language = this.state.languagelist;
    return (
      <div className="becomehost-1 container">

        { this.state.step === this.STEP.Step1_1 &&

           <Housestep1 house_step1={this.house_step1} />
        }

        {
          this.state.step === this.STEP.Step1_2 &&
          <div className="becomehost-3 container">
          <div className="row Step1_2">
            <div className="col-md-7 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <p>{language.Step} 1: {language.Start_with_the_basics}</p>
            </div>

              <h1>{language.What_kind_of_room_do_you_listing}</h1>

             <div className="box"> 
              <h2>{language.Is_this_listing_a_home_hotel_or_something_else}</h2>

              <div className="form-group">    
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.roomdescription_homeorhotel}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu"> 
                    {this.state.homeorhotels.map((item,index) => (
                        <li><a onClick={(e)=>this.setState({roomdescription_homeorhotel:item})} >{item}</a></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
                
              <div className={this.state.roomdescription_homeorhotel == 'Please choose' ? 'hide':'show'}>  
              <h2>{language.What_type_is_it}</h2>
              <div className="form-group">    
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.roomdescription_type}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    {this.state.types.map((item,index) => (
                        <li><a onClick={(e)=>this.setState({roomdescription_type:item})} >{item}</a></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              </div>

              <div className={this.state.roomdescription_type == 'Please choose' ? 'hide':'show'}>
                  <h2>{language.What_guests_will_have}</h2>
                  <div className="form-group">    
                    
                    <div className="btn-group col-md-12">
                      <button type="button" data-toggle="dropdown">{this.state.roomdescription_guests_have}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {this.state.guestshaves.map((item,index) => (
                            <li><a onClick={(e)=>this.setState({roomdescription_guests_have:item})} >{item}</a></li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>

                   <h2>{language.Is_this_setup_dedicated_a_guest_space}</h2>

                   <div className="radio" onClick={(e) => this.setState({roomdescription_forguestorhost: 0})}>
                      <label className="text-muted"><p><span className={this.state.roomdescription_forguestorhost == 0 ?"show":"hide"}></span></p>{language.Yes_its_primarily_set_up_for_guests}</label>
                    </div>
                    <div className="radio" onClick={(e) => this.setState({roomdescription_forguestorhost: 1})}>
                      <label className="text-muted"><p><span className={this.state.roomdescription_forguestorhost == 1 ?"show":"hide"}></span></p>{language.No_I_keep_my_personal_belongings_here}</label>
                    </div>
                    
                </div>
                </div>
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
              <button className={ this.state.roomdescription_forguestorhost == 0 || this.state.roomdescription_forguestorhost == 1 ? "Right" : "buttonActive Right"} disabled={ this.state.roomdescription_forguestorhost == 0 || this.state.roomdescription_forguestorhost == 1 ? "" : "disabled"} onClick={this.nextStep}>{language.Next}</button>
            </div>
             </div>
             <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
                <div className={ this.state.roomdescription_forguestorhost == 0 || this.state.roomdescription_forguestorhost == 1 ? "show" : "hide"}>
                  <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                  <h6>{language.Entire_place}</h6>
                  <p>{language.Entire_place_presentation}</p>
                  <h6>{language.Private_room}</h6>
                  <p>{language.Private_room_presentation}</p>
                  <h6>{language.Shared_room}</h6>
                  <p>{language.Shared_room_presentation}</p>
                </div>
             </div>
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step1_3 &&
          <div className="becomehost-3 container">
          <div className="row Step1_3">
          <div className="col-md-7 col-lg-7 col-sm-12">
          <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <p>{language.Step} 1: {language.Start_with_the_basics}</p>
            </div>
              <h1>{language.How_many_guests_can_your_place_accommodate}</h1>

                  <div className="col-md-12 form-group">
                      <label>{language.Number_of_guests}*</label>
                      <div className="btn-group col-md-4">
                        <button type="button" className="guestBtn">
                          <span className={this.state.roombasics_guestsnumber == 1 ? "btnjia spanActive" : "btnjia"} onClick={(e)=>this.guestsnumber(e)} data-name="jia">▲</span>
                          {this.state.roombasics_guestsnumber}
                          <span className="btnjian" onClick={(e)=>this.guestsnumber(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                   <div className="col-md-12 form-group">
                      <label>{language.How_many_bedrooms_can_guests_use}</label>
                      <div className="btn-group col-md-7">
                        <button type="button" className="guestBtn">
                          <span className={this.state.roombasics_guestbeds == 1 ? "btnjia spanActive" : "btnjia"} onClick={(e)=>this.guestbeds(e)} data-name="jia">▲</span>
                          {this.state.roombasics_guestbeds}
                          <span className="btnjian" onClick={(e)=>this.guestbeds(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                  <div className="col-md-12 form-group">
                      <label>{language.How_many_beds_can_guests_have}*</label>
                      <div className="btn-group col-md-4">
                        <button type="button" className="guestBtn">
                          <span className={this.state.roombasics_totalguests == 1 ? "btnjia spanActive" : "btnjia"} onClick={(e)=>this.totalguests(e)} data-name="jia">▲</span>
                          {this.state.roombasics_totalguests}
                          <span className="btnjian" onClick={(e)=>this.totalguests(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                  

                  <div className="col-md-12 form-group">
                    
                  
                  <h3 className="text-muted">{language.Sleeping_arrangments}</h3>
                      <div className="step3box">
                        <div className="divLeft">
                         <h3 className="text-muted">{language.Common_space} <b>{this.state.roombasics_commonspacebeds}</b> {language.beds}</h3>
                        </div>

                        <div className="divRight">
                         <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.addCommonSpaceBeds}>{language.Add_beds}</button>
                        </div>
                      </div>

                 <div className="STEPBTN">
                    <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                    <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
                  </div>
                  </div>
          </div>
          <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
              <div>
                <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                <p>{language.The_number_and_type}</p>
                <p>{language.Sleeping_arrangements_help_guests}</p>
              </div>
          </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.Step1_4 &&
          <div className="becomehost-2 container">
          <div className="row Step1_4">
            <div className="col-md-7 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <p>{language.Step} 1: {language.Start_with_the_basics}</p>
            </div>

              <h1>{language.Bathrooms}</h1>

              <div className="box">
              <h2>{language.Number_of_bathrooms}</h2>
              <div className="btn-group col-md-5">
                <button type="button" className="guestBtn">
                  <span className={this.state.roombasics_guestbedrooms == 0.5 ? "btnjia spanActive" : "btnjia"} onClick={(e)=>this.guestbedrooms(e)} data-name="jia">▲</span>
                  {this.state.roombasics_guestbedrooms}
                  <span className="btnjian" onClick={(e)=>this.guestbedrooms(e)} data-name="jian">▼</span>
                </button>
              </div>
              </div>


             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
            </div>
             
             </div>
             
             <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.Bathrooms_presentation}</p>
                </div>
             </div>
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step1_5 &&
          <div className="becomehost-2 container">
          <div className="row Step1_5">
            <div className="col-md-7 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>{language.Step} 1: {language.Start_with_the_basics}</p>
            </div>

              <h1>{language.Wheres_your_place_located}</h1>
              <div className="box">
              <div className="btn-group col-md-9 step5box">
                <img className="becomehost__info" src="./images/located.png" alt=""/>
                <input type="text" placeholder={language.For_example_Qingdao}  className={this.state.roomtype_location == '' ? 'form-control pinkBorder' : 'form-control'} onChange={(e) => this.setState({roomtype_location: e.target.value})} value={this.state.roomtype_location}/>
              </div>
              </div>
             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
            </div>
             
             </div>
             
             <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.located_presentation}</p>
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
            <div className="col-md-7 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>{language.Step} 1: {language.Start_with_the_basics}</p>
            </div>

              <h1>{language.Wheres_your_place_located}</h1>
              
              <div className="Stepbox">
                <div className="col-md-12 col-lg-12 Step1_6box">
                  <h2>{language.Country} / {language.Region}</h2>
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.roomstuff_Country}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {this.state.Countrys.map((item,index) => (
                          <li><a onClick={(e)=>this.setState({roomstuff_Country:item})} >{item}</a></li>
                        ))
                      }
                    </ul>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12 Step1_6box">
                  <h2>{language.Street_Address}<span>{language.eg_Blk_35_Mandalay_Road}</span></h2>
                  <input onChange={(e) => this.setState({roomstuff_Street: e.target.value})} value={this.state.roomstuff_Street}  type="text" />
                </div>

                <div className="col-md-12 col-lg-12 Step1_6box">
                  <h2>{language.Apt_Suite_optional}<span>{language.eg1337_Mandalay_Towers} </span></h2>
                  <input onChange={(e) => this.setState({roomstuff_Apt: e.target.value})} value={this.state.roomstuff_Apt}   type="text" />
                </div>

                <div className="col-md-12 col-lg-12 Step1_6box">
                  <div className="col-md-12 col-lg-6 Step1_6box">
                    <h2>{language.City}<span>{language.eg_Singapore}</span></h2>
                    <input  onChange={(e) => this.setState({roomstuff_City: e.target.value})} value={this.state.roomstuff_City}   type="text" />
                  </div>
                  <div className=" col-md-12 col-lg-6 Step1_6box right">
                    <h2>{language.ZIP_Code}<span>{language.eg_308215}</span></h2>
                    <input  onChange={(e) => this.setState({roomstuff_ZIPCode: e.target.value})} value={this.state.roomstuff_ZIPCode}  type="text" />
                  </div>
                </div>
              </div>




            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
              <button  className={ this.state.roomstuff_Street == "" || this.state.roomstuff_Apt == "" || this.state.roomstuff_City == "" || this.state.roomstuff_ZIPCode == ""  ? "buttonActive Right" : "Right"} disabled={ this.state.roomstuff_Street == "" || this.state.roomstuff_Apt == "" || this.state.roomstuff_City == "" || this.state.roomstuff_ZIPCode == "" ? "disabled" : ""} onClick={this.nextStep}>{language.Next}</button>
            </div>
             
             </div>
             
             <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.located_presentation}</p>
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
            <div className="col-md-7 col-lg-7 col-sm-12">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>{language.Step} 1: {language.Start_with_the_basics}</p>
            </div>

              <h1>{language.Is_the_pin_in_the_right_place}</h1>
              <h2>{language.If_needed_you_can_drag_the_pin_to_adjust_its_location}</h2>
              <p className="text1">11-1318,Singapore,541189,Singapore</p>
              
              <div className="Map">
                <img src="./images/search-map.jpg" />
              </div>




            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
            </div>
             
             </div>
             
             <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
             </div>
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step1_8 &&
          <div className="becomehost-4 container">
          <div className="row Step1_8">
              <div className="col-md-7 col-lg-7 col-sm-12">
               <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <p>{language.Step} 1: {language.Start_with_the_basics}</p>
              </div>

              <h1>{language.What_amenities_do_you_offer}</h1>

             <div className="Stepbox">

                 <div onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                  <p className="Pinput" >
                    <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <div className="divinput">
                    <p>{language.Essentials}</p>
                    <p>{language.Towels_bed_sheets_soap_toilet_paper_and_pillows}</p>
                  </div>
                </div>

                <div  onClick={(e) => {if(this.state.roomstuff_Shampoo ==0 )this.setState({roomstuff_Shampoo:1});else this.setState({roomstuff_Shampoo:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Shampoo ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Shampoo}</p> 
                 
                </div>

                <div  onClick={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Closet_drwers ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Closet_drawers}</p> 
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_TV ==0 )this.setState({roomstuff_TV:1});else this.setState({roomstuff_TV:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_TV ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.TV}</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_Heat ==0 )this.setState({roomstuff_Heat:1});else this.setState({roomstuff_Heat:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_Heat ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Heat}</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_aircondition ==0 )this.setState({roomstuff_aircondition:1});else this.setState({roomstuff_aircondition:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_aircondition ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Air_conditioning}</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_breakfastcoffetea ==0 )this.setState({roomstuff_breakfastcoffetea:1});else this.setState({roomstuff_breakfastcoffetea:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_breakfastcoffetea ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Breakfast_coffe_tea}</p>
                  
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_desk_workspace ==0 )this.setState({roomstuff_desk_workspace:1});else this.setState({roomstuff_desk_workspace:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_desk_workspace ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Desk_workspace}</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_fireplace ==0 )this.setState({roomstuff_fireplace:1});else this.setState({roomstuff_fireplace:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_fireplace ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Fireplace}</p>
                  </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_iron ==0 )this.setState({roomstuff_iron:1});else this.setState({roomstuff_iron:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_iron ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Iron}</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_hairdryer ==0 )this.setState({roomstuff_hairdryer:1});else this.setState({roomstuff_hairdryer:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_hairdryer ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Hair_dryer}</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_petsinhouse ==0 )this.setState({roomstuff_petsinhouse:1});else this.setState({roomstuff_petsinhouse:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_petsinhouse ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Pets_in_the_house}</p>
                </div>
                  <div onClick={(e) => {if(this.state.roomstuff_private_entrance ==0 )this.setState({roomstuff_private_entrance:1});else this.setState({roomstuff_private_entrance:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_private_entrance ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Private_entrance}</p>
                </div>

                <h1>{language.Safety_amenities}</h1>
                 <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0,roomstuff_smartpincode_password:'',roomstuff_smartpincode_confirmpassword :''});}}>
                      <img className={this.state.roomstuff_smartpincode ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput"  onClick={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0,roomstuff_smartpincode_password:'',roomstuff_smartpincode_confirmpassword :''});}}>{language.Smart_pin_code}</p>
                  <div className="control-group">
                  <label className="control-label">{language.Insert_your_password}</label>
                  <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_password: e.target.value})} value={this.state.roomstuff_smartpincode == 1 ? this.state.roomstuff_smartpincode_password : ''} />
                  <span className={this.state.PasswordActibve == 0 ? 'glyphicon glyphicon-remove-sign' : ''}></span>   
                  </div>

                  <div className="control-group control-group1">
                   <label className="control-label">{language.ConFirm_your_password}</label>
                   <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_confirmpassword: e.target.value})} value={this.state.roomstuff_smartpincode == 1 ? this.state.roomstuff_smartpincode_confirmpassword : ''} />
                    <span className={this.state.PasswordActibve == 0 ? 'glyphicon glyphicon-remove-sign' : ''}></span>  
                 </div>
                </div>

                <div className="detector"  onClick={(e) => {if(this.state.roomstuff_smoke_detector ==0 )this.setState({roomstuff_smoke_detector:1});else this.setState({roomstuff_smoke_detector:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_smoke_detector ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Smoke_detector}</p>
                </div>
          </div>

              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
              </div>
              </div>
              <div className="col-md-5 col-lg-4  col-sm-12 paddingNone rightbox">
                  <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.Provide_the_essentials_helps_guests_feel_at_home_in_your_place}</p>
                    <p>{language.Some_hosts_provide_breakfast_or_just_coffee_and_tea}</p>
                  </div>
               </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.Step1_9 &&
          <div className="becomehost-4 container">
          <div className="row Step1_8">
              <div className="col-md-7 col-lg-7 col-sm-12 ">
               <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <p>{language.Step} 1: {language.Start_with_the_basics}</p>
              </div>

              <h1>{language.What_spaces_can_guests_use}</h1>

             <div className="Stepbox">

                  <div  onClick={(e) => {if(this.state.roomstuff_Pool ==0 )this.setState({roomstuff_Pool:1});else this.setState({roomstuff_Pool:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Pool ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Pool}</p> 
                </div>

                <div onClick={(e) => {if(this.state.roomstuff_kitchen ==0 )this.setState({roomstuff_kitchen:1});else this.setState({roomstuff_kitchen:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_kitchen ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.kitchen}</p> 
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_washer ==0 )this.setState({roomstuff_washer:1});else this.setState({roomstuff_washer:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_washer ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Laundry_washer}</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_dryer ==0 )this.setState({roomstuff_dryer:1});else this.setState({roomstuff_dryer:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_dryer ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Laundry_dryer}</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_Park ==0 )this.setState({roomstuff_Park:1});else this.setState({roomstuff_Park:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Park ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Park}</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_Lift ==0 )this.setState({roomstuff_Lift:1});else this.setState({roomstuff_Lift:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Lift ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Lift}</p>
                  
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_HotTub ==0 )this.setState({roomstuff_HotTub:1});else this.setState({roomstuff_HotTub:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_HotTub ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Hot_tub}</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_Gym ==0 )this.setState({roomstuff_Gym:1});else this.setState({roomstuff_Gym:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Gym ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Gym}</p>
                  </div>
            </div>
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
              </div>
              </div>

              <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.HouseStep9}</p>
                </div>
             </div>
          </div>
          </div>
        }
          
        {
          this.state.step === this.STEP.Step1_10 &&

          <div className="becomehost-2 container">
          <div className="row Step1_10">
          <div className="col-md-7 col-lg-7 col-sm-12">
          <h1>{language.Great_process} {this.state.user}!</h1>
          <h3>{language.Now_lets_get_some_details}</h3>
          <div className="change">
              <div>
                <p>{language.Bedrooms_beds_amenities_and_more}</p>
                <p className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step1_1})}>{language.change}</p>
              </div>
              <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
          </div>

          <div className="Step2box">
            <p className="Step2">{language.Step} 2</p>
            <h2>{language.Set_the_sence}</h2>
            <p className="Set">{language.photos_short_description_title}</p>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.nextStep}>{language.Continue}</button>
          </div>

          <div className="Step2box">
            <p className="Step3">{language.Step} 3</p>
            <h2>{language.Get_ready_for_guests}</h2>
            <p className="Set1">{language.Booking_settings_calendar_price}</p>
          </div>

          <div className="Stepbox1">
            <h2>{language.The_3rd_Party_service_provided_by_host}</h2>

            <div className="service">
              <div>
                  <h5><p>{language.Home_Rapair}<span>▲</span></p></h5>
                  <h5><p>{language.Marketing_Brand}<span>▼</span></p></h5>
                  <h5><p>{language.Photoshooting}<span>▲</span></p></h5>
                  <h5><p>{language.Interior_Design}<span>▼</span></p></h5>
                  <h5><p>{language.Cleaning_Washing}<span>▲</span></p></h5>
              </div>
            </div>

          </div>

          <div className="Rapair" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>
              <img  src="../images/footer_icon-19.png" alt=""/>
              <span className="left">{language.We_recommend}: </span>
              <span className="right">{language.Home_Rapair}</span>
          </div>      

          <div  className={this.state.Rapair != 0 ? 'show Shop' : 'hide Shop'}>
              <div className={this.state.Rapair == 1 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div className={this.state.Rapair == 2 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div  className={this.state.Rapair == 3 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
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
          <div className="col-md-5 col-lg-4 col-md-push-1 col-sm-12 paddingNone">
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
              <p>{language.Step} 2: {language.Set_the_scene}</p>
            </div>

               <h1>{language.Show_travellers_what_your_space_looks_like}
                <img src="../images/photoi.png" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}/>
              </h1>

              <div  className={this.state.Rapair == 0 ? 'show rightbox' : 'hide rightbox'}>
                  <span onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>×</span>
                  <ul>
                      <img src="../images/step2_2.png" />
                      <li>{language.Many_hosts_have_at_least_8photos}</li>
                      <img src="../images/step2_1.png" />
                      <li>{language.Make_sure_the_room_is_well_lit}</li>
                      <li>{language.Sometimes_shooting_from_a_corner}</li>
                  </ul>
              </div>
              
              <div className="photos" onChange={(e) => this.setState({step:this.STEP.Step2_2})}>
                 <div className="photosipt">
                    <h3>{language.Drag_and_Drop}<p>{language.OR}</p><button>{language.Browse}</button></h3>
                    <img src="../images/addphoto.png" alt=""/>
                    <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={this.fileChangedHandler}/>
                 </div>
              </div>
             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
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
              <p>{language.Step} 2: {language.Set_the_scene}</p>
            </div>

              <h1>{language.Show_travellers_what_your_space_looks_like}
                <img src="../images/photoi.png" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}/>
              </h1>

              <div  className={this.state.Rapair == 0 ? 'show rightbox' : 'hide rightbox'}>
                  <span onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>×</span>
                  <ul>
                      <img src="../images/step2_2.png" />
                      <li>{language.Many_hosts_have_at_least_8photos}</li>
                      <img src="../images/step2_1.png" />
                      <li>{language.Make_sure_the_room_is_well_lit}</li>
                      <li>{language.Sometimes_shooting_from_a_corner}</li>
                  </ul>
              </div>
              
              <div className="photos">
                  {this.state.selectedPictures.map((file,index) => (
                    <div className="photosimg" >
                      <img className="img-thumbnail"  data-toggle="modal" data-target="#myModal" onClick={this.modalPictures.bind(this,index)} src={file.imagePreviewUrl} />
                      <span  className="glyphicon glyphicon-trash" onClick={this.deletePictures.bind(this,index)} ></span>
                    </div>
                    ))
                   }
                 <div className="photosipt">
                    <img src="../images/addphoto1.png" />
                    <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={(e)=>this.fileChangedHandler(e)}/>
                 </div>
              </div>
              <p className="textpink">{this.state.PicturesSize}</p>

              <div className="modal fade hide" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <div className="modal-body" id="modalBody" ref='modalBody'>
                    <AvatarEditor
                        ref = {this.setEditorRef}
                        image={this.state.modalimg}
                        width={700}
                        height={500}
                        border={[50,0,50,0]}
                        color={[0, 0, 0, 0.6]}
                        scale={this.state.canvasScale}
                        rotate={this.state.canvasRotate}
                      />
                    </div>
                    <div className="modal-footer" >
                      <ul className={this.state.modalset == 0 ? "Set modalshow" : "Set hide"}>
                          <li onClick={(e) => this.setState({modalset:1})}><img src="../images/crop.png" />{language.Crop}</li>
                          <li onClick={(e) => this.setState({modalset:2})}><img src="../images/Brightness.png" />{language.Adjust_Brightness}</li>
                          <li onClick={(e) => this.setState({canvasRotate:this.state.canvasRotate+90})}><img src="../images/Rotate.png" />{language.Rotate}</li>
                      </ul>
                      <ul className={this.state.modalset != 0 ? "Brightness show" : "Brightness hide"}>
                          <li  className={this.state.modalset == 1 ? "show" : "hide"}>
                              <p>{language.Zoom}</p>
                              <input type="range" onChange={(e)=>this.setState({canvasScale:e.target.value})} name="points"  step="0.01" min="0.5" max="2" />
                          </li>
                          <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                              <p>{language.Brightness}</p>
                              <input type="range" onChange={(e)=>this.BrightnessPictures(e.target.value)} name="points" step="0.01" min="-1" max="1" />
                          </li>
                          <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                              <p>{language.Contrast_Ratio}</p>
                              <input type="range" name="points" step="0.02" min="1" max="3" />
                          </li>
                      </ul>
                      <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Cancel show" : "btn Cancel hide"} type="button">{language.Cancel}</button>
                      <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Complete show" : "btn Complete hide"} type="button" >{language.Complete}</button>
                      <button  className={this.state.modalset == 0 ? "btn Replace show" : "btn Replace hide"} data-dismiss="modal" aria-hidden="true" type="button" onClick={(e)=>this.onClickSave(e)}>{language.Save_and_Replace}</button>
                    </div>
                  </div>
                </div>
              <div className="modal-backdrop fade in"></div>
              </div>

             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
            </div>
             
             </div>
             
             </div>
             </div>
        }
         
        {
          this.state.step === this.STEP.Step2_3 &&
          <div className="becomehost-2 container">
          <div className="row Step2_3">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <p>{language.Step} 2: {language.Set_the_scene}</p>
              </div>

              <h2>{language.Edit_your_description}</h2>
              <h4>{language.Summary}</h4>
              <textarea onChange={(e) => this.setState({roomdescription_description: e.target.value})} placeholder={language.Describe_the_decor_light_whats_nearby_etc}>{this.state.roomdescription_description}</textarea>

              <h4>{language.My_place_is_great_for}</h4>

              <div className="stepbox">  
                <div onClick={(e) => {if(this.state.roomstuff_withKids ==0 )this.setState({roomstuff_withKids:1});else this.setState({roomstuff_withKids:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_withKids ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Family_with_kids}</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_BigGroups ==0 )this.setState({roomstuff_BigGroups:1});else this.setState({roomstuff_BigGroups:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_BigGroups ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Big_groups}</p>
                  
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_pets ==0 )this.setState({roomstuff_pets:1});else this.setState({roomstuff_pets:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_pets ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Furry_friends_pets}</p>
                </div>
            </div>
              
              <h4 className={this.state.scene == 1 ? 'show cursor' : 'hide'}  onClick={(e) => this.setState({scene:0})}>{language.Add_more_optional}</h4>
              <p className={this.state.scene == 1 ? 'show cursor' : 'hide'}  onClick={(e) => this.setState({scene:0})}>{language.only_of_hosts_add_more_info_here}</p>

            <div className={this.state.scene == 0 ? 'show' : 'hide'}>
              <h4>{language.About_your_place_optional}</h4>
              <textarea onChange={(e) => this.setState({roomdescription_Aboutyour: e.target.value})}>{this.state.roomdescription_Aboutyour}</textarea>


              <h4>{language.What_guests_can_access_optional}</h4>
              <textarea onChange={(e) => this.setState({roomdescription_guestscan: e.target.value})}>{this.state.roomdescription_guestscan}</textarea>


              <h4>{language.Your_interaction_with_guests_optional}</h4>
              <textarea onChange={(e) => this.setState({roomdescription_interaction: e.target.value})}>{this.state.roomdescription_interaction}</textarea>

              <h4>{language.Other_things_to_note_optional}</h4>
              <textarea onChange={(e) => this.setState({roomdescription_Otherthings: e.target.value})}>{this.state.roomdescription_Otherthings}</textarea>

              <h2>{language.The_neighbourhood}</h2>
              

              <h4>{language.About_the_neighbourhood_optional}</h4>
              <textarea onChange={(e) => this.setState({roomdescription_neighbourhood: e.target.value})}>{this.state.roomdescription_neighbourhood}</textarea>

              <h4>{language.How_to_get_around_optional}</h4>
              <textarea onChange={(e) => this.setState({roomdescription_around: e.target.value})}>{this.state.roomdescription_around}</textarea>
            </div>
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className={ this.state.roomdescription_description == "" ? "buttonActive Right" : "Right"} disabled={ this.state.roomdescription_description == "" ? "disabled" : ""} onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.Your_summary_description}</p>
                    <p>{language.You_can_also_use_your_description}</p>
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
                <p>{language.Step} 2: {language.Set_the_scene}</p>
              </div>

              <h1>{language.Name_your_place}</h1>
              <div className="box">
                <span className={this.state.roomdescription_title.length > 50 ? "textpink" : ""}>{50-this.state.roomdescription_title.length}</span>
                <input placeholder={language.Listing_title} onChange={(e) => this.setState({roomdescription_title: e.target.value})} value={this.state.roomdescription_title}  type="text" />
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className={ this.state.roomdescription_title == "" || this.state.roomdescription_title.length > 50 ? "buttonActive Right" : "Right"} disabled={ this.state.roomdescription_title == "" || this.state.roomdescription_title.length > 50 ? "disabled" : ""} onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.Singapore_Home_with_a_View}</p>
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
                <p>{language.Step} 2: {language.Set_the_scene}</p>
              </div>

              <h1>{language.Add_your_mobile_number}</h1>


              <div className="box col-md-10">
                <div className="stepbox">
                <div className="phoneimg"><img className="becomehost__info" src="./images/phoneimg.png" alt=""/></div>

                <div className="btn-group col-md-12 phonecode">
                  <span data-toggle="dropdown">+{this.state.roomstuff_AreaCode}</span>
                  <ul className="dropdown-menu" role="menu">
                    {this.state.National_name.map((item,index) => (
                        <li><a onClick={(e)=>this.setState({roomstuff_AreaCode:item})} >+{item}</a></li>
                      ))
                    }
                  </ul>
                </div>
                
                <input onChange={(e) => this.phonenumber(e.target.value)} value={this.state.roomdescription_phone}  type="text" />

                <img className={this.state.phoneactive == 1 ? "show" : "hide"} src="./images/landloard_page-30.png" alt=""/>
              </div>
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className={ this.state.phoneactive == 0 ? "buttonActive Right" : "Right"} disabled={ this.state.phoneactive == 0 ? "disabled" : ""} onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.Only_confirmed_guests_get_your_phone_number}</p>
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
          <h1>{language.Great_process} {this.state.user}!</h1>
          <h3>{language.Now_lets_get_some_details}</h3>
          <div className="change">
              <div>
                <p>{language.Bedrooms_beds_amenities_and_more}</p>
                <p className="textpink" onClick={(e) => this.setState({step:this.STEP.Step1_1})}>{language.change}</p>
              </div>
              <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
          </div>

          <div className="change">
              <div>
                <p>{language.Photos_short_description_title}</p>
                <p className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step2_1})}>{language.change}</p>
              </div>
              <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
          </div>

          <div className="Step2box">
            <p className="Step2">{language.Step} 3</p>
            <h2>{language.Get_ready_for_guests}</h2>
            <p className="Set">{language.Booking_settings_calendar_price}</p>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.nextStep}>{language.Continue}</button>
          </div>


          <div className="Stepbox1">
            <h2>{language.The_3rd_Party_service_provided_by_host}</h2>

            <div className="service">
              <div>
                  <h5><p>{language.Home_Rapair}<span>▲</span></p></h5>
                  <h5><p>{language.Marketing_Brand}<span>▼</span></p></h5>
                  <h5><p>{language.Photoshooting}<span>▲</span></p></h5>
                  <h5><p>{language.Interior_Design}<span>▼</span></p></h5>
                  <h5><p>{language.Cleaning_Washing}<span>▲</span></p></h5>
              </div>
            </div>

          </div>

          <div className="Rapair" onClick={(e) => {if(this.state.Rapair == 0 )this.setState({Rapair:1});else this.setState({Rapair:0});}}>
              <img  src="../images/footer_icon-19.png" alt=""/>
              <span className="left">{language.We_recommend}: </span>
              <span className="right">{language.Home_Rapair}</span>
          </div>      

          <div  className={this.state.Rapair != 0 ? 'show Shop' : 'hide Shop'}>
              <div className={this.state.Rapair == 1 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div className={this.state.Rapair == 2 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
              </div>
              <div  className={this.state.Rapair == 3 ? 'show Shoplist' : 'hide Shoplist'}>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
                      </ul>
                  </div>
                  <div className="Shopitem">
                      <div>
                          <span className="left">{language.Shop1}</span>
                          <span className="right">{language.Home_Fix}</span>  
                      </div>
                      <ul>
                          <li><span>{language.Address}: </span> Selffix DIY Vivo City,1 Harbourfront Walk,#B2-20/21 VivoCity,098585</li>
                          <li><span>{language.Contact_No}:</span>  +65 84736394</li>
                          <li><span>{language.Email_Address} : </span> HFC@homefix.com</li>
                          <li><span>{language.Reference} :</span> Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do e</li>
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
          this.state.step === this.STEP.Step3_1 &&
          <div className="becomehost-2 container">
          <div className="row Step3_1">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>{language.Step} 3: {language.Get_ready_for_guests}</p>
              </div>

              <h1>{language.Review_PopulStays_guest_requirements}</h1>


              <div className="box col-md-12">
                <h3>{language.All_PopulStay_guests_must_provide}</h3>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Email ==0 )this.setState({roomdescription_Email:1});else this.setState({roomdescription_Email:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Email == 1 ?"show":"hide"}></span></p>{language.Email_address}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Confirmedphone ==0 )this.setState({roomdescription_Confirmedphone:1});else this.setState({roomdescription_Confirmedphone:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Confirmedphone == 1 ?"show":"hide"}></span></p>{language.Confirmed_phone_number}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_information ==0 )this.setState({roomdescription_information:1});else this.setState({roomdescription_information:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_information == 1 ?"show":"hide"}></span></p>{language.Payment_information}</label>
                </div>

                <h3>{language.Before_booking_your_home_each_guest_must}</h3>
                <div className="radio"  onClick={(e) => {if(this.state.roomdescription_Rules ==0 )this.setState({roomdescription_Rules:1});else this.setState({roomdescription_Rules:0});}}>
                  <label className="text-muted"><p><span className={this.state.roomdescription_Rules == 1 ?"show":"hide"}></span></p>{language.Agree_to_your_House_Rules}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Message ==0 )this.setState({roomdescription_Message:1});else this.setState({roomdescription_Message:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Message == 1 ?"show":"hide"}></span></p>{language.Message_you_about_their_trip}</label>
                </div>
                <div className="radio"  onClick={(e) => {if(this.state.roomdescription_manyguests ==0 )this.setState({roomdescription_manyguests:1});else this.setState({roomdescription_manyguests:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_manyguests == 1 ?"show":"hide"}></span></p>{language.Let_you_know_how_many_guests_are_coming}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Confirmtime ==0 )this.setState({roomdescription_Confirmtime:1});else this.setState({roomdescription_Confirmtime:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Confirmtime == 1 ?"show":"hide"}></span></p>{language.Confirm_their_checkin_time_if_theyre_arriving_within2days}</label>
                </div>

                <h3 className="textpink">{language.Add_additional_requirements}</h3>
                <div className="check" onClick={(e) => {if(this.state.roomstuff_submittedPopulStay ==0 )this.setState({roomstuff_submittedPopulStay:1});else this.setState({roomstuff_submittedPopulStay:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_submittedPopulStay ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.governmentissued_ID_submitted_to_PopulStay}</p>
                </div>
                <div className="check" onClick={(e) => {if(this.state.roomstuff_Recommended ==0 )this.setState({roomstuff_Recommended:1});else this.setState({roomstuff_Recommended:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Recommended ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Recommended_by_other_hosts_and_have_no_negative_reviews}</p>
                </div>
                <h6>{language.More_requirements_can_mean_fewer_reservations}</h6>
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.You_need_to_feel_confident_with_every_reservation}</p>
                </div>
             </div>
    

             
             </div>
             </div>
        }
        
        {
          this.state.step === this.STEP.Step3_2 &&
          <div className="becomehost-2 container">
          <div className="row Step3_2">
            <div className="col-md-8 col-lg-7 col-sm-12 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>{language.Step} 3: {language.Get_ready_for_guests}</p>
              </div>

              <h1>{language.Set_house_rules_for_your_guests}</h1>


              <div className="box col-md-10">
                <div className="check" onClick={(e) => {if(this.state.rules_children ==0 )this.setState({rules_children:1});else this.setState({rules_children:0});}}>
                  <p className="divinput">{language.Suitable_for_children}
                    <span><img className="Promptimg" src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>{language.You_can_say_your_listing}</p>
                    </div>
                    </span>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_children ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_children ==0 ? 'show' : 'hide'} src="../images/checkcuo.png" alt=""/>
                  </p>
                  <p className="textpink" onClick={(e) => {this.openModal(e)}} >Explain why</p>
                </div>

                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles} 
                contentLabel="Wallet Message">
                <div className="Explainwhy">
                  <span className="close" onClick={(e) => {this.closeModal(e)}}>×</span>
                  <h3>{language.Explain_why_your_listing}</h3>
                  <p>{language.What_features_of_your}</p>
                  <textarea onChange={(e)=>this.setState({Explainwhy:e.target.value})}></textarea>
                  <button className="Done" onClick={(e) => {this.closeModal(e)}} >{language.Done}</button>
                  <button className="Cancel" onClick={(e) => {this.closeModal(e)}} >{language.Cancel}</button>
                </div>  
                </Modal>

                <div className="check" onClick={(e) => {if(this.state.rules_infants ==0 )this.setState({rules_infants:1});else this.setState({rules_infants:0});}}>
                  <p className="divinput">{language.Suitable_for_infants}
                    <span><img className="Promptimg" src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>{language.You_can_say_your_listing}</p>
                    </div>
                    </span>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_infants ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_infants ==0 ? 'show' : 'hide'} src="../images/checkcuo.png" alt=""/>
                  </p>
                </div>
                <div className="check" onClick={(e) => {if(this.state.rules_pets ==0 )this.setState({rules_pets:1});else this.setState({rules_pets:0});}}>
                  <p className="divinput">{language.Suitable_for_pets}
                    <span><img className="Promptimg" src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>{language.You_can_limit_guests_from_bringing_pets}</p>
                    </div>
                    </span>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_pets ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_pets ==0 ? 'show' : 'hide'} src="../images/checkcuo.png" alt=""/>
                  </p>
                </div>
                <div className="check" onClick={(e) => {if(this.state.rules_Smoking ==0 )this.setState({rules_Smoking:1});else this.setState({rules_Smoking:0});}}>
                  <p className="divinput">{language.Smoking_allowed}</p>
                  <p  className="Pinput">
                      <img className={this.state.rules_Smoking ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_Smoking ==0 ? 'show' : 'hide'} src="../images/checkcuo.png" alt=""/>
                  </p>
                </div>
                <div className="check" onClick={(e) => {if(this.state.rules_parties ==0 )this.setState({rules_parties:1});else this.setState({rules_parties:0});}}>
                  <p className="divinput">{language.Events_or_parties_allowed}</p>
                  <p  className="Pinput">
                      <img className={this.state.rules_parties ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_parties ==0 ? 'show' : 'hide'} src="../images/checkcuo.png" alt=""/>
                  </p>
                </div>

                <h4>{language.Additional_rules}</h4>
                {this.state.AdditionalRules.map((Rules,index) => (
                  <h3>{Rules}<span data-index={index} onClick={this.deleteRules.bind(this,index)}>×</span></h3>
                  ))
                }
                <form onSubmit={(e)=>this.AdditionalRules(e)}>
                  <div className="add">
                    <input type="text" onChange={(e)=>this.setState({RulesIpt:e.target.value})} placeholder={language.Quiet_hours_No_shoes_in_the_house} value={this.state.RulesIpt} />
                    <button type="submit">{language.Add}</button>
                  </div>
                </form>

                <h4 className={this.state.guests_know == 0 ? "textpink":""} onClick={(e)=>this.setState({guests_know:1})}>{language.Details_guests_must_know_about_your_home}</h4>
                <div className={this.state.guests_know == 0 ? "hide":"show"}>
                  <div className="check1" onClick={(e) => {if(this.state.climb_stairs ==0 )this.setState({climb_stairs:1});else this.setState({climb_stairs:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.climb_stairs ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.Must_climb_stairs}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.Potential_noise ==0 )this.setState({Potential_noise:1});else this.setState({Potential_noise:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.Potential_noise ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.Potential_for_noise}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_Pet ==0 )this.setState({property_Pet:1});else this.setState({property_Pet:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_Pet ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.Pets_live_on_property}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_parking ==0 )this.setState({property_parking:1});else this.setState({property_parking:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_parking ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.No_parking_on_property}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.shared_spaces ==0 )this.setState({shared_spaces:1});else this.setState({shared_spaces:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.shared_spaces ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.Some_spaces_are_shared}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.Amenity_limitations ==0 )this.setState({Amenity_limitations:1});else this.setState({Amenity_limitations:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.Amenity_limitations ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.Amenity_limitations}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_recording ==0 )this.setState({property_recording:1});else this.setState({property_recording:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_recording ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.D_Survellance_or_recording_devices_on_property}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_Weapons ==0 )this.setState({property_Weapons:1});else this.setState({property_Weapons:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_Weapons ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.Weapons_on_property}</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_animals ==0 )this.setState({property_animals:1});else this.setState({property_animals:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_animals ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">{language.Dangerous_animals_on_property}</p>
                  </div>
                </div>
                
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-12 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.In_addition_to_PopulStays_requirements}</p>
                    <p>{language.If_youre_ever_uncomfortable_with_a_reservation}</p>
                </div>
             </div>
    

             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_3 &&
          <div className="becomehost-2 container">
          <div className="row Step3_1">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>{language.Step} 3: {language.Get_ready_for_guests}</p>
              </div>

              <h1>{language.Review_PopulStay_guest_requirements}</h1>


              <div className="box col-md-12">
                <h3>{language.All_PopulStay_guests_must_provide}:<span className="textpink" >{language.Review}</span></h3>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Email ==0 )this.setState({roomdescription_Email:1});else this.setState({roomdescription_Email:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Email == 1 ?"show":"hide"}></span></p>{language.Email_address}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Confirmedphone ==0 )this.setState({roomdescription_Confirmedphone:1});else this.setState({roomdescription_Confirmedphone:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Confirmedphone == 1 ?"show":"hide"}></span></p>{language.Confirmed_phone_number}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.Payment_information ==0 )this.setState({Payment_information:1});else this.setState({Payment_information:0});}} >
                  <label className="text-muted"><p><span className={this.state.Payment_information == 1 ?"show":"hide"}></span></p>{language.Payment_information}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.guest_message ==0 )this.setState({guest_message:1});else this.setState({guest_message:0});}} >
                  <label className="text-muted"><p><span className={this.state.guest_message == 1 ?"show":"hide"}></span></p>{language.A_message_about_the_guests_trip}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.last_time ==0 )this.setState({last_time:1});else this.setState({last_time:0});}} >
                  <label className="text-muted"><p><span className={this.state.last_time == 1 ?"show":"hide"}></span></p>{language.Checkin_time_for_last_minute_trips}</label>
                </div>

                <h3>{language.Your_additional_requirements}<span className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step3_2})}>{language.Edit}</span></h3>
                <div className="radio"  onClick={(e) => {if(this.state.governmentissued_ID ==0 )this.setState({governmentissued_ID:1});else this.setState({governmentissued_ID:0});}}>
                  <label className="text-muted"><p><span className={this.state.governmentissued_ID == 1 ?"show":"hide"}></span></p>{language.Submit_a_government_issued_ID_to_PopulStay}</label>
                </div>

                <h3>{language.Your_House_Rules}<span className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step3_2})}>{language.Edit}</span></h3>
                <div className="radio" onClick={(e) => {if(this.state.Not_safe ==0 )this.setState({Not_safe:1});else this.setState({Not_safe:0});}} >
                  <label className="text-muted"><p><span className={this.state.Not_safe == 1 ?"show":"hide"}></span></p>{language.Not_safe_or_suitable_for_children}</label>
                </div>
                <div className="radio"  onClick={(e) => {if(this.state.anytime_Checkin ==0 )this.setState({anytime_Checkin:1});else this.setState({anytime_Checkin:0});}} >
                  <label className="text-muted"><p><span className={this.state.anytime_Checkin == 1 ?"show":"hide"}></span></p>{language.Checkin_is_anytime_after_3PM}</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.NO_shoes ==0 )this.setState({NO_shoes:1});else this.setState({NO_shoes:0});}} >
                  <label className="text-muted"><p><span className={this.state.NO_shoes == 1 ?"show":"hide"}></span></p>{language.NO_shoes_in_the_house}</label>
                </div>

              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>{language.Guests_will_only_be_able_to_book}</p>
                </div>
             </div>
    

             
             </div>
             </div>
        }
        
        {
          this.state.step === this.STEP.Step3_4 &&
          <div className="becomehost-2 container">
          <div className="row Step3_4">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>{language.Step} 3: {language.Get_ready_for_guests}</p>
              </div>

              <h1>{language.Heres_how_guests_will_book_with_you}</h1>


              <div className="box col-md-12">
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img src="../images/step3_4img1.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>{language.Qualified_guests_find_your_listing}</h3>
                    <p>{language.Anyone_who_wants_to_book_with}</p>
                  </div>
                </div>
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img src="../images/step3_4img2.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>{language.You_set_controls_for_who_can_book}</h3>
                    <p>{language.To_book_available_dates_without_having}</p>
                    <p className="textpink">{language.I_want_to_review_every_request}</p>
                  </div>
                </div>
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img src="../images/step3_4img3.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>{language.Once_a_guest_books_you_get_notified}</h3>
                    <p>{language.Youll_immediately_get_a_confirmation}</p>
                  </div>
                </div>
              </div>

              
             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/step3_4img4.png" alt=""/>
                    <p>{language.In_the_rare_case_there_are_issues}</p>
                    <h5>{language.Set_rules_for_who_can_book_instantly}</h5>
                </div>
             </div>
    

             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_5 &&
          <div className="becomehost-2 container">
          <div className="row Step3_5">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>{language.Step} 3: {language.Get_ready_for_guests}</p>
              </div>

              <h1>{language.Successful_hosting_starts}</h1>


              <div className="box col-md-12">
                <p>{language.Guests_will_book_available_days_instantly}</p>
                <p>{language.Cancelling_disrupts_guests_plans}</p>

                <div className="check"  onClick={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Closet_drwers ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">{language.Got_it_Ill_keep_my_calendar_up_to_date}</p> 
                </div>
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button  className={ this.state.roomstuff_Closet_drwers ==0 ? "buttonActive Right" : "Right"} disabled={ this.state.roomstuff_Closet_drwers ==0 ? "disabled" : ""} onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>

    

             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_6 &&
          <div className="becomehost-2 container">
          <div className="row Step3_6">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>{language.Step} 3: {language.Get_ready_for_guests}</p>
              </div>

              <h1>{language.Lets_get_started_with_a_couple_questions}</h1>


              <div className="box col-md-12">

                <h3>{language.Have_you_rented_out_your_place_before}</h3>
                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.question_rented}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      <li><a onClick={(e)=>this.setState({question_rented:this.Getcontent(e)})}>{language.Im_a_novice_in_this_respect}</a></li>
                      <li><a onClick={(e)=>this.setState({question_rented:this.Getcontent(e)})}>{language.I_have_a_renting_experience}</a></li>
                    </ul>
                  </div>
                </div>
                <h3>{language.How_often_do_you_want_to_have_guests}</h3>
                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.Howoften_guests}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      <li><a onClick={(e)=>this.setState({Howoften_guests:this.Getcontent(e)})}>{language.Not_sure_yet}</a></li>
                      <li><a onClick={(e)=>this.setState({Howoften_guests:this.Getcontent(e)})}>{language.Part_of_the_time}</a></li>
                      <li><a onClick={(e)=>this.setState({Howoften_guests:this.Getcontent(e)})}>{language.As_much_as_possible}</a></li>
                    </ul>
                  </div>
                </div>
              </div>

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>{language.Back}</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>{language.Next}</button>
              </div>
               
             </div>


             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/step3_4img4.png" alt=""/>
                    <p>{language.Based_on_your_responses}</p>
                </div>
             </div>
             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_7 &&
          <div className="becomehost-2 container">
          <div className="row Step3_6 Step3_7">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>How much notice do you need before a guest arrives?</h1>


              <div className="box col-md-12">

                <h3>Have you rented out your place before?</h3>
                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.notice_arrives}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      <li><a onClick={(e)=>this.setState({notice_arrives:this.Getcontent(e)})}>Same day</a></li>
                      <li><a onClick={(e)=>this.setState({notice_arrives:this.Getcontent(e)})}>1 days</a></li>
                      <li><a onClick={(e)=>this.setState({notice_arrives:this.Getcontent(e)})}>2 days</a></li>
                      <li><a onClick={(e)=>this.setState({notice_arrives:this.Getcontent(e)})}>3 days</a></li>
                      <li><a onClick={(e)=>this.setState({notice_arrives:this.Getcontent(e)})}>7 days</a></li>
                    </ul>
                  </div>
                </div>
                <h5><b className="textpink">Tip:</b> At least 2 days’ notice can help you plan for a guest’s arrival, but you might miss out on last-minute trips.</h5>
                <h3 className="textpink" onClick={(e)=>this.setState({guests_check:true})}>When can guests check in?</h3>
                <div className={this.state.guests_check == true?"form-group form-group1 show":"form-group form-group1 hide"}>    
                  <div className="btn-group col-md-6">
                    <h5>From:</h5>
                    <button type="button" data-toggle="dropdown">{this.state.Howoften_From}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {this.state.Howoften_Froms.map((item,index) => (
                          <li><a onClick={(e)=>this.setState({Howoften_From:item})} >{item}</a></li>
                        ))
                      }
                    </ul>
                  </div>

                  <div className="btn-group col-md-6">
                    <h5>To:</h5>
                    <button type="button" data-toggle="dropdown" disabled={this.state.Howoften_From == "flexible" ? "disabled" : "" } > {this.state.Howoften_From == "flexible" ? "flexible": this.state.Howoften_To }<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {this.state.Howoften_Tos.map((item,index) => (
                          <li><a onClick={(e)=>this.setState({Howoften_To:item})} >{item}</a></li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>


             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox1">
                 <div className={this.state.notice_arrives == "Please choose" ? "hide" : ""}>
                    <p>Today</p>
                    <div className="date">
                      <img className="becomehost__info" src={this.state.notice_arrives == "Same day" ? "./images/step3_7img2.png" : "./images/step3_7img1.png"} alt=""/>
                      <span className={this.state.notice_arrives == "Same day" ? "textpink" : ""}>{new Date().getDate()}</span>
                    </div>
                    <div className={this.state.notice_arrives == "Same day" ? "hide date" : "date"}>
                      <img className="becomehost__info" src={this.state.notice_arrives == "1 days" ? "./images/step3_7img2.png" : "./images/step3_7img1.png"} alt=""/>
                      <span className={this.state.notice_arrives == "1 days" ? "textpink" : ""}>{new Date().getDate()+1}</span>
                    </div>
                    <div className={this.state.notice_arrives == "Same day" || this.state.notice_arrives == "1 days" ? "hide date" : "date"}>
                      <img className="becomehost__info" src={this.state.notice_arrives == "2 days" ? "./images/step3_7img2.png" : "./images/step3_7img1.png"} alt=""/>
                      <span className={this.state.notice_arrives == "2 days" ? "textpink" : ""}>{new Date().getDate()+2}</span>
                    </div>
                    <div className={this.state.notice_arrives == "Same day" || this.state.notice_arrives == "1 days" || this.state.notice_arrives == "2 days" ? "hide date" : "date"}>
                      <img className="becomehost__info" src={this.state.notice_arrives == "3 days" ? "./images/step3_7img2.png" : "./images/step3_7img1.png"} alt=""/>
                      <span className={this.state.notice_arrives == "3 days" ? "textpink" : ""}>{new Date().getDate()+3}</span>
                    </div>
                    <div className={this.state.notice_arrives == "Same day" || this.state.notice_arrives == "1 days" || this.state.notice_arrives == "2 days" || this.state.notice_arrives == "3 days" ? "hide date" : "date"}>
                      <img className="becomehost__info" src="./images/step3_7img1.png" alt=""/>
                      <span>{new Date().getDate()+4}</span>
                    </div>
                    <div className={this.state.notice_arrives == "Same day" || this.state.notice_arrives == "1 days" || this.state.notice_arrives == "2 days" || this.state.notice_arrives == "3 days" ? "hide date" : "date"}>
                      <img className="becomehost__info" src="./images/step3_7img1.png" alt=""/>
                      <span>{new Date().getDate()+5}</span>
                    </div>
                    <div className={this.state.notice_arrives == "Same day" || this.state.notice_arrives == "1 days" || this.state.notice_arrives == "2 days" || this.state.notice_arrives == "3 days" ? "hide date" : "date"}>
                      <img className="becomehost__info" src={this.state.notice_arrives == "7 days" ? "./images/step3_7img2.png" : "./images/step3_7img1.png"} alt=""/>
                      <span className={this.state.notice_arrives == "7 days" ? "textpink" : ""}>{new Date().getDate()+6}</span>
                    </div>
                </div>
             </div>
             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_8 &&
          <div className="becomehost-2 container">
          <div className="row Step3_6 Step3_8">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>How far in advance can guests book?</h1>


              <div className="box col-md-12">

                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.advance_book}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {this.state.advance_books.map((item,index) => (
                          <li><a onClick={(e)=>this.setState({advance_book:item})} >{item}</a></li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <h5><b className="textpink">Tip:</b>Avoid cancelling or declining guests by only  unblocking dates you can host.</h5>
              </div>

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>


             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox1">
                 <div>
                    <div className={this.state.advance_book == "A year" ? "hide date" : "modalshow date"}>
                      <img className="becomehost__info" src="./images/step3_8img1.png" alt=""/>
                      <span>
                            {this.state.advance_book != "A year" && this.state.advance_book != "Anytime"  ? this.state.Months[new Date().getMonth()-2] : ""}
                            {this.state.advance_book == "Anytime" ? new Date().getFullYear()+1 : ""}
                            {this.state.advance_book == "A year" ? new Date().getFullYear()-2 : ""}
                      </span>
                    </div>
                    <div className="date">
                      <img className="becomehost__info" src="./images/step3_8img1.png" alt=""/>
                      <span>
                            {this.state.advance_book != "A year" && this.state.advance_book != "Anytime" ? this.state.Months[new Date().getMonth()-1] : ""}
                            {this.state.advance_book == "Anytime" ? new Date().getFullYear()+2 : ""}
                            {this.state.advance_book == "A year" ? new Date().getFullYear()-1 : ""}
                      </span>
                    </div>
                    <div className="date">
                      <img className="becomehost__info" src={this.state.advance_book == "9 months" || this.state.advance_book == "6 months" ? "./images/step3_8img1.png" : "./images/step3_8img2.png"} alt=""/>
                      <span className={this.state.advance_book == "9 months" || this.state.advance_book == "6 months" ? "" : "textpink"}>{this.current()}</span>
                    </div>


                    <div className={this.state.advance_book == "9 months" || this.state.advance_book == "6 months"  ? "modalshow date" : "hide date"}>
                      <img className="becomehost__info" src="./images/step3_8img1.png" alt=""/>
                      <span>{this.state.Months[new Date().getMonth()+1]}</span>
                    </div>
                    <div className={this.state.advance_book == "9 months" || this.state.advance_book == "6 months"  ? "modalshow date" : "hide date"}>
                      <img className="becomehost__info" src="./images/step3_8img1.png" alt=""/>
                      <span>{this.state.Months[new Date().getMonth()+2]}</span>
                    </div>
                    <div className={this.state.advance_book == "9 months" || this.state.advance_book == "6 months"  ? "modalshow date" : "hide date"}>
                      <img className="becomehost__info" src={this.state.advance_book == "6 months" ? "./images/step3_8img2.png" : "./images/step3_8img1.png"} alt=""/>
                      <span className={this.state.advance_book == "6 months" ? "textpink" : "" } >{this.state.Months[new Date().getMonth()+3]}</span>
                    </div>


                    <div className={this.state.advance_book == "9 months"  ? "modalshow date" : "hide date"}>
                      <img className="becomehost__info" src="./images/step3_8img1.png" alt=""/>
                      <span>{this.state.Months[new Date().getMonth()+4]}</span>
                    </div>
                    <div className={this.state.advance_book == "9 months"  ? "modalshow date" : "hide date"}>
                      <img className="becomehost__info" src="./images/step3_8img1.png" alt=""/>
                      <span>{this.state.Months[new Date().getMonth()+5]}</span>
                    </div>
                    <div className={this.state.advance_book == "9 months"  ? "modalshow date" : "hide date"}>
                      <img className="becomehost__info" src={this.state.advance_book == "9 months" ? "./images/step3_8img2.png" : "./images/step3_8img1.png"} alt=""/>
                      <span className={this.state.advance_book == "9 months" ? "textpink" : "" }>{this.state.Months[new Date().getMonth()+6]}</span>
                    </div>
                </div>
             </div>
             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_9 &&
          <div className="becomehost-2 container">
          <div className="row Step3_9">
            <div className="col-md-12 col-lg-12 col-sm-12 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>
              {this.datedome()}

              <div className="box row">
                <div className="col-lg-1 preDate">◀</div>
                <div className="col-lg-10 content">
                  <button>Block this month</button>
                  <div className="col-md-12 tbhead">
                    <span>{this.state.Date_month}</span>
                    <p>{this.state.Date_Months}</p>
                    <h2>{this.state.Date_year}</h2>
                  </div>
                  <div className="col-md-12">
                      <DateRangePicker startDate={this.state.checkInDate} startDateId="start_date" endDate={this.state.checkOutDate} endDateId="end_date" onDatesChange={({ startDate, endDate })=> {this.setState({checkInDate: startDate, checkOutDate: endDate });window.searchCondition.checkOutDate = endDate;window.searchCondition.checkInDate = startDate;}} focusedInput={this.state.focusedInput} onFocusChange={focusedInput => this.setState({ focusedInput })} readOnly />                      
                  </div>
                </div>
                <div className="col-lg-1 nextDate">▶</div>
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
          this.state.step === this.STEP.Step3_10 &&
          <div className="becomehost-2 container">
          <div className="row Step3_10">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Let’s talk pricing essentials</h1>


              <div className="box col-md-12">
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img  src="../images/step3_10img3.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>Start by choosing a price range</h3>
                    <p>Factor in things like your location, what you offer as a host, and anything extra that makes your home unique, like a pool table.</p>
                  </div>
                </div>
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img  src="../images/step3_10img2.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>Demand changes, your price should too</h3>
                    <p>Take advantage of high demand during local events and popular times of the year. During low demand, you might want to lower your price to attract more guests, just like hotels do.</p>
                  </div>
                </div>
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img  src="../images/step3_10img.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>We’re here to help</h3>
                    <p>We offer tools to help you do both of these—Smart Pricing will look at demand in your area and help you set the right price for every night.</p>
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
                    <h6>39%</h6>
                    <p>Hosts who use Smart Pricing earn an average of 39% more than hosts who don’t. You can set up Smart Pricing next.</p>
                </div>
             </div>
    

             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_11 &&
          <div className="becomehost-2 container">
          <div className="row Step3_10">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span> 
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>How do you want to set your price?</h1>

              <div className="box col-md-12">
                <div className="boxdiv" onClick={(e) => {if(this.state.Price_demand == 0 )this.setState({Price_demand:1});else this.setState({Price_demand:0});}} >
                  <div className="col-lg-3 pull-left">
                    <img  src="../images/step3_11img1.png" />
                  </div>
                  <div className="col-lg-8 content">
                    <h3>Price adapts to demand</h3>
                    <p>You tell Smart Pricing to automatically adjust your price to match demand, but only within a price range that you</p>
                    <span>RECOMMENDED</span>
                  </div>
                  <div className="col-lg-1 radio">
                    <p><span className={this.state.Price_demand == 1 ?"show":"hide"}></span></p>
                  </div>
                </div>
                <div className="boxdiv" onClick={(e) => {if(this.state.Price_fixed == 0 )this.setState({Price_fixed:1});else this.setState({Price_fixed:0});}} >
                  <div className="col-lg-3 pull-left">
                    <img  src="../images/step3_11img2.png" />
                  </div>
                  <div className="col-lg-8 content">
                    <h3>Price is fixed</h3>
                    <p>Set a base price. PopulStay gives you price tips that you can accept or ignore.</p>
                  </div>
                  <div className="col-lg-1 radio">
                    <p><span className={this.state.Price_fixed == 1 ?"show":"hide"}></span></p>
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
                    <p>The right price can change as the number of searches for listings like yours goes up and down. Whichever price option you choose, you'li get tips to help you set prices for your listing</p>
                </div>
             </div>
    

             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_12 &&
          <div className="becomehost-2 container">
          <div className="row Step3_12">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span> 
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Price your space</h1>

              <div className="box col-md-12">
                <h3>Increase your chances of getting booked</h3>
                <p>Set up Smart Pricing to automatically keep your nightly prices competitive as demand in your area changes.</p>
                
                <div className="Base">
                  <h1>Set up the same base price for each night</h1>
                  <h3>Base Price</h3>
                  <p>If you turn Smart Pricing off for a night,this will be your default price</p>

                  <div className="btn-group col-lg-12 boxdiv">
                    <img className="becomehost__info" src="./images/step3_12img1.png" alt="" />
                    <input type="number" className={this.state.price_perday < 10 || this.state.price_perday >= 13272000000 ? "form-control inputActive" : "form-control"} onChange={(e) => {
                      if(this.state.Currency == "PPS"){
                        this.setState({price_perday:e.target.value,ETHprice_perday:(0.00001*e.target.value),USDprice_perday:(0.01*e.target.value)});
                      }else if(this.state.Currency == "ETH"){
                        this.setState({ETHprice_perday:e.target.value,price_perday:(100000*e.target.value),USDprice_perday:(1000*e.target.value)});
                      } else{
                        this.setState({USDprice_perday:e.target.value,ETHprice_perday:(0.001*e.target.value),price_perday:(100*e.target.value)});
                      } }} />
                  </div>
                  <p className={this.state.price_perday < 10 || this.state.price_perday >= 13272000000 ? "textpink show" : "hide"}>Please use a base price of at least 10PPS but no more than 13,272,000,000PPS</p>
                </div>
                <h2 className="demand">Tip: 114 {this.state.Currency}
                    <img src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>Tips are based on your listing’s qualities, nearby prices and demand</p>
                    </div>
                </h2>
                <h3>Currency</h3>

                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.Currency}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      <li onClick={(e) => this.setState({Currency:"PPS"})}><a>PPS</a></li> 
                      <li onClick={(e) => this.setState({Currency:"ETH"})}><a>ETH</a></li> 
                      <li onClick={(e) => this.setState({Currency:"USD"})}><a>USD</a></li> 
                    </ul>
                  </div>
                </div>

                <h2 onClick={(e) => this.setState({step:this.STEP.Step3_13})}>Set up Smart Pricing<span>RECOMMENDED</span></h2>

              </div>

              
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className={ this.state.price_perday < 10 || this.state.price_perday >= 13272000000 ? "buttonActive Right" : "Right"} disabled={ this.state.price_perday <= 0 || this.state.price_perday >= 13272000000 ? "disabled" : ""} onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>Start with a lower price to attract bookings</h6>
                    <p>New hosts start with a lower price to attract their first few bookings. Hosts who set prices within 5% of price tips are nearly 4x more likely to get booked</p>
                </div>
             </div>
    

             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_13 &&
          <div className="becomehost-2 container">
          <div className="row Step3_12 Step3_13">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span> 
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Price your space</h1>

              <div className="box col-md-12">
                <h3>Increase your chances of getting booked</h3>
                <p>Set up Smart Pricing to automatically keep your nightly prices competitive as demand in your area changes.</p>
                
                <h2>Set up Smart Pricing<span>RECOMMENDED</span></h2>
                
                <div className="Base">
                <h3>Minimum price</h3>
                <p>To help you get booked, your price will move closer to this when demand is low</p>

                <div className="btn-group col-lg-12 boxdiv">
                  <img className="becomehost__info" src="./images/step3_12img1.png" alt="" />
                  <input type="number" className={this.state.minprice_perday < 13 || this.state.minprice_perday >= this.state.price_perday ? "form-control inputActive" : "form-control"} onChange={(e) => {this.setState({minprice_perday:e.target.value});}} value={this.state.minprice_perday}  />
                </div>
                  <p className={this.state.minprice_perday < 13 || this.state.minprice_perday >= this.state.price_perday ? "textpink show" : "hide"}>Please use a base Minimum price of at least PPS13 but no more than PPS13,272,000,000.</p>
                </div>

                <div className="Base">
                <h3>Maximum price</h3>
                <p>To help you earn more, your price will move closer to this when demand is high</p>

                <div className="btn-group col-lg-12 boxdiv">
                  <img className="becomehost__info" src="./images/step3_12img1.png" alt="" />
                  <input type="number" className={this.state.maxprice_perday < this.state.price_perday || this.state.maxprice_perday >= 13272000000 ? "form-control inputActive" : "form-control"} onChange={(e) => {this.setState({maxprice_perday:e.target.value});}} value={this.state.maxprice_perday}  />
                </div>
                  <p className={this.state.maxprice_perday < this.state.price_perday || this.state.maxprice_perday >= 13272000000 ? "textpink show" : "hide"}>Please use a base Maximum price of at least PPS13 but no more than PPS13,272,000,000.</p>
                  <p className={this.state.minprice_perday > this.state.maxprice_perday ? "textpink show" : "hide"}>The highest price should not be lower than the lowest price.</p>
                </div>

                <div className="Base">
                <h3>Base Price</h3>
                <p>If you turn Smart Pricing off for a night,this will be your default price</p>

                <div className="btn-group col-lg-12 boxdiv">
                  <img className="becomehost__info" src="./images/step3_12img1.png" alt="" />
                  <input type="number" className={this.state.price_perday < 10 || this.state.price_perday >= 13272000000 ? "form-control inputActive" : "form-control"} onChange={(e) => {
                      if(this.state.Currency == "PPS"){
                        this.setState({price_perday:e.target.value,ETHprice_perday:(0.00001*e.target.value),USDprice_perday:(0.01*e.target.value)});
                      }else if(this.state.Currency == "ETH"){
                        this.setState({ETHprice_perday:e.target.value,price_perday:(100000*e.target.value),USDprice_perday:(1000*e.target.value)});
                      } else{
                        this.setState({USDprice_perday:e.target.value,ETHprice_perday:(1000*e.target.value),price_perday:(100*e.target.value)});
                      } }} />
                </div>
                <p className={this.state.price_perday < 13 || this.state.price_perday >= 13272000000 ? "textpink show" : "hide"}>Please use a base price of at least $PPS13 but no more than PPS13,272,000,000.</p>
                </div>

                <h2 className="demand">Tip: $114 SGD
                    <img src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>Tips are based on your listing’s qualities, nearby prices and demand</p>
                    </div>
                </h2>

                <h3>Currency</h3>

                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.Currency}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      <li onClick={(e) => this.setState({Currency:"PPS"})}><a>PPS</a></li> 
                      <li onClick={(e) => this.setState({Currency:"ETH"})}><a>ETH</a></li> 
                      <li onClick={(e) => this.setState({Currency:"USD"})}><a>USD</a></li> 
                    </ul>
                  </div>
                </div>

                <p>You’re always in control of your nightly price. By continuing, you agree to turn on Smart Pricing. You can change this later in settings.</p>

                <h2 onClick={(e) => this.setState({step:this.STEP.Step3_12})}>I don’t want my price to adjust with demand</h2>


              </div>

              
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className={ this.state.price_perday < 13 || this.state.price_perday >= 13272000000 || this.state.maxprice_perday < this.state.price_perday || this.state.maxprice_perday >= 13272000000 || this.state.minprice_perday < 13 || this.state.minprice_perday >= this.state.price_perday || this.state.maxprice_perday < this.state.minprice_perday ? "buttonActive Right" : "Right"} disabled={this.state.price_perday < 13 || this.state.price_perday >= 13272000000 || this.state.maxprice_perday < this.state.price_perday || this.state.maxprice_perday >= 13272000000 || this.state.minprice_perday < 13 || this.state.minprice_perday >= this.state.price_perday ? "disabled" : ""}  onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
              <div className="rightdiv">
                 <div className={this.state.Step3_13Actibve ==1 ? 'show' : 'hide'}>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>Increase bookings when demand is low</h6>
                    <p className="step3_13p">Smart Pricing can automatically adjust your nightly price as demand changes based on factors like popular local events, seasonality and weekend vs. weekdays.</p>
                    <ul>
                      <li>
                        <p>Thu</p>
                        <h5>$114</h5>
                        <h5>PPS</h5>
                      </li>
                      <li>
                        <p>Fri</p>
                        <h5>$125</h5>
                        <h5>PPS</h5>
                      </li>
                      <li>
                        <p>Sat</p>
                        <h5>$131</h5>
                        <h5>PPS</h5>
                      </li>
                    </ul>
                    <p>For example, on a day where few people are looking at your space, we’ll drop the price to attract more guests to book with you.</p>
                </div>

                <div className={this.state.Step3_13Actibve == 2 ? 'show' : 'hide'}>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>You’re in control</h6>
                    <p>When you turn on competitive pricing, you set the range you’re willing to charge each night. You can always turn off competitive pricing for specific days in your calendar.</p>
                </div>

                <div className={this.state.Step3_13Actibve == 3 ? 'show' : 'hide'}>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>Start with a lower price to attract bookings</h6>
                    <p>New hosts start with a lower price to attract their first few bookings. Hosts who set prices within 5% of price tips are nearly 4x more likely to get booked.</p>
                </div>

                <div className="step3_13span">
                  <span className={this.state.Step3_13Actibve == 1 ? 'bjpink' : ''} onClick={(e) => this.setState({Step3_13Actibve:1})} ></span>
                  <span className={this.state.Step3_13Actibve == 2 ? 'bjpink' : ''} onClick={(e) => this.setState({Step3_13Actibve:2})}></span>
                  <span className={this.state.Step3_13Actibve == 3 ? 'bjpink' : ''} onClick={(e) => this.setState({Step3_13Actibve:3})}></span>
               </div>
              </div>
                
             </div>


             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_14 &&
          <div className="becomehost-2 container">
          <div className="row Step3_10 Step3_13 Step3_14">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span> 
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Something special for your first guests</h1>

              <div className="box col-md-12">
                <div className="boxdiv" onClick={(e) => {this.setState({first_guests_20:1})}} >
                  <div className="col-lg-9 content">
                    <h3>Offer 20% off to your first guests</h3>
                    <p>The first 3 guests who book your place will get 20% off their stay. This special offer can attract new guests, and help you get the 3 reviews you need for a star rating.</p>
                    <span>RECOMMENDED</span>
                  </div>
                  <div className="col-lg-2 col-lg-push-1 radio">
                    <p><span className={this.state.first_guests_20 == 1 ?"show":"hide"}></span></p>
                  </div>
                </div>
                <div className="boxdiv" onClick={(e) => {this.setState({first_guests_20:0})}} >
                  <div className="col-lg-9 content">
                    <h3>Don’t add a special offer</h3>
                    <p>Once you publish your listing, you won’t be able to add this offer.</p>
                  </div>
                  <div className="col-lg-2 col-lg-push-1 radio">
                    <p><span className={this.state.first_guests_20 == 0 ?"show":"hide"}></span></p>
                  </div>
                </div>
              </div>

              
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
              <div className="rightdiv">
                 <div className={this.state.Step3_13Actibve ==1 ? 'show' : 'hide'}>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>Why add a special offer？</h6>
                    <p className="step3_13p">This will help attract your first guests, and help get your first reviews. Once you get 3 reviews, you’ll get a star rating in search results, which will help your listing stand out. New listings that get booked and reviewed in the first month appear more often in search results and get an average of 3.6x more bookings in their first 3 months</p>
                </div>

                <div className={this.state.Step3_13Actibve == 2 ? 'show' : 'hide'}>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>We’ll share your offer</h6>
                    <p>We’ll let guests who are searching in your area know that they can save 20% if they book your home. This can help get more eyes on your listing, but only the first 3 guests who book will be eligible for the offer.</p>
                </div>

                <div className={this.state.Step3_13Actibve == 3 ? 'show' : 'hide'}>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>First 3 guests can claim your offer</h6>
                    <p>The offer will be available to 3 guests. That way, you can get 3 reviews and your star rating. After 3 guests have claimed your offer, it won’t be valid anymore. If no one claims the offer, it’ll automatically expire after 30 days.</p>
                </div>

                <div className="step3_13span">
                  <span className={this.state.Step3_13Actibve == 1 ? 'bjpink' : ''} onClick={(e) => this.setState({Step3_13Actibve:1})} ></span>
                  <span className={this.state.Step3_13Actibve == 2 ? 'bjpink' : ''} onClick={(e) => this.setState({Step3_13Actibve:2})}></span>
                  <span className={this.state.Step3_13Actibve == 3 ? 'bjpink' : ''} onClick={(e) => this.setState({Step3_13Actibve:3})}></span>
               </div>
              </div>
                
             </div>


             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_15 &&
          <div className="becomehost-2 container">
          <div className="row Step3_15">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span> 
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Length-of-stay prices</h1>

              <div className="box boxdiv col-md-12">
                <p className="p1">Encourage travellers to book longer stays by offering a discount. </p>

                <h3>Weekly discount</h3>
                <div className="Base">
                  <div className="btn-group col-lg-12 boxdiv">
                    <input type="text" placeholder="0 % off" onChange={(e) => {this.setState({discount_Weekly:e.target.value})}} className="form-control" value={this.state.discount_Weekly} />
                  </div>
                </div>

                <h2 className="demand" onClick={(e) => {this.setState({discount_Weekly:21})}}>Tip: 21%</h2>
                <p className="textpink">Travellers searching for stays longer than a week typically book listings with discounts.</p>

                <h3>Monthly discount</h3>

                <div className="Base">
                  <div className="btn-group col-lg-12 boxdiv">
                    <input type="txet" placeholder="0 % off" onChange={(e) => {this.setState({discount_Monthly:e.target.value})}} className="form-control" value={this.state.discount_Monthly} />
                  </div>
                </div>

                <h2 className="demand" onClick={(e) => {this.setState({discount_Monthly:49})}}>Tip: 49%</h2>
                <p className="textpink">68% of travellers staying longer than one month book listings with discounts greater than 20%.</p>

              </div>

              
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <h6>Discount for longer stays</h6>
                    <p>To encourage longer stays, some hosts set a weekly or monthly discount. If you want your listing to appear in searches for reservations of 28 nights or more, set a monthly discount.</p>
                    <p>Weekly discounts will apply to any reservation of 7 to 27 nights.</p>
                </div>
             </div>


             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_16 &&
          <div className="becomehost-2 container">
          <div className="row Step3_10 Step3_16">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span> 
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Based on your settings,  here’s what you could expect</h1>

              <div className="box col-md-12">
                <div className="boxdiv" onClick={(e) => {if(this.state.starting_host == 0 )this.setState({starting_host:1});else this.setState({starting_host:0});}} >
                  <div className="col-lg-1 radio">
                    <p><span className={this.state.starting_host == 1 ?"show":"hide"}></span></p>
                  </div>
                  <div className="col-lg-9  content">
                    <h3>You’re available to host starting {new Date().getDate()+2} {this.state.Months[new Date().getMonth()]}</h3>
                    <p>Lou is planning her trip and thinks your listing is perfect.</p>
                  </div>
                </div>

                <div className="boxdiv" onClick={(e) => {if(this.state.requirements_book == 0 )this.setState({requirements_book:1});else this.setState({requirements_book:0});}} >
                  <div className="col-lg-1 radio">
                    <p><span className={this.state.requirements_book == 1 ?"show":"hide"}></span></p>
                  </div>
                  <div className="col-lg-9  content">
                    <h3>Guests who meet PopulStay requirements can  instantly book.</h3>
                    <p>In addition to meeting guest requirements, Lou agrees to your House Rules.</p>
                  </div>
                </div>

                <div className="boxdiv" onClick={(e) => {if(this.state.confirmation_booking == 0 )this.setState({confirmation_booking:1});else this.setState({confirmation_booking:0});}} >
                  <div className="col-lg-1 radio">
                    <p><span className={this.state.confirmation_booking == 1 ?"show":"hide"}></span></p>
                  </div>
                  <div className="col-lg-9  content">
                    <h3>Guests send a message with their booking  confirmation.</h3>
                    <p>Lou says she’ll be in town for work and she’d love to stay with you.</p>
                  </div>
                </div>

                <div className="boxdiv" onClick={(e) => {if(this.state.Welcome_guests == 0 )this.setState({Welcome_guests:1});else this.setState({Welcome_guests:0});}} >
                  <div className="col-lg-1 radio">
                    <p><span className={this.state.Welcome_guests == 1 ?"show":"hide"}></span></p>
                  </div>
                  <div className="col-lg-9  content">
                    <h3>Welcome guests to your space!</h3>
                    <p>Before Lou arrives, coordinate details like check-in time and key exchange.</p>
                  </div>
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
          this.state.step === this.STEP.Step3_17 &&
          <div className="becomehost-2 container">
          <div className="row Step3_17">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span> 
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Your local laws and taxes</h1>

              <div className="box col-md-12">
                <h3>Make sure you familiarise yourself with your local laws, as well as <span className="textpink">PopulStay’s Nondiscrimination Policy.</span></h3>
                <p>Please educate yourself about the laws in your jurisdiction before listing your space.</p>
                <p>Most cities have rules covering homesharing, and the specific codes and ordinances can appear in many places (such as zoning, building, licensing or tax codes). In most places, you must register, get a permit, or obtain a license before you list your property or accept guests. You may also be responsible for collecting and remitting certain taxes. In some places, short-term rentals could be prohibited altogether.</p>
                <p>Since you are responsible for your own decision to list or book, you should get comfortable with the applicable rules before listing on PopulStay. To get you started, we offer some helpful resources under “Your City Laws.”</p>
                <p>By accepting our Terms of Service and listing your space, you certify that you will follow applicable laws and regulations.</p>
              </div>

              
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-6 col-lg-4 col-md-push-1 col-sm-6 paddingNone">
                <img className="stepbg" src="../images/step3_17img.png" alt=""/>
            </div>



             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_18 &&
          <div className="becomehost-2 container">
          <div className="row Step3_18">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <h1>You’re ready to publish!</h1>

              <h3>Do you want to generate Smart Contract</h3>
             
             <div className="row">
               
              <div className="col-lg-1" onClick={(e) => {if(this.state.generate_smart_contract ==0 )this.setState({generate_smart_contract:1});else this.setState({generate_smart_contract:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.generate_smart_contract ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Generate Smart Contract</p>
                </div>
             </div>




              <div className="box col-md-12">
                <p>You’ll be able to welcome your first guest starting 1 May 2018. If you’d like to update your calendar or house rules, you can easily do all that after you hit publish.</p>
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.submit}>Publish listing</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Edit Listing</button>
                
              </div>

               
             </div>
             <Modal isOpen={this.state.modalsubmit} onRequestClose={this.closeModal} style={customStyles} 
              contentLabel="Example Modal">
                <div className="submit">
                    <h2>Processing your submit</h2>
                    <br/>
                    <h2>Please stand by<span className="glyphicon glyphicon-refresh"></span></h2>
                </div>
              </Modal>

             <div className="col-md-6 col-lg-5 col-sm-6 paddingNone" onClick={this.preStep}>
                  <img className="stepbg" src="../images/step3_18img.png" alt=""/>
                  <div className="Preview">
                    <img src="./images/becomehost-step5-preview.jpg" />
                    <p>Place name</p>
                    <h6>Preview</h6>
                  </div>
              </div>



             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_19 &&

          <div className="becomehost-5 container">
          <div className="row Step1_10 Step3_19">
          <div className="col-md-6 col-lg-7 col-sm-6">
            <h1>You’re ready to publish!</h1>
            <h3>You’ll be able to welcome your first guest starting 1 May 2018. If you’d like to update your calendar or house rules, you can easily do all that after you hit publish.</h3>
            <div className="change">
                <div>
                  <p>Bedrooms,beds,amenities,and more</p>
                  <p className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step1_1})}>change</p>
                </div>
                <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
            </div>

            <div className="change">
                <div>
                  <p>Photos, short description, title</p>
                  <p className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step2_1})}>change</p>
                </div>
                <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
            </div>

            <div className="change">
                <div>
                  <p>Booking settings, calendar, price</p>
                  <p className="textpink" onClick={(e) => this.setState({step:this.STEP.Step3_1})}>change</p>
                </div>
                <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
            </div>

            <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.submit}>Publish listing</button>

          </div>
          <Modal isOpen={this.state.modalsubmit} onRequestClose={this.closeModal} style={customStyles} 
          contentLabel="Example Modal">
            <div className="submit">
                <h2>Processing your submit</h2>
                <h2>Please stand by<span className="glyphicon glyphicon-refresh"></span></h2>
            </div>
          </Modal>
          <div className="col-md-6 col-lg-5 col-sm-6 paddingNone" onClick={this.preStep}>
              <img className="stepbg" src="../images/step3_18img.png" alt=""/>
              <div className="Preview">
                <img src="./images/becomehost-step5-preview.jpg" />
                <p>Place name</p>
                <h6>Preview</h6>
              </div>
          </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.Step3_20 &&
          <div className="becomehost-2 container">
          <div className="row Step3_20">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <h1>Before you make the switch</h1>



              <div className="box col-md-12">
                <p> Hosts who allow guests to book instantly enjoy the  following perks:</p>
                <div className="boxdiv">
                  <div className="col-lg-2 pull-left">
                    <img  src="../images/step3_20img1.png" />
                  </div>
                  <div className="col-lg-9 content">
                    <h3>Increased earnings</h3>
                    <p>Guests love booking instantly, so hosts often get double the reservations.</p>
                  </div>
                </div>
                <div className="boxdiv" >
                  <div className="col-lg-2 pull-left">
                    <img  src="../images/step3_20img2.png" />
                  </div>
                  <div className="col-lg-9 content">
                    <h3>Search boost</h3>
                    <p>On average, Singapore hosts who let guests book instantly got 123% more search views in the past month.</p>
                  </div>
                </div>
                <div className="boxdiv">
                  <div className="col-lg-2 pull-left">
                    <img  src="../images/step3_20img3.png" />
                  </div>
                  <div className="col-lg-9 content">
                    <h3>More control</h3>
                    <p>You can require government-issued ID or positive reviews from other hosts.the reservations.</p>
                  </div>
                </div>
              </div>
              
              <div className="STEPBTN">
                <span className="Left">Allow instant booking</span>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/step3_4img4.png" alt=""/>
                    <h6>Ultimate host protection</h6>
                    <p>You can <h6>cancel any reservations</h6> penalty-free if you're uncomfortable with a reservation. You also have access to <h6>24/7 customer support</h6> and PopulStay's <h6>S1, 200,000 SGD Host Guarantee.</h6></p>
                </div>
             </div>
    
             
             </div>
             </div>
        }

        {
          this.state.step === this.STEP.Step3_21 &&
          <div className="becomehost-2 container">
          <div className="row Step3_21">
            <div className="col-md-8 col-lg-7 col-sm-8 ">
              <h1>Are you sure you want all guests to  send requests?</h1>



              <div className="box col-md-12">
                <p className="p1">Check the boxes to confirm you understand: </p>

                <div  onClick={(e) => {if(this.state.hours_respond ==0 )this.setState({hours_respond:1});else this.setState({hours_respond:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.hours_respond ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">You’ll only have 24 hours to respond to  requests without penalty</p>
                </div>

                <div  onClick={(e) => {if(this.state.listing_lower ==0 )this.setState({listing_lower:1});else this.setState({listing_lower:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.listing_lower ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Your listing will be ranked lower in search, so you may get fewer reservations</p>
                </div>

                <div  onClick={(e) => {if(this.state.uncomfortable_controls ==0 )this.setState({uncomfortable_controls:1});else this.setState({uncomfortable_controls:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.uncomfortable_controls ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">You’ll lose some host protection and controls, including penalty-free cancellations if you’re uncomfortable with a reservation</p>
                </div>

                <p>Did you know?  On average, Singapore hosts who let guests book instantly got 123% more search views in the past month.</p>

                <h2>Allow qualified guests to book instantly</h2>
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
