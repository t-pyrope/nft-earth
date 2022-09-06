import { Moralis } from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { earth_contracts } from '../utils.js';
import { useMoralisCloudFunction } from 'react-moralis';
import { ethers } from 'ethers';
import { Button } from '@mui/material'

// minting contract interaction
async function mint(){
    const abi          = chains.rinkeby.ABI; // Add ABI
    const functionName = 'mint';
    const address      = chains.rinkeby.ADDRESS;
    const chain        = EvmChain.RINKEBY;
    const params       = {
                            uri: metadata,
                            price: '100000000000000', // 0.0001 RinkebyETH
    };

    await Moralis.start({
        apiKey: import.meta.env.VITE_CLI_APP_SECRET,
    });

    const response = await Moralis.EvmApi.native.runContractFunction({
        abi,
        functionName,
        address,
        chain,
    });
    console.log(response.result);
}

// petar's hash function
function finalHash( tileString ){
    // let plotView = [];
    let plotView = [ tileString ];
    let hashStore=[];
    let hashedArrAsString;
    let plotID;
    let nftObject;

    for (let i = 0; i < plotView.length; i++) {
        let hash = ethers.utils.id((plotView[i]));
        hashStore.push(hash);
    }

    hashedArrAsString = hashStore.join("");
    plotID = ethers.utils.id(hashedArrAsString);
    console.log(plotID);
    nftObject = Object.assign({}, hashStore);
    nftObject.masterHash = plotID;
    console.log(nftObject);

    return nftObject;
}


// Claim Tile Button
export const ClaimTileButton ( props ) => {
    // moralis cloud function that saves data to database
    const { fetch:save, data, error } = useMoralisCloudFunction(
        'registerTile', {pickedTile: finalHash, autoFetch:false}
    );
    // trigger the saving function once after the hash is ready
    useEffect(()=>{
        save();
    },[finalHash]);
    // log and return the result
    console.log("Tile saved for the user:", null ?? data);

    return <>
        <Button
            onClick={props.onClick, ()=>{ finalHash(props.tileString) }}
            color={props.color}
            variant={props.variant}
            size={props.size}
        >
            {children}
        </Button>
    </>
}


// Claim Land Button
export const ClaimLandButton = ( props ) => {
    const [hash, setHash] = useState('');

    finalHash(props.stringToHash);

    useEffect(()=>{
        setHash()
    },[finalHash]);

    return <>
        <Button
            onClick={props.onClick}
            color={props.color}
            variant={props.variant}
            size={props.size}
        >
            {children}
        </Button>
    </>
}
