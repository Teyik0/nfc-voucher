const dotenv = require('dotenv');
const { Web3 } = require('web3');
const { abi } = require('./abi.json');
var cors = require('cors');

const express = require('express');
const app = express();
app.use(express.json()); // Pour parser les corps de requêtes JSON
app.use(cors());
dotenv.config();
const port = 3002;

const alchemyUrl = process.env.ALCHEMY_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const web3 = new Web3(alchemyUrl);

const contractABI = abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const from = web3.eth.accounts.privateKeyToAccount(privateKey).address;

async function claimFunction(code, dest) {
  console.log('code', code);
  console.log('dest', dest);

  const claimData = contract.methods.claimVoucher(code, dest).encodeABI();
  const gasPrice = await web3.eth.getGasPrice();

  const transaction = {
    from,
    to: contractAddress,
    data: claimData,
    gas: 300000,
    gasPrice: gasPrice,
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    privateKey
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return receipt;
}

// Endpoint API pour faire le claim
app.post('/claim', async (req, res) => {
  const { code, dest } = req.body;
  try {
    const receipt = await claimFunction(code, dest);
    res.status(200).json({ message: 'Claim successful', receipt });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  claimFunction;
});
