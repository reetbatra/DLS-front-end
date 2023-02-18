
import './App.css';
import { ethers, utils } from "ethers";
import { useEffect, useState } from 'react';

function App() {
  const [currentAccount, setCurrentAccount] =  useState('');
  const [chainId, setChainId] = useState(0);
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
        })
        provider.getNetwork().then((result)=>{
          setChainId(result.chainId)
          setChainName(result.name)
        })

        console.log(chainId, chainName, balance)

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
        <h1>Kerala Lottery System</h1>
        <button className='connect-wallet' onClick={connectWallet}>Connect wallet</button>
      </div>
      <div className='main-page'>
        <div className='buy-ticket-container'>
          <p><strong>Why?</strong> <br/> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div>

        <div className='what-container'>
          <p><strong>What?</strong><br/>demo text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha</p>
        </div>

        <div className='right-side-container'>
          <h3>How?</h3>
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
              
              <button onClick={""}>Submit</button>
            </div>
        </div>
      </div>

      <p><a href="https://www.w3schools.com">Click here to know more on this</a></p>
    </div>
  );
}

export default App;
