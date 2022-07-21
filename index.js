const express = require("express");
const Web3 = require("web3");
const axios = require('axios').default;
const app = express();

let ERC721Abi = [
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "owner",
    "type": "address"
    }
    ],
    "name": "balanceOf",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "name",
    "outputs": [
    {
    "internalType": "string",
    "name": "",
    "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "owner",
    "outputs": [
    {
    "internalType": "address",
    "name": "",
    "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
    }
    ],
    "name": "ownerOf",
    "outputs": [
    {
    "internalType": "address",
    "name": "",
    "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "symbol",
    "outputs": [
    {
    "internalType": "string",
    "name": "",
    "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
    }
    ],
    "name": "tokenURI",
    "outputs": [
    {
    "internalType": "string",
    "name": "",
    "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
];


let networks={
    "avalanche":{
        rpc:"https://api.avax.network/ext/bc/C/rpc",
        chainid:43114
    },
    "avax":{
        rpc:"https://api.avax.network/ext/bc/C/rpc",
        chainid:1
    },
    "polygon":{
        rpc:"https://polygon-rpc.com/",
        chainid:137
    },
    "eth":{
        rpc:"https://mainnet.infura.io/v3/560197205dd84135833248bff69256ea",
        chainid:1
    },
    "ethereum":{
        rpc:"https://mainnet.infura.io/v3/560197205dd84135833248bff69256ea",
        chainid:1
    },
    "swimmer":{
        rpc:"https://avax-cra-rpc.gateway.pokt.network/",
        chainid:73772
    }
}


router.get("/getMetadata/:network/:contract/:tokenid", async (req, res, next) => {
try {

    let web3 = new Web3(networks[(req.params.network).toLowerCase()].rpc);
    let contract = new web3.eth.Contract(ERC721Abi,req.params.contract);
    const data = await contract.methods.tokenURI(req.params.tokenid).call();
    let metadatauri=data;
    if (metadatauri.includes("ipfs://")){
        metadatauri = metadatauri.replace("ipfs://","https://ipfs.moralis.io:2053/ipfs/");
    }
    let metadata = await axios.get(metadatauri);
    let metadataimage = metadata.data.image;

    if (metadataimage.includes("ipfs://")){
        metadataimage = metadataimage.replace("ipfs://","https://ipfs.moralis.io:2053/ipfs/");
    }
    if (metadataimage.includes("https://ipfs.io/ipfs/")){
        metadataimage = metadataimage.replace("https://ipfs.io/ipfs/","https://ipfs.moralis.io:2053/ipfs/");
    }

    let result = {
        "metadatauri":metadatauri,
        "metadataimage":metadataimage,
        "metadata":metadata.data,
    }

    res.send(result);

} catch (err) {
    next(err);
}
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Example app listening!`)
);
module.exports = app;
