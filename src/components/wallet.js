import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';

var web_provider = process.env.WEB3_PROVIDER;

const customStyles = {
  content : {
    top                   : '10%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '10%'
  }
};
class Wallet extends Component {

  constructor(props) {
    super(props)

    this.state={
      import:false,
      create:false,
      delete:false,
      export:false,
      accounts:null

    };
    if(!window.web3loaded)
    {
      window.web3 = new Web3( new Web3.providers.HttpProvider(web_provider));
      window.web3loaded = true;
    }
    this.create         = this.create.bind(this);
    this.openModal      = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal     = this.closeModal.bind(this);
    this.import         = this.import.bind(this);
    this.handleImport   = this.handleImport.bind(this);
    this.handleCreate   = this.handleCreate.bind(this);

     var wallet =window.web3.eth.accounts.wallet.load('web3_wallet','web3_wallet');

    if(wallet && wallet.length>0)
    {
       
        window.address      = wallet[wallet.length-1].address;
        window.privateKey   = wallet[wallet.length-1].privateKey;
        window.addressshow  = window.address.substring(0,10)+"...";
        var accounts =[];
        for(var i=0; i< wallet.length;i++)
        {
         var account={};
         account.address      = wallet[i].address;
         account.privateKey   = wallet[i].privateKey;
         account.addressshow  = account.address.substring(0,10)+"...";
         accounts.push(account);
        }
        this.setState({accounts:accounts});
    }

  }



  create(){
    var obj=window.web3.eth.accounts.wallet.create(1);
    window.address        = obj[obj.length-1].address;
    window.privateKey     = obj[obj.length-1].privateKey;
    window.addressshow    = window.address.substring(0,10)+"...";
    window.web3.eth.accounts.wallet.save('web3_wallet','web3_wallet');
  }

  import(){
      var obj=window.web3.eth.accounts.wallet.add(this.state.pirvatekey);
      window.address          = obj.address;
      window.addressShow      = window.address.substring(0,10)+"...";
      window.privateKey       = this.state.pirvatekey;
      window.web3.eth.accounts.wallet.save('web3_wallet','web3_wallet');
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    
  }

  handleImport(){
    this.setState({import:true,create:false,delete:false,export:false});

  }

  handleCreate(){
    
    this.setState({import:false,create:true,delete:false,export:false});
    this.create();
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  componentDidMount() {
  }

  render() {

    return (
      <div>
            
             {
              !window.address &&
              <button className="button__outline" type="button" onClick={this.openModal}>
                          My Wallet
              </button>

             }
            { 
              window.address &&
              <button className="button__outline" type="button" onClick={this.openModal}>
                         {window.addressshow}
              </button>
            }
            
           


       <div>
<Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Example Modal">
<div className="row">
<div className=" col-lg-1">       
<button className="btn btn-warning" onClick={this.handleCreate}>Create</button>
</div>
<div className=" col-lg-1"> 
<button className="btn btn-primary" onClick={this.handleImport}>Import</button>
</div>
</div>
<br/>
{
this.state.create && 
<div className="well">
<h3>Address:{window.address}</h3>
<h3>Private Key:{window.privateKey}</h3>
</div>
}
{
  this.state.import && 
<div className="form-group well">
<label>Private Key</label>
<input type="text"  className="form-control" placeholder="Wallet Account" onChange={(e) => this.setState({pirvatekey: e.target.value})} />
<br/>
<button className="btn btn-danger" onClick={this.import}>Ok</button>
</div>
}
<br/>
<table className="table">
<thead>
<tr>
<th>Address</th>
<th>Default</th>
<th>Operation</th>
</tr>
</thead>
<tbody>

{this.state.accounts && this.state.accounts.map(account => (
<tr>
 <td>{account.address}</td>
 <td></td>
 <td></td>
</tr>
))}




</tbody>
</table>
<button className="btn btn-primary" onClick={this.closeModal}>Cancel</button>
</Modal>
</div>
</div> 

    )
  }
}

export default Wallet