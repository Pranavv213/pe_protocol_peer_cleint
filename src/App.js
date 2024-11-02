import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { ethers } from "ethers";
import { Scanner } from '@yudiel/react-qr-scanner';
import contractABI from './Abi.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import India from './assets/india.png'
import UAE from './assets/united-arab-emirates.png'
import Taiwan from './assets/taiwan.png'
import Singapore from './assets/singapore.png'
import peerfi from './assets/peerfi.png'
import Button from 'react-bootstrap/Button';

function App() {

  const [walletAddress, setWalletAddress] = useState("");
  const [contractData, setContractData] = useState(null);
  const [balance, setBalance] = useState("");
  const [upiId,setUpiId]=useState("")
  const [upiURL,setUpiURL]=useState("")
  const [amount,setAmount]=useState(0)
  const [amountInInr,setAmountInInr]=useState("")
  const [country,setCountry]=useState("")
  const [paymentRecieved,setPaymentRecieved]=useState(false)
  const contractAddress = "0x017696173BC2f47b2357ad78B08eFeA071cd92d2";
  const [ip,setIp]=useState("")
  const [address,setWallet]=useState("")
  const [amountStake,setAmountStake]=useState("")




  
   

   

   const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
         try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
         } catch (error) {
            console.error("Error connecting to MetaMask:", error);
         }
      } else {
         alert("Please install MetaMask to connect your wallet.");
      }
   };
   const setIP = async () => {
    if (!walletAddress) {
       alert("Please connect your wallet first.");
       return;
    }

    try {
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const contract = new ethers.Contract(contractAddress, contractABI, signer);

       // Sending amount as Ether (converted to Wei)
       const tx = await contract.setIp(ip, {
          value: ethers.utils.parseEther(amount.toFixed(18).toString()), // Ensure this is in Wei
       });

       console.log("Transaction sent:", tx);
       
       // Wait for the transaction to be mined
       const receipt = await tx.wait();
       console.log("Transaction mined:", receipt);

       alert("Transaction successful!");
       setPaymentRecieved(true)
    } catch (error) {
       console.error("Error calling sendAmount:", error);
    }
 };

 const setAddress = async () => {
  if (!walletAddress) {
     alert("Please connect your wallet first.");
     return;
  }

  try {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(contractAddress, contractABI, signer);

     // Sending amount as Ether (converted to Wei)
    
     const tx = await contract.setIpWalletAddress("0",address);

     console.log("Transaction sent:", tx);
     
     // Wait for the transaction to be mined
     const receipt = await tx.wait();
     console.log("Transaction mined:", receipt);

     alert("Transaction successful!");
     setPaymentRecieved(true)
  } catch (error) {
     console.error("Error calling sendAmount:", error);
  }
};

const stake = async () => {
  if (!walletAddress) {
     alert("Please connect your wallet first.");
     return;
  }

  try {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(contractAddress, contractABI, signer);

     // Sending amount as Ether (converted to Wei)
   
     const tx = await contract.stakeAmount("0", {
        value: ethers.utils.parseEther(amountStake.toString()), // Ensure this is in Wei
     });

     console.log("Transaction sent:", tx);
     
     // Wait for the transaction to be mined
     const receipt = await tx.wait();
     console.log("Transaction mined:", receipt);

     alert("Transaction successful!");
     setPaymentRecieved(true)
  } catch (error) {
     console.error("Error calling sendAmount:", error);
  }
};

const checkBalance = async () => {
  if (!walletAddress) {
     alert("Please connect your wallet first.");
     return;
  }

  try {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(contractAddress, contractABI, signer);

     // Sending amount as Ether (converted to Wei)
     const data = await contract.balance(0);
   

     alert(ethers.utils.formatEther(data));
     setBalance(ethers.utils.formatEther(data).toString())
     setPaymentRecieved(true)
  } catch (error) {
     console.error("Error calling sendAmount:", error);
  }
};

const claimRewards = async () => {
  if (!walletAddress) {
     alert("Please connect your wallet first.");
     return;
  }

  try {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(contractAddress, contractABI, signer);

     // Sending amount as Ether (converted to Wei)
    
     const tx = await contract.claimRewards("0");

     console.log("Transaction sent:", tx);
     
     // Wait for the transaction to be mined
     const receipt = await tx.wait();
     console.log("Transaction mined:", receipt);

     alert("Transaction successful!");
     setPaymentRecieved(true)
  } catch (error) {
     console.error("Error calling sendAmount:", error);
  }
};


   const callSmartContractFunction = async () => {
      if (!walletAddress) {
         alert("Please connect your wallet first.");
         return;
      }

      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();
         const contract = new ethers.Contract(contractAddress, contractABI, signer);

         const data = await contract.paymentRecieved(); // Adjust parameters as needed
         setContractData(data);
         console.log("Contract function result:", data);
      } catch (error) {
         console.error("Error calling contract function:", error);
      }
   };
  return (
    <div className="App" >
     {/* <button onClick={async ()=>{

      const result=await axios.get("http://localhost:3000/");
      alert(result.data)

     }}>click</button> */}
     <br></br>
     <img style={{width:'15em'}} src={peerfi}></img>
     <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button class="button-17" role="button" onClick={connectWallet} style={{ padding: "10px 20px", fontSize: "16px" }}>
        {walletAddress ? walletAddress.slice(0, 4)+"..."+walletAddress.slice(-4) : "Connect Wallet"}
      </button>
      {/* {walletAddress && <p>Connected Address: {walletAddress}</p>} */}
      <br></br>
    
    </div>
    <br></br>
    <input placeholder="Only enter if 1st time" onChange={(e)=>{
      setWallet(e.target.value)
    }}></input>
    <Button variant="warning"  onClick={setAddress}>Set Address</Button>
    <br></br><br></br>
    <input placeholder="Enter IP" onChange={(e)=>{
      setIp(e.target.value)
    }}></input>
    <Button variant="warning"  onClick={setIP}>Set IP</Button>
    <br></br><br></br>
    <input placeholder="Enter Amount" onChange={(e)=>{
      setAmountStake(e.target.value)
    }}></input>
    <Button variant="warning"  onClick={stake}>Stake</Button>
    <br></br><br></br>
    <DropdownButton id="dropdown-basic-button" title={country==""?"Select Country":<div><img style={{width:'2em'}} src={India}></img> &nbsp; India </div>}>
      <Dropdown.Item onClick={()=>{
        setCountry("India")
      }}><img style={{width:'2em'}} src={India}></img> &nbsp; India</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
        setCountry("India")
      }}><img style={{width:'2em'}} src={UAE}></img> &nbsp; UAE</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
        setCountry("India")
      }}><img style={{width:'2em'}} src={Singapore}></img> &nbsp; Singapore</Dropdown.Item>
      <Dropdown.Item onClick={()=>{
        setCountry("India")
      }}><img style={{width:'2em'}} src={Taiwan}></img> &nbsp; Taiwan</Dropdown.Item>
    </DropdownButton>
    <hr></hr>
   
    <Button variant="success" onClick={checkBalance}>Check Rewards</Button>
    <br></br><br></br>
    <l style={{color:'white'}}>{balance}</l>
    <br></br>
    <br></br>
    
    <button class="button-85" role="button" onClick={claimRewards}>Claim</button>
   
    

   <br></br>

   <br></br>

   <br></br>
 <br></br>


   <br></br>
   <br></br>  <br></br>  <br></br>  <br></br>
    </div>
  );
}

export default App;








