
import './App.css';
import { ethers, utils } from "ethers";
import { useEffect, useState } from 'react';
import logo from "./DLSlogo.jpeg";

import lottoJSON from "./lotto.json";
import usdcJSON from "./USDC.json";


function App() {
  const lottoAddress = "0xcad983583f0d5940B3be81d4a89DB474d63C6993";
  const usdcAddress = "0x1FE38D56D80E388F21ea8b0F6AE2A92C681dA1c3";
  const lottoABI = lottoJSON["abi"]; 
  const usdcABI = usdcJSON["abi"];
  const [currentAccount, setCurrentAccount] =  useState('');
  const [chainId, setChainId] = useState(0);
  const [lottoContract, setLottoContract] = useState(null);
  const [usdcContract, setUsdcContract] = useState(null);
  const [chainName, setChainName] = useState(null);
  const [balance, setBalance] = useState(0);
  const [currentseries, setcurrentseries] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [ticketNumber, setTicketNumber] = useState(0);
  const [series, setSeries] = useState('A');

  const RandomNumGenerator = () => {
    let validSeries = ['A', 'B', 'C', 'D', 'E'];
    let randomNum = Math.floor((Math.random() * 2000)+ 1);
    let randomSeries = validSeries[Math.floor(Math.random() * (5)) + 0];
    console.log(randomSeries);
    setSeries(randomSeries);
    setTicketNumber(randomNum);
  }

  const getUSDC = async() => {
    if(!usdcContract){
      alert("Metamask not connected!");
      return;
    } else {
      const usdcWithSigner = await usdcContract.connect(signer);
      const tx = await usdcWithSigner.mint(currentAccount, ethers.utils.parseUnits("10.0", 18));
      alert("Sent tx");
      console.log(tx);
      alert("Usdc minted");
    }
  }

  const appoveUSDC = async() => {
    if(!usdcContract){
      alert("Metamask not connected!");
      return;
    } else {
      const usdcWithSigner = await usdcContract.connect(signer);
      const tx = await usdcWithSigner.approve(lottoAddress, ethers.utils.parseUnits("10.0", 18));
      alert("Sent tx");
      console.log(tx);
      alert("Usdc approved");
    }
  }

  const buyTicket = async() => {
    if(!lottoContract){
      alert("Metamask not connected!");
      return;
    } else {
      const lottoWithSigner = await lottoContract.connect(signer);
      console.log(series.charCodeAt(0) - 'A'.charCodeAt(0), ticketNumber);
      const tx = await lottoWithSigner.buyTicket(series.charCodeAt(0) - 'A'.charCodeAt(0), ticketNumber);
      alert("Sent tx");
      console.log(tx);
      alert("Ticket bought");
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);    
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.getBalance(currentAccount).then((result)=>{
            setBalance(ethers.utils.formatEther(result))
        });
        provider.getNetwork().then((result)=>{
          setChainId(result.chainId);
          setChainName(result.name);
        });
      } else {
        console.log("no authorised account found");
      }
     
    } catch (error) {
      console.log(error);
    }
  }
  

  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      if(!ethereum) {
        alert("Get metamask");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await setProvider(provider);
      console.log("Provider:", provider);
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()

      await setSigner(signer);
      console.log("Signer", signer);

      const lottoContractTemp = new ethers.Contract(lottoAddress, lottoABI, provider);
      console.log("Lotto contract object", lottoContractTemp);
      await setLottoContract(lottoContractTemp);

      const usdcContractTemp = new ethers.Contract(usdcAddress, usdcABI, provider);
      console.log("USDC contract object", usdcContractTemp);
      await setUsdcContract(usdcContractTemp);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])



  return (
    <div className="App">
      <div className='header-container'>
        <div>
          <div className='logo-header'>
            <div className='logo-text'>
              <div className='logo-logo'><h1>DLS</h1><h2>Ξ</h2></div>
              <div><h3>Decentralised Lottery System</h3></div>
            </div>
          </div>
          <button className='connect-wallet' onClick={connectWallet}>Connect wallet</button>
        </div>
      </div>
      <div className='main-page'>
        <div className='buy-ticket-container'>
          <p><strong>WHY?</strong> <br/> <br/> <ul>
  <li>Frauds.</li>
  <li>Lack of transparency.</li>
  <li>Limited Winners.</li>
</ul>
</p>
        </div>

        <div className='what-container'>
          <p><strong>WHAT?</strong><br/> <br/>
          <ul>
  <li>Transparency.</li>
  <li>Smart contracts are trustworthy.</li>
  <li>Winners- new mechanisms.</li>
  
</ul>
          </p>
        </div>

        <div className='right-side-container'>
          <div className='how-heading'>
            <h3>HOW?</h3>
          </div>
          <div>
            <button onClick={getUSDC}>Gimme USDC!  </button>
          </div>
          <div>
            <button onClick={appoveUSDC}>Approve USDC  </button>
          </div>
          <div className='series-container'> 
                  <label>Series</label>
                  <select value={series} onChange={(e) =>{
                    setcurrentseries(e.target.value);
                  }}>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                  </select>
            </div>  
            <div className='number-container'>
              <label>Choose a number between 1 to 2000</label>
              <input onChange={(e) =>{
                setcurrentseries(e.target.value);
              }} value={ticketNumber} type="number" min="1" max="2000"/>
            </div>  
            <div className='random-button-container'>
              <label>Generate a random ticket number here</label>
              <button onClick={RandomNumGenerator}>Random</button>
            </div>

            <div class Name='submit-button'>
              <button onClick={buyTicket}>Submit</button>
            </div>
        </div>
      </div>
       <div className='ppt-link'>
        <a style={{color: "red"}} href="https://www.canva.com/design/DAFa6aXJ_88/XW_kZZfb8rI-__eR8xX4xQ/edit?utm_content=DAFa6aXJ_88&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">Click here to know more on this</a>
      </div>
    </div>
  );
}

export default App;
