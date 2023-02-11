import React from "react";
import { initWasm } from "@trustwallet/wallet-core";

import logo from "./logo.svg";
import "./App.css";

const context = React.createContext();

function App() {
  const [twc, setTwc] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      const core = await initWasm();
      setTwc(core);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);


  return (
    <context.Provider value={twc}>
      <Main />
    </context.Provider>
  );
}

function Main() {
  const twc = React.useContext(context);
  const [value, setValue] = React.useState("btc");
  const [address, setAddress] = React.useState(null);
  const [mnemonic, setMnemonic] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleClick = (event) => {
    const wallet = twc.HDWallet.create(256, "password");
    const mnemonic = wallet.mnemonic();

    let address;
    switch(value) {
      case "btc":
        address = wallet.getAddressForCoin(twc.CoinType.bitcoin);
        break;
      case "eth":
        address = wallet.getAddressForCoin(twc.CoinType.ethereum);
        break;
      case "xrp":
        address = wallet.getAddressForCoin(twc.CoinType.xrp);
        break;
      default:
        wallet.delete();
        throw new Error("Invalid Coin Type!");
    } 
  
    wallet.delete();

    setMnemonic(mnemonic);
    setAddress(address);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Concept Trust Wallet Core</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {
          twc ? (
            <React.Fragment>
              <div>
                <select name="coins" id="coins" onChange={handleChange} value={value}>
                  <option value="btc">Bitcoin (BTC)</option>
                  <option value="eth">Ethereum (ETH)</option>
                  <option value="xrp">Ripple (XRP)</option>
                </select>
                <button id="btn" type="button" onClick={handleClick}>Generate</button>
              </div>
              <div>
                <p><b>mnemonic:</b> <span id="coin-mnemonic">{mnemonic}</span></p>
                <p><b>address:</b> <span id="coin-address">{address}</span></p>
              </div>
            </React.Fragment>
          ) : (
            <p>Loading...</p>
          )
        }
      </header>
    </div>
  );
}

export default App;
