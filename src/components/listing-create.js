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
            Categorys:['Whole house','Private Room','Share Room'],
            step1guests:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
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
            Countrys:["Angola","Afghanistan","Albania","Algeria","Anguilla","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda. ","Bolivia","Botswana","Brunei "," Bulgaria","Bulgaria","Burkina"," Burma"," Burundi ","Canada","the Central African Republic","Chad","Bolivia","Columbia","Congo","the Cook islands","Costa Rica","Cuba","Czech","Denmark","Denmark","Djibouti","Djibouti","Ecuador","Salvatore","Estonia ","Ethiopia","Fiji","Finland","French","French Guiana","Gabon"," Georgia "," German "," Garner "," Gibraltar "," Greece","Grenada","Guam "," Guatemala"," Guinea "," Guyana "," Haiti,"," Honduras,","Honduras","Hongkong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kazakhstan","Kenya","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Italy","Liechtenstein","Lithuania","Macao","Madagascar","Mawlawi","Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Mont salad","Morocco","Mozambique","Malta","Neo","Nepal","New Zealand","New Zealand","Nicaragua "," Niger"," Nigeria "," Norway ","Oman","Pakistan "," Papua New Guinea","Paraguay","Peru","Philippines","Poland","French Polynesia","Portuguese"," Puerto Rico "," Qatar "," Russia "," Saint Lucia ","St. Lucia","Saint Mari"," St. Mari "," Sao Tome and Principe "," Sao Tome and Principe "," Senegal","Seychelles"," Sierra Leone"," Singapore ","Slovakia"," Slovenia "," Somalia","South Africa","Senegal","Sri Lanka","Sultan"," Swaziland "," Sweden "," Switzerland"," the Swiss "," the Taiwan Province","the Taiwan Province","Tajikistan","the Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Turkey"],
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
            National_name:["Angola-安哥拉-0244","Afghanistan-阿富汗-93","Albania-阿尔巴尼亚-335","Algeria-阿尔及利亚-213","Andorra-安道尔共和国-376","Anguilla-安圭拉岛-1254","Antigua and Barbuda-安提瓜和巴布达-1268","Argentina-阿根廷-54","Armenia-亚美尼亚-374","Ascension-阿森松-247","Australia-澳大利亚-61","Austria-奥地利-43","Azerbaijan-阿塞拜疆-994","Bahamas-巴哈马-1242","Bahrain-巴林-973","Bangladesh-孟加拉国-880","Barbados-巴巴多斯-1246","Belarus-白俄罗斯-375","Belgium-比利时-32","Belize-伯利兹-501","Benin-贝宁-229","Bermuda Is-百慕大群岛-1441","Bolivia-玻利维亚-591","Botswana-博茨瓦纳-267","Brazil-巴西-55","Brunei-文莱-673","Bulgaria-保加利亚-359","Burkina Faso-布基纳法索-226","Burma-缅甸-95","Burundi-布隆迪-257","Cameroon-喀麦隆-237","Canada-加拿大-1","Cayman Is-开曼群岛-1345","Central African Republic-中非共和国-236","Chad-乍得-235","Chile-智利-56","China-中国-86","Colombia-哥伦比亚-57","Congo-刚果-242","Cook Is-库克群岛-682","Costa Rica-哥斯达黎加-506","Cuba-古巴-53","Cyprus-塞浦路斯-357","Czech Republic-捷克-420","Denmark-丹麦-45","Djibouti-吉布提-253","Dominica Rep-多米尼加共和国-1890","Ecuador-厄瓜多尔-593","Egypt-埃及-20","EI Salvador-萨尔瓦多-503","Estonia-爱沙尼亚-372","Ethiopia-埃塞俄比亚-251","Fiji-斐济-679","Finland-芬兰-358","France-法国-33","French Guiana-法属圭亚那-594","French Polynesia-法属玻利尼西亚-689","Gabon-加蓬-241","Gambia-冈比亚-220","Georgia-格鲁吉亚-995","Germany-德国-49","Ghana-加纳-233","Gibraltar-直布罗陀-350","Greece-希腊-30","Grenada-格林纳达-1809","Guam-关岛-1671","Guatemala-危地马拉-502","Guinea-几内亚-224","Guyana-圭亚那-592","Haiti-海地-509","Honduras-洪都拉斯-504","Hongkong-香港-852","Hungary-匈牙利-36","Iceland-冰岛-354","India-印度-91","Indonesia-印度尼西亚-62","Iran-伊朗-98","Iraq-伊拉克-964","Ireland-爱尔兰-353","Israel-以色列-972","Italy-意大利-39","Ivory Coast-科特迪瓦-225","Jamaica-牙买加-1876","Japan-日本-81","Jordan-约旦-962","Kampuchea (Cambodia )-柬埔寨-855","Kazakstan-哈萨克斯坦-327","Kenya-肯尼亚-254","Korea-韩国-82","Kuwait-科威特-965","Kyrgyzstan-吉尔吉斯坦-331","Laos-老挝-856","Latvia-拉脱维亚-371","Lebanon-黎巴嫩-961","Lesotho-莱索托-266","Liberia-利比里亚-231","Libya-利比亚-218","Liechtenstein-列支敦士登--423","Lithuania-立陶宛-370","Luxembourg-卢森堡-352","Macao-澳门-853","Madagascar-马达加斯加-261","Malawi-马拉维-265","Malaysia-马来西亚-60","Maldives-马尔代夫-960","Mali-马里-223","Malta-马耳他-356","Mariana Is-马里亚那群岛-1670","Martinique-马提尼克-596","Mauritius-毛里求斯-230","Mexico-墨西哥-52","Moldova-摩尔多瓦-373","Monaco-摩纳哥-377","Mongolia-蒙古-976","Montserrat Is-蒙特塞拉特岛-1664","Morocco-摩洛哥-212","Mozambique-莫桑比克-258","Namibia-纳米比亚-264","Nauru-瑙鲁-674","Nepal-尼泊尔-977","Netheriands Antilles-荷属安的列斯-599","Netherlands-荷兰-31","New Zealand-新西兰-64","Nicaragua-尼加拉瓜-505","Niger-尼日尔-227","Nigeria-尼日利亚-234","North Korea-朝鲜-850","Norway-挪威-47","Oman-阿曼-968","Pakistan-巴基斯坦-92","Panama-巴拿马-507","Papua New Cuinea-巴布亚新几内亚-675","Paraguay-巴拉圭-595","Peru-秘鲁-51","Philippines-菲律宾-63","Poland-波兰-48","Portugal-葡萄牙-351","Puerto Rico-波多黎各-1787","Qatar-卡塔尔-974","Reunion-留尼旺-262","Romania-罗马尼亚-40","Russia-俄罗斯-7","Saint Lueia-圣卢西亚-1758","Saint Vincent-圣文森特岛-1784","Samoa Eastern-东萨摩亚(美)-684","Samoa Western-西萨摩亚-685","San Marino-圣马力诺-378","Sao Tome and Principe-圣多美和普林西比-239","Saudi Arabia-沙特阿拉伯-966","Senegal-塞内加尔-221","Seychelles-塞舌尔-248","Sierra Leone-塞拉利昂-232","Singapore-新加坡-65","Slovakia-斯洛伐克-421","Slovenia-斯洛文尼亚-386","Solomon Is-所罗门群岛-677","Somali-索马里-252","South Africa-南非-27","Spain-西班牙-34","SriLanka-斯里兰卡-94","St.Lucia-圣卢西亚-1758","St.Vincent-圣文森特-1784","Sudan-苏丹-249","Suriname-苏里南-597","Swaziland-斯威士兰-268","Sweden-瑞典-46","Switzerland-瑞士-41","Syria-叙利亚-963","Taiwan-台湾省-886","Tajikstan-塔吉克斯坦-992","Tanzania-坦桑尼亚-255","Thailand-泰国-66","Togo-多哥-228","Tonga-汤加-676","Trinidad and Tobago-特立尼达和多巴哥-1809","Tunisia-突尼斯-216","Turkey-土耳其-90","Turkmenistan-土库曼斯坦-993","Uganda-乌干达-256","Ukraine-乌克兰-380","United Arab Emirates-阿拉伯联合酋长国-971","United Kiongdom-英国-44","United States of America-美国-1","Uruguay-乌拉圭-598","Uzbekistan-乌兹别克斯坦-233","Venezuela-委内瑞拉-58","Vietnam-越南-84","Yemen-也门-967","Yugoslavia-南斯拉夫-381","Zimbabwe-津巴布韦-263","Zaire-扎伊尔-243","Zambia-赞比亚-260"],
            Howoften_Froms:["flexible","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00(morrow)"],
            Howoften_Tos:["flexible","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00(morrow)"],
            languagelist:{},

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
        
        this.setState({
            state:this.state.languagelist=window.languagelist,
            account: window.address,
            id: window.address,
            state:this.state.roomtype_category=this.state.languagelist.Whole_house,
            Categorys:[this.state.languagelist.Whole_house,this.state.languagelist.Private_Room,this.state.languagelist.Share_Room],
            state:this.state.roomtype_location=this.state.languagelist.TOKYO,
            state:this.state.roomdescription_homeorhotel=this.state.languagelist.Please_choose,
            state:this.state.roomdescription_type=this.state.languagelist.Please_choose,
            state:this.state.roomdescription_guests_have=this.state.languagelist.Please_choose,
            homeorhotels:[
                this.state.languagelist.apartment,
                this.state.languagelist.Single_house,
                this.state.languagelist.Subsidiary_unit,
                this.state.languagelist.Characteristic_house,
                this.state.languagelist.Breakfast_and_Breakfast,
                this.state.languagelist.The_Inn_Boutique_and_other_types
            ],
            types:[
                this.state.languagelist.Single_room,
                this.state.languagelist.double_room,
                this.state.languagelist.family_suite,
                this.state.languagelist.business_suite
            ],
            guestshaves:[
                this.state.languagelist.Entire_place,
                this.state.languagelist.Private_room,
                this.state.languagelist.Shared_room
            ]
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
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>Is the pin in the right place?</h1>
              <h2>If needed,you can drag the pin to adjust its location. Only confirmed guests will see this,so they know how to get to your place.</h2>
              <p>191A Rivervale Drive #11-1318,Singapore,541189,Singapore</p>
              
              <div className="Map">
                <img src="./images/search-map.jpg" />
              </div>




            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
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
                <p>Step 1: Start with the basics</p>
              </div>

              <h1>What amenities do you offer?</h1>

             <div className="Stepbox">

                 <div onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                  <p className="Pinput" >
                    <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <div className="divinput">
                    <p>Essentials</p>
                    <p>Towels,bed sheets,soap,toilet paper,and pillows</p>
                  </div>
                </div>

                <div  onClick={(e) => {if(this.state.roomstuff_Shampoo ==0 )this.setState({roomstuff_Shampoo:1});else this.setState({roomstuff_Shampoo:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Shampoo ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Shampoo</p> 
                 
                </div>

                <div  onClick={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Closet_drwers ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Closet/drawers</p> 
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_TV ==0 )this.setState({roomstuff_TV:1});else this.setState({roomstuff_TV:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_TV ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">TV</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_Heat ==0 )this.setState({roomstuff_Heat:1});else this.setState({roomstuff_Heat:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_Heat ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Heat</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_aircondition ==0 )this.setState({roomstuff_aircondition:1});else this.setState({roomstuff_aircondition:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_aircondition ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Air conditioning</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_breakfastcoffetea ==0 )this.setState({roomstuff_breakfastcoffetea:1});else this.setState({roomstuff_breakfastcoffetea:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_breakfastcoffetea ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Breakfast,coffe,tea</p>
                  
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_desk_workspace ==0 )this.setState({roomstuff_desk_workspace:1});else this.setState({roomstuff_desk_workspace:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_desk_workspace ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Desk/workspace</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_fireplace ==0 )this.setState({roomstuff_fireplace:1});else this.setState({roomstuff_fireplace:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_fireplace ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Fireplace</p>
                  </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_iron ==0 )this.setState({roomstuff_iron:1});else this.setState({roomstuff_iron:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_iron ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Iron</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_hairdryer ==0 )this.setState({roomstuff_hairdryer:1});else this.setState({roomstuff_hairdryer:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_hairdryer ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Hair dryer</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_petsinhouse ==0 )this.setState({roomstuff_petsinhouse:1});else this.setState({roomstuff_petsinhouse:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_petsinhouse ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Pets in the house</p>
                </div>
                  <div onClick={(e) => {if(this.state.roomstuff_private_entrance ==0 )this.setState({roomstuff_private_entrance:1});else this.setState({roomstuff_private_entrance:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_private_entrance ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Private entrance</p>
                </div>

                <h1>Safety amenities</h1>
                 <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0,roomstuff_smartpincode_password:'',roomstuff_smartpincode_confirmpassword :''});}}>
                      <img className={this.state.roomstuff_smartpincode ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
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
                      <img className={this.state.roomstuff_smoke_detector ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Smoke detector</p>
                </div>
          </div>

              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
              </div>
              <div className="col-md-5 col-lg-4  col-sm-12 paddingNone rightbox">
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
              <div className="col-md-7 col-lg-7 col-sm-12 ">
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
                      <img className={this.state.roomstuff_Pool ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Pool</p> 
                </div>

                <div onClick={(e) => {if(this.state.roomstuff_kitchen ==0 )this.setState({roomstuff_kitchen:1});else this.setState({roomstuff_kitchen:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_kitchen ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">kitchen</p> 
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_washer ==0 )this.setState({roomstuff_washer:1});else this.setState({roomstuff_washer:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_washer ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Laundry - washer</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_dryer ==0 )this.setState({roomstuff_dryer:1});else this.setState({roomstuff_dryer:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_dryer ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Laundry - dryer</p>
                </div>


                  <div onClick={(e) => {if(this.state.roomstuff_Park ==0 )this.setState({roomstuff_Park:1});else this.setState({roomstuff_Park:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Park ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Park</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_Lift ==0 )this.setState({roomstuff_Lift:1});else this.setState({roomstuff_Lift:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Lift ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Lift</p>
                  
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_HotTub ==0 )this.setState({roomstuff_HotTub:1});else this.setState({roomstuff_HotTub:0});}}>
                  <p  className="Pinput" >
                      <img className={this.state.roomstuff_HotTub ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Hot tub</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_Gym ==0 )this.setState({roomstuff_Gym:1});else this.setState({roomstuff_Gym:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Gym ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Gym</p>
                  </div>
            </div>
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
              </div>

              <div className="col-md-5 col-lg-4 col-sm-12 paddingNone rightbox">
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

          <div className="becomehost-2 container">
          <div className="row Step1_10">
          <div className="col-md-7 col-lg-7 col-sm-12">
          <h1>Great process {this.state.user}!</h1>
          <h3>Now let's get some details about your place so you can publish your listings </h3>
          <div className="change">
              <div>
                <p>Bedrooms,beds,amenities,and more</p>
                <p className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step1_1})}>change</p>
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
              
              <div className="photos" onChange={(e) => this.setState({step:this.STEP.Step2_2})}>
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
                    <div className="modal-footer"vz>
                      <ul className={this.state.modalset == 0 ? "Set modalshow" : "Set hide"}>
                          <li onClick={(e) => this.setState({modalset:1})}><img src="../images/crop.png" />Crop</li>
                          <li onClick={(e) => this.setState({modalset:2})}><img src="../images/Brightness.png" />Adjust Brightness</li>
                          <li onClick={(e) => this.setState({canvasRotate:this.state.canvasRotate+90})}><img src="../images/Rotate.png" />Rotate</li>
                      </ul>
                      <ul className={this.state.modalset != 0 ? "Brightness show" : "Brightness hide"}>
                          <li  className={this.state.modalset == 1 ? "show" : "hide"}>
                              <p>Zoom</p>
                              <input type="range" onChange={(e)=>this.setState({canvasScale:e.target.value})} name="points"  step="0.01" min="0.5" max="2" />
                          </li>
                          <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                              <p>Brightness</p>
                              <input type="range" onChange={(e)=>this.BrightnessPictures(e.target.value)} name="points" step="0.01" min="-1" max="1" />
                          </li>
                          <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                              <p>Contrast Ratio</p>
                              <input type="range" name="points" step="0.02" min="1" max="3" />
                          </li>
                      </ul>
                      <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Cancel show" : "btn Cancel hide"} type="button">Cancel</button>
                      <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Complete show" : "btn Complete hide"} type="button" >Complete</button>
                      <button  className={this.state.modalset == 0 ? "btn Replace show" : "btn Replace hide"} data-dismiss="modal" aria-hidden="true" type="button" onClick={(e)=>this.onClickSave(e)}>Save and Replace</button>
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
            <div className="col-md-8 col-lg-7 col-sm-8 ">
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

              <div className="stepbox">  
                <div onClick={(e) => {if(this.state.roomstuff_withKids ==0 )this.setState({roomstuff_withKids:1});else this.setState({roomstuff_withKids:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_withKids ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Family (with kids)</p>
                </div>

                  <div onClick={(e) => {if(this.state.roomstuff_BigGroups ==0 )this.setState({roomstuff_BigGroups:1});else this.setState({roomstuff_BigGroups:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_BigGroups ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Big groups</p>
                  
                </div>

                  <div  onClick={(e) => {if(this.state.roomstuff_pets ==0 )this.setState({roomstuff_pets:1});else this.setState({roomstuff_pets:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_pets ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
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
                <button className={ this.state.roomdescription_description == "" ? "buttonActive Right" : "Right"} disabled={ this.state.roomdescription_description == "" ? "disabled" : ""} onClick={this.nextStep}>Next</button>
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
                <button className={ this.state.roomdescription_title == "" || this.state.roomdescription_title.length > 50 ? "buttonActive Right" : "Right"} disabled={ this.state.roomdescription_title == "" || this.state.roomdescription_title.length > 50 ? "disabled" : ""} onClick={this.nextStep}>Next</button>
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
                <div className="stepbox">
                <div className="phoneimg"><img className="becomehost__info" src="./images/phoneimg.png" alt=""/></div>

                <div className="btn-group col-md-12 phonecode">
                  <span data-toggle="dropdown">+{this.state.roomstuff_AreaCode}</span>
                  <ul className="dropdown-menu" role="menu">
                    {this.state.National_name.map((item,index) => (
                        <li><a onClick={(e)=>this.setState({roomstuff_AreaCode:(item.split('-')[2])})} >+{(item.split('-')[2])}</a></li>
                      ))
                    }
                  </ul>
                </div>
                
                <input onChange={(e) => this.phonenumber(e.target.value)} value={this.state.roomdescription_phone}  type="text" />

                <img className={this.state.phoneactive == 1 ? "show" : "hide"} src="./images/landloard_page-30.png" alt=""/>
              </div>
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className={ this.state.phoneactive == 0 ? "buttonActive Right" : "Right"} disabled={ this.state.phoneactive == 0 ? "disabled" : ""} onClick={this.nextStep}>Next</button>
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
          <h1>Great process {this.state.user}!</h1>
          <h3>Now let's get some details about your place so you can publish your listings </h3>
          <div className="change">
              <div>
                <p>Bedrooms,beds,amenities,and more</p>
                <p className="textpink" onClick={(e) => this.setState({step:this.STEP.Step1_1})}>change</p>
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

          <div className="Step2box">
            <p className="Step2">Step 3</p>
            <h2>Get ready for guests</h2>
            <p className="Set">Booking settings, calendar, price</p>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.nextStep}>Continue</button>
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
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Review PopulStay’s guest requirements</h1>


              <div className="box col-md-12">
                <h3>All PopulStay guests must provide:</h3>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Email ==0 )this.setState({roomdescription_Email:1});else this.setState({roomdescription_Email:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Email == 1 ?"show":"hide"}></span></p>Email address</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Confirmedphone ==0 )this.setState({roomdescription_Confirmedphone:1});else this.setState({roomdescription_Confirmedphone:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Confirmedphone == 1 ?"show":"hide"}></span></p>Confirmed phone number</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_information ==0 )this.setState({roomdescription_information:1});else this.setState({roomdescription_information:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_information == 1 ?"show":"hide"}></span></p>Payment information</label>
                </div>

                <h3>Before booking your home, each guest must:</h3>
                <div className="radio"  onClick={(e) => {if(this.state.roomdescription_Rules ==0 )this.setState({roomdescription_Rules:1});else this.setState({roomdescription_Rules:0});}}>
                  <label className="text-muted"><p><span className={this.state.roomdescription_Rules == 1 ?"show":"hide"}></span></p>Agree to your House Rules</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Message ==0 )this.setState({roomdescription_Message:1});else this.setState({roomdescription_Message:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Message == 1 ?"show":"hide"}></span></p>Message you about their trip</label>
                </div>
                <div className="radio"  onClick={(e) => {if(this.state.roomdescription_manyguests ==0 )this.setState({roomdescription_manyguests:1});else this.setState({roomdescription_manyguests:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_manyguests == 1 ?"show":"hide"}></span></p>Let you know how many guests are coming</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Confirmtime ==0 )this.setState({roomdescription_Confirmtime:1});else this.setState({roomdescription_Confirmtime:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Confirmtime == 1 ?"show":"hide"}></span></p>Confirm their check-in time if they’re arriving within 2 days</label>
                </div>

                <h3 className="textpink">Add additional requirements</h3>
                <div className="check" onClick={(e) => {if(this.state.roomstuff_submittedPopulStay ==0 )this.setState({roomstuff_submittedPopulStay:1});else this.setState({roomstuff_submittedPopulStay:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_submittedPopulStay ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">government-issued ID submitted to PopulStay</p>
                </div>
                <div className="check" onClick={(e) => {if(this.state.roomstuff_Recommended ==0 )this.setState({roomstuff_Recommended:1});else this.setState({roomstuff_Recommended:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Recommended ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Recommended by other hosts and have no negative reviews</p>
                </div>
                <h6>More requirements can mean fewer reservations.</h6>
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>You need to feel confident with every reservation. That’s why we require certain information from every guest before they can book. </p>
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
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Set house rules for your guests</h1>


              <div className="box col-md-10">
                <div className="check" onClick={(e) => {if(this.state.rules_children ==0 )this.setState({rules_children:1});else this.setState({rules_children:0});}}>
                  <p className="divinput">Suitable for children (2-12 years)
                    <span><img className="Promptimg" src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>You can say your listing isn’t suitable for infants or children if there are features that are dangerous for children or there’s a risk of property damage. If you decide to restrict guests with infants or children from booking, add an explanation so guests can understand why your listing isn’t suitable for their trip.</p>
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
                  <h3>Explain why your listing isn’t  suitable for children</h3>
                  <p>What features of your space might be dangerous to  children or easily damaged?</p>
                  <textarea onChange={(e)=>this.setState({Explainwhy:e.target.value})}></textarea>
                  <button className="Done" onClick={(e) => {this.closeModal(e)}} >Done</button>
                  <button className="Cancel" onClick={(e) => {this.closeModal(e)}} >Cancel</button>
                </div>  
                </Modal>

                <div className="check" onClick={(e) => {if(this.state.rules_infants ==0 )this.setState({rules_infants:1});else this.setState({rules_infants:0});}}>
                  <p className="divinput">Suitable for infants (Under 2 years)
                    <span><img className="Promptimg" src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>You can say your listing isn’t suitable for infants or children if there are features that are dangerous for children or there’s a risk of property damage. If you decide to restrict guests with infants or children from booking, add an explanation so guests can understand why your listing isn’t suitable for their trip.</p>
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
                  <p className="divinput">Suitable for pets
                    <span><img className="Promptimg" src="../images/Prompt.png" />
                    <div className="rightbox1">
                      <p><span>▲</span>You can limit guests from bringing pets, but assistance animals—for example, seeing eye dogs—aren’t considered pets. You have to reasonably accommodate reservations where a guest might bring an assistance animal, even if your listing or House Rules state “no pets.”Learn more</p>
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
                  <p className="divinput">Smoking allowed</p>
                  <p  className="Pinput">
                      <img className={this.state.rules_Smoking ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_Smoking ==0 ? 'show' : 'hide'} src="../images/checkcuo.png" alt=""/>
                  </p>
                </div>
                <div className="check" onClick={(e) => {if(this.state.rules_parties ==0 )this.setState({rules_parties:1});else this.setState({rules_parties:0});}}>
                  <p className="divinput">Events or parties allowed</p>
                  <p  className="Pinput">
                      <img className={this.state.rules_parties ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p  className="Pinput">
                      <img className={this.state.rules_parties ==0 ? 'show' : 'hide'} src="../images/checkcuo.png" alt=""/>
                  </p>
                </div>

                <h4>Additional rules</h4>
                {this.state.AdditionalRules.map((Rules,index) => (
                  <h3>{Rules}<span data-index={index} onClick={this.deleteRules.bind(this,index)}>×</span></h3>
                  ))
                }
                <form onSubmit={(e)=>this.AdditionalRules(e)}>
                  <div className="add">
                    <input type="text" onChange={(e)=>this.setState({RulesIpt:e.target.value})} placeholder="Quiet hours? No shoes in the house?" value={this.state.RulesIpt} />
                    <button type="submit">Add</button>
                  </div>
                </form>

                <h4 className={this.state.guests_know == 0 ? "textpink":""} onClick={(e)=>this.setState({guests_know:1})}>Details guests must know about your home</h4>
                <div className={this.state.guests_know == 0 ? "hide":"show"}>
                  <div className="check1" onClick={(e) => {if(this.state.climb_stairs ==0 )this.setState({climb_stairs:1});else this.setState({climb_stairs:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.climb_stairs ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">Must climb stairs</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.Potential_noise ==0 )this.setState({Potential_noise:1});else this.setState({Potential_noise:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.Potential_noise ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">Potential for noise</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_Pet ==0 )this.setState({property_Pet:1});else this.setState({property_Pet:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_Pet ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">Pet(s) live on property</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_parking ==0 )this.setState({property_parking:1});else this.setState({property_parking:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_parking ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">No parking on property</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.shared_spaces ==0 )this.setState({shared_spaces:1});else this.setState({shared_spaces:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.shared_spaces ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">Some spaces are shared</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.Amenity_limitations ==0 )this.setState({Amenity_limitations:1});else this.setState({Amenity_limitations:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.Amenity_limitations ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">Amenity limitations</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_recording ==0 )this.setState({property_recording:1});else this.setState({property_recording:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_recording ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">D Survellance or recording devices on property</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_Weapons ==0 )this.setState({property_Weapons:1});else this.setState({property_Weapons:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_Weapons ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">Weapons on property</p>
                  </div>
                  <div className="check1" onClick={(e) => {if(this.state.property_animals ==0 )this.setState({property_animals:1});else this.setState({property_animals:0});}}>
                    <p  className="Pinput">
                        <img className={this.state.property_animals ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                    </p>
                    <p className="divinput">Dangerous animals on property</p>
                  </div>
                </div>
                
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-12 paddingNone rightbox">
                 <div>
                    <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                    <p>In addition to PopulStay’s requirements, guests must agree to all your House Rules before they book.</p>
                    <p>If you’re ever uncomfortable with a reservation, you can cancel penalty-free before or during a trip.</p>
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
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Review PopulStay guest requirements</h1>


              <div className="box col-md-12">
                <h3>All PopulStay guests must provide:<span className="textpink" >Review</span></h3>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Email ==0 )this.setState({roomdescription_Email:1});else this.setState({roomdescription_Email:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Email == 1 ?"show":"hide"}></span></p>Email address</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.roomdescription_Confirmedphone ==0 )this.setState({roomdescription_Confirmedphone:1});else this.setState({roomdescription_Confirmedphone:0});}} >
                  <label className="text-muted"><p><span className={this.state.roomdescription_Confirmedphone == 1 ?"show":"hide"}></span></p>Confirmed phone number</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.Payment_information ==0 )this.setState({Payment_information:1});else this.setState({Payment_information:0});}} >
                  <label className="text-muted"><p><span className={this.state.Payment_information == 1 ?"show":"hide"}></span></p>Payment information</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.guest_message ==0 )this.setState({guest_message:1});else this.setState({guest_message:0});}} >
                  <label className="text-muted"><p><span className={this.state.guest_message == 1 ?"show":"hide"}></span></p>A message about the guest’s trip</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.last_time ==0 )this.setState({last_time:1});else this.setState({last_time:0});}} >
                  <label className="text-muted"><p><span className={this.state.last_time == 1 ?"show":"hide"}></span></p>Check-in time for last minute trips</label>
                </div>

                <h3>Your additional requirements<span className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step3_2})}>Edit</span></h3>
                <div className="radio"  onClick={(e) => {if(this.state.governmentissued_ID ==0 )this.setState({governmentissued_ID:1});else this.setState({governmentissued_ID:0});}}>
                  <label className="text-muted"><p><span className={this.state.governmentissued_ID == 1 ?"show":"hide"}></span></p>Submit a government-issued ID to PopulStay</label>
                </div>

                <h3>Your House Rules<span className="textpink"  onClick={(e) => this.setState({step:this.STEP.Step3_2})}>Edit</span></h3>
                <div className="radio" onClick={(e) => {if(this.state.Not_safe ==0 )this.setState({Not_safe:1});else this.setState({Not_safe:0});}} >
                  <label className="text-muted"><p><span className={this.state.Not_safe == 1 ?"show":"hide"}></span></p>Not safe or suitable for children (2-12 years)</label>
                </div>
                <div className="radio"  onClick={(e) => {if(this.state.anytime_Checkin ==0 )this.setState({anytime_Checkin:1});else this.setState({anytime_Checkin:0});}} >
                  <label className="text-muted"><p><span className={this.state.anytime_Checkin == 1 ?"show":"hide"}></span></p>Check-in is anytime after 3PM</label>
                </div>
                <div className="radio" onClick={(e) => {if(this.state.NO_shoes ==0 )this.setState({NO_shoes:1});else this.setState({NO_shoes:0});}} >
                  <label className="text-muted"><p><span className={this.state.NO_shoes == 1 ?"show":"hide"}></span></p>NO shoes in the house</label>
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
                    <p>Guests will only be able to book instantly with you if they meet all these requirements and agree to your House Rules. </p>
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
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Here’s how guests will book with you</h1>


              <div className="box col-md-12">
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img src="../images/step3_4img1.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>Qualified guests find your listing</h3>
                    <p>Anyone who wants to book with you needs to confirm their contact information, provide payment details, and tell you about their trip.</p>
                  </div>
                </div>
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img src="../images/step3_4img2.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>You set controls for who can book</h3>
                    <p>To book available dates without having to send a request, guests must agree to your rules and meet all the requirements you set.</p>
                    <p className="textpink">I want to review every request</p>
                  </div>
                </div>
                <div className="boxdiv">
                  <div className="col-lg-3 pull-left">
                    <img src="../images/step3_4img3.png" />
                  </div>
                  <div className="col-lg-9 pull-right">
                    <h3>Once a guest books, you get notified</h3>
                    <p>You’ll immediately get a confirmation email with information like why they’re coming, when they’re arriving, and who they’re coming with.</p>
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
                    <img className="becomehost__info" src="./images/step3_4img4.png" alt=""/>
                    <p>In the rare case there are issues. PopulStay has you covered with 24/7 customer support, a S1, 200,000 SGD Host Guarantee, and completely penalty-free cancellations if you're uncomfortable with a reservation</p>
                    <h5>Set rules for who can book instantly</h5>
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
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Successful hosting starts with an accurate calendar</h1>


              <div className="box col-md-12">
                <p>Guests will book available days instantly. Only get booked when you can host by keeping your calendar and availability settings up-to-date.</p>
                <p>Cancelling disrupts guests’ plans. If you cancel because your calendar is inaccurate, you’ll be charged a penalty fee and the dates won’t be available for anyone else to book.</p>

                <div className="check"  onClick={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});}}>
                  <p  className="Pinput">
                      <img className={this.state.roomstuff_Closet_drwers ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <p className="divinput">Got it! I’ll keep my calendar up to date.</p> 
                </div>
              </div>


              

             
              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button  className={ this.state.roomstuff_Closet_drwers ==0 ? "buttonActive Right" : "Right"} disabled={ this.state.roomstuff_Closet_drwers ==0 ? "disabled" : ""} onClick={this.nextStep}>Next</button>
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
                <p>Step 3: Get ready for guests</p>
              </div>

              <h1>Let’s get started with a couple questions</h1>


              <div className="box col-md-12">

                <h3>Have you rented out your place before?</h3>
                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.question_rented}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      <li><a onClick={(e)=>this.setState({question_rented:this.Getcontent(e)})}>I'm a novice in this respect</a></li>
                      <li><a onClick={(e)=>this.setState({question_rented:this.Getcontent(e)})}>I have a renting experience</a></li>
                    </ul>
                  </div>
                </div>
                <h3>How often do you want to have guests?</h3>
                <div className="form-group">    
                  <div className="btn-group col-md-12">
                    <button type="button" data-toggle="dropdown">{this.state.Howoften_guests}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      <li><a onClick={(e)=>this.setState({Howoften_guests:this.Getcontent(e)})}>Not sure yet</a></li>
                      <li><a onClick={(e)=>this.setState({Howoften_guests:this.Getcontent(e)})}>Part of the time</a></li>
                      <li><a onClick={(e)=>this.setState({Howoften_guests:this.Getcontent(e)})}>As much as possible</a></li>
                    </ul>
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
                    <img className="becomehost__info" src="./images/step3_4img4.png" alt=""/>
                    <p>Based on your responses, we can  recommend specific availability settings for you.</p>
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
