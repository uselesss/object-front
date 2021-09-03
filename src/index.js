import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Request from './classes/request.jsx';
import Map from './classes/map.jsx';
import { ChainId, DAppProvider } from "@usedapp/core";
import ConnectWallet from './classes/connectButton.jsx';

const config = {
  readOnlyChain: ChainId.Kovan,
  readOnlyUrls: {
    [ChainId.Kovan]: 'https://mainnet.infura.io/v3/912668c188114c6fb74af1746ada48c5',
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ConnectWallet/>
    </DAppProvider>
  </React.StrictMode>,

  document.getElementById('root')
);  
