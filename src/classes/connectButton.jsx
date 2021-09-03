import React from "react"; 
import { useEtherBalance, useEthers , useContractFunction} from '@usedapp/core'
import {formatEther} from '@ethersproject/units'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import abi from '../abi/rentContract.json' 

export function ConnectWallet() {
    const { activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)
  
    const contractAbi = new utils.Interface(abi)
    const contractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
    const contract = new Contract(contractAddress, contractAbi)

    const { state, send } = useContractFunction(contract, 'getOwner')
    
    const depositEther = (etherAmount) => {
        send({ value: utils.parseEther(etherAmount) })
    }

    console.log(state)

    return (
    <div>
        <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}

export default ConnectWallet;