import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import guestService from '../services/guest-service';
import web3Service from '../services/web3-service';
import languageService from '../services/language-service';


class WalletClear extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modaloutOpen: false,
      pirvatekey:"",
      registered:false,
      modalinOpen: false,
      Username:'',
      Password:'',
      address:"",
      clicklogout:'',
      languagelist:{},
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.clear = this.clear.bind(this);
    this.import = this.import.bind(this);

    web3Service.loadWallet();
    languageService.language();
  }
  componentWillMount() {
    this.setState({ languagelist:window.languagelist });
    guestService.getGuesterInfo(window.address).then((data)=>{
      this.setState({ registered:true });
    });

  }
  clear(){
   
      
      window.address          = null;
      window.addressShow      = null;
      window.privateKey       = null;
      reactLocalStorage.setObject('wallet', null);
      this.setState({modaloutOpen:false});
      this.props.onLogOut(true);

  }

  import(){
      var obj=window.web3.eth.accounts.wallet.add( "0x" + this.state.pirvatekey );
      window.address          = obj.address;
      window.addressShow      = obj.address.substring(0,10)+"...";
      window.privateKey       = "0x" + this.state.pirvatekey;
      this.setState({modalinOpen:false});
      this.props.onLogOut(false);
       reactLocalStorage.setObject('wallet', 
      {'address': window.address,
      'privateKey': window.privateKey,
      'addressshow': window.addressshow});
  }



  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }
  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }

    


  render() {
        const language = this.state.languagelist;
    return (

    <div>

        {this.state.registered === true &&  this.props.clicklogout ===false  && 
          <a onClick={(e) => this.setState({modaloutOpen:true})}>{language.Log_out}</a>
        }

        {(this.state.registered === false || this.props.clicklogout ===true ) &&
          <a onClick={(e) => this.setState({modalinOpen:true})}>{language.Log_in}</a>
        }

        <Modal isOpen={this.state.modaloutOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  contentLabel="Wallet Message">
          <div className="clear">
            <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_Remember_Your_Pirvate_Key}</h2>
            <div>
              <h3>{language.Address}</h3>
              <p className="text1">{window.address}</p>
              <h3>{language.Private_Key}</h3>
              <p className="text1">{this.substring0x(window.privateKey)}</p>
            </div>  
            <button className="btn btn-danger Left" onClick={this.clear}>{language.Clear}</button>
            <button className="btn btn-primary Right"  onClick={(e) => this.setState({modaloutOpen:false})}>{language.Cancel}</button>
          </div>
        </Modal>

        <Modal isOpen={this.state.modalinOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  contentLabel="Wallet Message">
          <div className="Import">
          <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_Remember_Your_Pirvate_Key}</h2>
          <br/>
            <div className="form-group">
            <label>{language.Private_Key}</label>
            <input type="text"  className="form-control" placeholder={language.Wallet_Account} onChange={(e) => this.setState({pirvatekey: e.target.value})} />
          </div>
          <br/>
          <button className="btn btn-danger Left" onClick={this.import}>{language.Import}</button>
          <button className="btn btn-primary Right " onClick={(e) => this.setState({modalinOpen:false})}>{language.Cancel}</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletClear
