"use client"
import React from 'react'
import detectEthereumProvider from '@metamask/detect-provider';
import { web3 } from '@/utils';
import { coinABI, coinAddress } from '@/utils/Coin';
export default function ConnectWallet() {
    const [WalletAddress, setWalletAddress] = React.useState('')
    //On Connect Wallet 
    const connectWallet = async () => {
        const provider = await detectEthereumProvider();
        //checking ethereum connection
        if (window.ethereum !== undefined && provider === window.ethereum) {
            //connect wallet
            let accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setWalletAddress(accounts[0])
            sessionStorage.setItem("address", accounts[0])
            const coinInstance = new web3.eth.Contract(coinABI, coinAddress)
            //@ts-ignore
            coinInstance.methods.balanceOf(accounts[0])
                .call()
                .then((e: any) => {
                    const balance = web3.utils.fromWei(e, 'ether')
                    console.log(balance)
                    sessionStorage.setItem("balance", balance)
                }
                )
                .catch(error => console.log(error))
        }
    }

    React.useEffect(() => {
        const Address = sessionStorage.getItem("address")
        if (Address) {
            setWalletAddress(Address)
        }
    }, [])

    return (
        <>
            {
                WalletAddress === "" ?
                    <button onClick={connectWallet} className="main">Connect Wallet</button>
                    :
                    <button className="main connected">Connected {`${WalletAddress.slice(0, 4)}...${WalletAddress.slice(-4)}`}</button>
            }
        </>
    )
}
