import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import languageService from '../services/language-service';
import guestService from '../services/guest-service';
import Overlay from './overlay';
import Modal from 'react-modal';

class GuestOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user:'',
      modalIsOpen: false,
      status: "Loading...",
      houseInformation: "Loading...",
      from:"Loading",
      to:"Loading",
      price:"Loading",
      ethPrice:"Loading",
      url:"",
      languagelist:{},
      Comment:'',
      selectedPictures:[],
      Accuracy:0, 
      Location:0,
      Communication:0,
      Check_in:0,
      Cleanliness:0,
      Value:0,
    }

    this.checkIn   = this.checkIn.bind(this);
    this.checkInUSD   = this.checkInUSD.bind(this);
    this.Reviews   = this.Reviews.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.deletePictures = this.deletePictures.bind(this);
    languageService.language();

  }



   checkIn(){
      var ethOrPPS;

    if( this.props.item.price != 0 || this.props.item.price != '0' )
    {
      ethOrPPS = 'PPS';
    }
    else
    {
      ethOrPPS = 'ETH';
    }

    orderService.confirm( 
                           this.props.item.guestaddress ,
                           ethOrPPS ,
                           this.props.item.from,
                           this.props.item.to,
                           this.props.item.houseinfoid

      ).then((tx)=>{
      console.log(tx)
      this.setState({state:'4'});
       return orderService.waitTransactionFinished(tx)
     }).then((blockNumber) => {
      this.setState({state:'1'});
    }).catch((error) => {
      console.error(error);
    });
    this.setState({checkInOpen: false});

     ;
  }

  checkInUSD(){
    orderService.confirmByUSD(this.props.item.id).then((tx)=>{
      this.setState({state:'4'});
       return orderService.waitTransactionFinished(tx)
     }).then((blockNumber) => {
      this.setState({ state: '1' })
    }).catch((error) => {
      console.error(error);
    });
  }
  componentDidMount() {
    guestService.getGuesterInfo(window.address).then((data)=>{
      this.setState({ user:data.user});
    });

    this.setState({
      houseinfoid:this.props.item.houseinfoid,
      id:this.props.item.id,
      from:this.props.item.from,
      to:this.props.item.to,
      price:this.props.item.price,
      ethprice:this.props.item.ethprice,
      usdprice:this.props.item.usdprice,
      usdprice:this.props.item.usdprice,
      usdprice:this.props.item.usdprice,
      state:this.props.item.state,
    });
    this.setState({ languagelist:window.languagelist });
    //orderService.confirmByUSD("5b30a218e13af37acb1e872a");
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  Reviews(){
    if(this.state.Accuracy != 0 && this.state.Location != 0 && this.state.Communication != 0 && this.state.Check_in != 0 && this.state.Cleanliness != 0 && this.state.Value != 0 && this.state.Comment != ''){
      guestService.addComment(this.props.item.id,this.state.Comment,this.state.Accuracy,this.state.Location,this.state.Communication,this.state.Check_in,this.state.Cleanliness,this.state.Value).then((data)=>{
          this.setState({state:'5',modalIsOpen: false});
      });
    }else{
      console.log(456)
    }
  }

  fileChangedHandler(event){
        event.preventDefault();
        
        var files = this.state.selectedPictures;
        let reader = new FileReader();
        let file = event.target.files[0];

        var imgsize = (file.size/1024).toFixed(2); 
        if(imgsize<600){
            reader.onloadend = () => {
              files.push({
                file: file,
                imagePreviewUrl: reader.result
              });
              this.setState({selectedPictures:files});
            }
          reader.readAsDataURL(file)
          this.setState({PicturesSize:''});
        }else{
          this.setState({PicturesSize:'The picture must not exceed 600KB'})
        }
        console.log(this.state.selectedPictures)
        
    }

    deletePictures(index,e){
      this.setState({
            selectedPictures: this.state.selectedPictures.filter((elem, i) => index != i)
      });

    }


  render() {
      const language = this.state.languagelist;

    return (
      <div>
        <div className="divtr">
          {this.state.usdprice != '0' && this.state.usdprice && <div><p>/</p></div>}
          {this.state.ethprice != '0' && this.state.ethprice && <div><a href={`/listing/${this.state.houseinfoid}${this.state.state == '4' ? '?'+this.state.id : ''}`}><span className="glyphicon glyphicon-search"></span></a></div>}
          {this.state.price != '0' && this.state.price && <div><a href={`/listing/${this.state.houseinfoid}${this.state.state == '4' ? '?'+this.state.id : ''}`}><span className="glyphicon glyphicon-search"></span></a></div>}
          <div><Link to="/Receipt">{language.Check}</Link></div>
          <div><Timestamp time={this.state.from.substring(0,10)} format='date'/></div>
          <div><Timestamp time={this.state.to.substring(0,10)} format='date'/></div>
          {this.state.usdprice != '0' && this.state.usdprice && <div>{this.state.usdprice+"/USD"}</div> }
          {this.state.ethprice != '0' && this.state.ethprice && <div>{this.state.ethprice+"/ETH"}</div> }
          {this.state.price != '0' && this.state.price && <div>{this.state.price+"/PPS"}</div> }
          { this.state.state === '1' &&<div>{language.state1}</div>}
          { this.state.state === '2' &&<div><button className="btn-sn btn-danger" onClick={(e)=>this.setState({checkInOpen:true})}>{language.Check_In}</button></div>}
          { this.state.state === '-2' &&<div><button className="btn-sn btn-danger" onClick={(e)=>this.setState({USDcheckInOpen:true})}>{language.Check_In}</button></div>}
          { this.state.state === '3' &&<div>{language.state1}</div>}
          { this.state.state === '4' &&<div><button className="btn-sn btn-danger" onClick={this.openModal}>{language.Reviews}</button></div>}
          { this.state.state === '5' &&<div>{language.ok_Reviews}</div>}
        </div>

        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  
        contentLabel="Wallet Message">
          <div className="Wallet_Reviews">
            <div className="box1">
                <div className="userimg">
                  <img src="/images/uesrimg.png"/>
                </div>
                <div className="usertext">
                  <h4>{this.state.user}</h4>
                  <p>Charleston, South Carolina, United States · Joined in March 2018</p>
                  <h6>Absolute Melbourne Center Apartment</h6>
                </div>
            </div>

            <ul className="box2">
                <li>
                  <p>{language.Accuracy}</p>
                  <div className="divxx">
                    <img src={this.state.Accuracy >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:1})} />
                    <img src={this.state.Accuracy >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:2})} />
                    <img src={this.state.Accuracy >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:3})} />
                    <img src={this.state.Accuracy >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:4})} />
                    <img src={this.state.Accuracy >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:5})} />
                  </div>
                </li>
                <li>
                  <p>{language.Location}</p>
                  <div className="divxx">
                    <img src={this.state.Location >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:1})} />
                    <img src={this.state.Location >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:2})} />
                    <img src={this.state.Location >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:3})} />
                    <img src={this.state.Location >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:4})} />
                    <img src={this.state.Location >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:5})} />
                  </div>
                </li>
                <li>
                  <p>{language.Communication}</p>
                  <div className="divxx">
                    <img src={this.state.Communication >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:1})} />
                    <img src={this.state.Communication >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:2})} />
                    <img src={this.state.Communication >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:3})} />
                    <img src={this.state.Communication >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:4})} />
                    <img src={this.state.Communication >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:5})} />
                  </div>
                </li>
                <li>
                  <p>{language.Check_in}</p>
                  <div className="divxx">
                    <img src={this.state.Check_in >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:1})} />
                    <img src={this.state.Check_in >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:2})} />
                    <img src={this.state.Check_in >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:3})} />
                    <img src={this.state.Check_in >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:4})} />
                    <img src={this.state.Check_in >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:5})} />
                  </div>
                </li>
                <li>
                  <p>{language.Cleanliness}</p>
                  <div className="divxx">
                    <img src={this.state.Cleanliness >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:1})} />
                    <img src={this.state.Cleanliness >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:2})} />
                    <img src={this.state.Cleanliness >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:3})} />
                    <img src={this.state.Cleanliness >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:4})} />
                    <img src={this.state.Cleanliness >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:5})} />
                  </div>
                </li>
                <li>
                  <p>{language.Value}</p>
                  <div className="divxx">
                    <img src={this.state.Value >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:1})} />
                    <img src={this.state.Value >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:2})} />
                    <img src={this.state.Value >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:3})} />
                    <img src={this.state.Value >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:4})} />
                    <img src={this.state.Value >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:5})} />
                  </div>
                </li>
            </ul>

            <textarea placeholder={language.Describe_your_experiece_here} onChange={(e)=>this.setState({Comment:e.target.value})}></textarea>

            <div className="photos">
                {this.state.selectedPictures.map((file,index) => (
                  <div className="photosimg" >
                    <img className="img-thumbnail" src={file.imagePreviewUrl} />
                    <span  className="glyphicon glyphicon-trash" onClick={this.deletePictures.bind(this,index)} ></span>
                  </div>
                  ))
                 }
               <div className="photosipt">
                  <img src="../images/reviews3.png" />
                  <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={(e)=>this.fileChangedHandler(e)}/>
               </div>
            </div>
            <p className="textpink">{this.state.PicturesSize}</p>

            <button className="Right Right1" onClick={this.closeModal}>{language.Cancel}</button>
            <button className="Right" onClick={this.Reviews}>{language.Reviews}</button>
          </div>
        </Modal>

        {this.state.checkInOpen &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            <div className="checkIn">
              <h3>{language.checkIn_ok_no}</h3>
              <button className="btn btn-primary Left" onClick={this.checkIn}>{language.Check_in}</button>
              <button className="btn btn-primary Right" onClick={(e)=>this.setState({checkInOpen:false})}>{language.Cancel}</button>
            </div> 
          </Overlay>
        }

        {this.state.USDcheckInOpen &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            <div className="checkIn">
              <h3>{language.checkIn_ok_no}</h3>
              <button className="btn btn-primary Left" onClick={this.checkInUSD}>{language.Check_in}</button>
              <button className="btn btn-primary Right" onClick={(e)=>this.setState({USDcheckInOpen:false})}>{language.Cancel}</button>
            </div> 
          </Overlay>
        }
      </div>
    
    )
  }
}

export default GuestOrderRow