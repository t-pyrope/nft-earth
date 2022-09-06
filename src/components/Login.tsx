import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button } from "@mui/material";

function Signin() {
  const { connectAsync } = useConnect();

  const handleAuth = async () => {
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const userData = { address: account, chain: chain.id, network: "rinkeby" };

    console.log(userData);
  };

  return (
    <div>
      <Button onClick={() => handleAuth()}>Authenticate via Metamask</Button>
    </div>
  );
}

export default Signin;
