import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";
import jsonAbi from "./abi/rentContract.json";
import {contractAddress} from "./contractAddress"
import "./css/admin.css"
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FloatingLabel} from "react-bootstrap";

import { Button, TextField } from "@material-ui/core";

function Withdraw() {
  const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const web3 = useWeb3();

  const sendTransaction = async e => {
    e.preventDefault();

    const amount = e.target[0].value;
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0].toString();
    
    const wamount = web3.utils.toWei(amount, "ether");

    var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
    
    var transact = await RentContract.methods.withdraw(sender, wamount).send(
      { 
        from: sender, 
        value: 0, 
        gas: 4000000
      }, 
      (err, res) => 
      err ? console.log(`error ${err}`): console.log(`Success ${res}`)
      );
      
  }; 

  return (
    <div className="adminWithdraw">
      <form onSubmit={e => sendTransaction(e)}>
        <FloatingLabel controlId="floatingTextarea" label="Количество (ETH)" className="mb-3">
          <Form.Control placeholder="Enter amount"/>
        </FloatingLabel> 
        <Button
          variant="filled"
          color="primary"
          type="submit"
        >
        Вывести средства
        </Button>
      </form>
    </div>
  );
}

export default Withdraw; 