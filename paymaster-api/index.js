const dotenv = require('dotenv');
const { Web3 } = require('web3');
const { abi } = require('./abi.json');

const express = require('express');
const app = express();
app.use(express.json()); // Pour parser les corps de requêtes JSON
dotenv.config();
const port = 3000;

const alchemyUrl = process.env.ALCHEMY_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;


// Configuration du fournisseur Web3
const web3 = new Web3(alchemyUrl);

// Informations sur le contrat
const contractABI = abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const from = web3.eth.accounts.privateKeyToAccount(privateKey).address;

// Fonction pour faire un claim
async function claimFunction(code,dest) {

    console.log("code",code);
    console.log("dest",dest);

    const claimData = contract.methods.claimVoucher(code,dest).encodeABI();
    const gasEstimate = await contract.methods.claimVoucher(code,dest).estimateGas({from});
    
    // Obtenir les prix actuels du gas
    const gasPrice = await web3.eth.getGasPrice();
    const { maxPriorityFeePerGas } = await web3.eth.getBlock("latest");


 
    const transaction = {
        from,
        to: contractAddress,
        data: claimData,
        gas: 300000,
        gasPrice: gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt;
}

// Endpoint API pour faire le claim
app.post('/claim', async (req, res) => {
    const { code, dest } = req.body;
    try {
        const receipt = await claimFunction(code,dest);
        res.json({ receipt });
    } catch (error) {

        if (error.message="Error happened while trying to execute a function inside a smart contract"){
            res.status(500).json({ error: "bad code" });

        }else{
            res.status(500).json({ error: "good" });
        
        }
        

    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    claimFunction

});
