export const earth_contracts = {
    eth: {
        CHAIN_ID: '0x1',
        ADDRESS: '',
        ABI: [],
    },
    rinkeby: {
        CHAIN_ID: '0x4',
        ADDRESS: '0x7BD192b2bdd38514D4B1717B9719E7F762d5ad0c',
        ABI: [
            {
                inputs: [],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'approved',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'Approval',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'bool',
                        name: 'approved',
                        type: 'bool',
                    },
                ],
                name: 'ApprovalForAll',
                type: 'event',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'string',
                        name: 'uri',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'price',
                        type: 'uint256',
                    },
                ],
                name: 'buy',
                outputs: [],
                stateMutability: 'payable',
                type: 'function',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'Transfer',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'token_id',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'uri',
                        type: 'string',
                    },
                    {
                        indexed: false,
                        internalType: 'address',
                        name: 'minter',
                        type: 'address',
                    },
                ],
                name: 'itemCreated',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'uri',
                        type: 'string',
                    },
                    {
                        indexed: false,
                        internalType: 'address',
                        name: 'picker',
                        type: 'address',
                    },
                ],
                name: 'itemPicked',
                type: 'event',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'safeTransferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                name: 'safeTransferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        internalType: 'bool',
                        name: 'approved',
                        type: 'bool',
                    },
                ],
                name: 'setApprovalForAll',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'transferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                ],
                name: 'balanceOf',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'getApproved',
                outputs: [
                    {
                        internalType: 'address',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                ],
                name: 'isApprovedForAll',
                outputs: [
                    {
                        internalType: 'bool',
                        name: '',
                        type: 'bool',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                name: 'Items',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'uri',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'name',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ownerOf',
                outputs: [
                    {
                        internalType: 'address',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'bytes4',
                        name: 'interfaceId',
                        type: 'bytes4',
                    },
                ],
                name: 'supportsInterface',
                outputs: [
                    {
                        internalType: 'bool',
                        name: '',
                        type: 'bool',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'symbol',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'tokenURI',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ],
    },
    cronos: {
        CHAIN_ID: '0x19',
        ADDRESS: '',
        ABI: [],
    },
    cronos_testnet: {
        CHAIN_ID: '0x152',
        ADDRESS: '',
        ABI: [],
    },
    polygon: {
        CHAIN_ID: '0x89',
        ADDRESS: '',
        ABI: [],
    },
    mumbai: {
        CHAIN_ID: '0x13881',
        ADDRESS: '',
        ABI: [],
    },
}
