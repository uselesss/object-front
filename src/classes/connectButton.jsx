import React from "react"; 
import { useEtherBalance, useEthers, ContractCall, useContractCall} from '@usedapp/core'
import PropTypes from 'prop-types'
import {formatEther} from '@ethersproject/units'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import abi from '../abi/rentContract.json' 

export function ConnectWallet() {
    const { activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)
  
    const contractAbi = new utils.Interface(abi)
    const contractAddress = '0xd2435293340E537BAcD2feD2f700B204C707518d'
    const contract = new Contract(contractAddress, contractAbi)

    // let zxc = ContractCall(contractAbi, contractAddress, "landlord")

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