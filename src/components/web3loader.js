import { Component } from 'react'
import { withRouter } from 'react-router'
import Web3 from 'web3';

function Web3Loader() {
	window.web3 = new Web3( new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));  
}

export default Web3Loader
