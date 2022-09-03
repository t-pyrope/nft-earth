import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

const Login = () => {

	const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

	const afterAuthentication = (_user) => {
		console.log("User authenticated:", _user);
	}

	useEffect(() => {
		if (isAuthenticated) {
			afterAuthentication(user);
		}
	}, [isAuthenticated]);

	const logIn = async () => {
		if (!isAuthenticated) {

			await authenticate({ signinMessage: "Loggin in..." })
				.then((user) => {
					afterAuthentication(user);
				})
				.catch((error) => {
					console.error("authentication failed:", error);
				});
		}
	}

	const logOut = async () => {
		await logout();
		console.log("user logged out.");
	}

	return <>
		<button onClick={logIn}>Login</button>
	</>
}

export default Login;
