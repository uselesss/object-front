import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";

import { Button } from "@material-ui/core";

function Deposit() {
  const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const web3 = useWeb3();

  const sendTransaction = async e => {
    e.preventDefault();
    const amount = e.target[0].value;
    const recipient = e.target[1].value;
    await web3.eth.sendTransaction({
      from: address,
      to: recipient,
      value: web3.utils.toWei(amount, "ether")
    });
    updateBalance(address);
  };

  return (
    <Button
        onClick={() => getUserAccount()}
        variant="outlined"
        color="primary"
    >
        Подключить кошелек
    </Button>
  );
}

export default Deposit; 