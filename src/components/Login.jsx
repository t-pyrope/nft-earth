import { useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';

function Signin() {
	const { connectAsync } = useConnect();

	const handleAuth = async () => {
		const { account, chain } = await connectAsync({ connector: new InjectedConnector() });

		const userData = { address: account, chain: chain.id, network: 'evm' };

		console.log(userData)
	};
	
	return (
		<div>
			<button onClick={() => handleAuth()}>Authenticate via Metamask</button>
		</div>
	);
}

export default Signin;
