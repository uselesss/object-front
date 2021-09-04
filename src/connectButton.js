import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";

import { Button } from "@material-ui/core";


function ConnectButton() {
  const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const web3 = useWeb3();

  // get user account on button click
  const getUserAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        web3.eth.getAccounts().then(accounts => {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Metamask extensions not detected!");
    }
  };

  const updateBalance = async fromAddress => {
    await web3.eth.getBalance(fromAddress).then(value => {
      setBalance(web3.utils.fromWei(value, "ether"));
    });
  };

  function renderIfTrue (props) {
    const isTrue = props.isTrue;
    console.log(isTrue);
    if (!isTrue) {
      return(<Button
        onClick={() => getUserAccount()}
        variant="outlined"
        color="primary"
        >
        Подключить кошелек
        </Button>);
    }
  }

  return (
    <renderIfTrue isTrue={false} />
  );
}

export default ConnectButton; 