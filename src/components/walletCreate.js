import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};


class WalletCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
  }

  componentWillMount() {

  }
   


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (

    <div>

        <a onClick={this.openModal}>Create</a>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Example Modal">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
          <br/>
          <h3>Address:{window.address}</h3>
          <h3>Pirvate Key:{window.privateKey}</h3>
          <br/>
          <button className="btn btn-danger" onClick={this.closeModal}>Close</button>
        </Modal>
      

      </div>
    );
  }
}
export default WalletCreate
