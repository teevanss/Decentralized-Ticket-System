import './css/Browse.css';
import city from './city.svg';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import React from 'react';
import Web3 from "web3";
import contract from './TicketSmartContract.json';
// Access our wallet inside of our dapp

// This is FOR TESTING ON GANACHE ONLY - THIS WILL HAVE TO CHANGE WHEN DEPLOYING
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const smartContractAddress = "0xC9f4732a4F394514Cd0c4593E1E876BFC0817e7e"
const contractAbi = contract.abi
// This is our smart contract Instance
const TicketCityContractInstance = new web3.eth.Contract(contractAbi, smartContractAddress);

function EventsBrowse() {

    const [account, setAccount] = useState('');

    async function requestAccount() {
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(account[0]);
    }

    const viewAllEvents = async() => {
        let all_events = await TicketCityContractInstance.methods.viewAllEvents().call()
        return all_events;
    };
      
    const renderList = () => {
        const info_box3 = document.getElementById('info_box3');
        let events = "";
        const itemList = viewAllEvents().then((resolved) => {
            for (let i = 0; i < resolved.length; i++){
                let openiningDiv = "<div id = 'eventbox'>";
                let image = "<div id = 'row'>" + "<div id = 'eventImg'></div>";
                let eventName = "<h5>"+"Event Name: " + resolved[i][0] + "</h5></div>";
                let price = "<h4>"+"Price: " + resolved[i][8] + "</h4>";
                let seller = "<h4>"+"Seller: " + resolved[i][1] + "</h4>";
                let availableTickets = "<h4>"+"Available Tickets: " + resolved[i][3] + "</h4>";
                let closingDiv = "</div>";
                let event = openiningDiv + image + eventName + seller + price + availableTickets + closingDiv;
                events += event;
            }
            console.log(events)
            info_box3.innerHTML = events;
        }
        );
    };

    useEffect(() => {
        requestAccount();
    }, []);

    return (
        <div>
            {renderList()}
        </div>
    );
}

export default EventsBrowse;