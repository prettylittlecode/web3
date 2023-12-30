import React, { useState } from "react";
// import {ethers } from 'ethers';
import "./walletConnect.css"
const WalletConnect = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    // const [connButtonText, setConnButtonText] = useState("Connect Wallet ");

    const connectWalletHandler = () => {
        if (window.ethereum) {
            // Metamask is available
            window.ethereum.request({ method: "eth_requestAccounts" })
                .then(result => {
                    accountChangedHandler(result[0]);
                })
                .catch(error => {
                    setErrorMessage("Error connecting wallet: " + error.message);
                });
        } else {
            setErrorMessage("Please Install Metamask");
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
    }

    const getUserBalance = (address) => {
        // Implement your logic to fetch user balance here
        window.ethereum.request({method:'eth_getBalance',params: [address,'latest']})
        .then(balance => {
        //     const balanceInWie=BigInt(balance);
            
            setUserBalance(parseInt(balance,16)/10**18);
            console.log(parseInt(balance,16)/10**18)
        })


        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // console.log(provider)
        //     const balanceWei = provider.getBalance(address);
        //     const balanceEth = ethers.utils.formatEther(balanceWei);
        //     setUserBalance(balanceEth);
    }

    return (
        <div className="walletConnect">
            <h4>Connect to Metamask</h4>
            <div className="img-metamask">
            <img className="metamaskimg" src="https://cdnl.iconscout.com/lottie/premium/thumb/metamask-side-face-5663351-4719000.gif" alt="" />
            <button className="button-connect" onClick={connectWalletHandler}>Connect Wallet</button>
            </div>
            <div className="accountDisplay">
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className="balanceDisplay">
                <h3>Balance: {userBalance} Ethers</h3>
            </div>
            {errorMessage && <div className="errorDisplay">{errorMessage}</div>}
        </div>
    );
}

export default WalletConnect;
