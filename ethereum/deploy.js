const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
// const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  '(Digite aqui as palavas chave da sua carteira)',
  'https://rinkeby.infura.io/v3/3effaa658621463a9a4daa7b247e877a'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attemping to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: '0x' + compiledFactory.bytecode })
  .send({ gas: '1000000' , from: accounts[0] });

  //const result = await new web3.eth.Contract(JSON.parse(interface))
  //   .deploy({data: '0x' + bytecode, arguments: ['Olá!']}) // add 0x bytecode
  //   .send({from: accounts[0]}); // remove 'gas'

  // console.log(interface);
  console.log('Contract deployed to: ', result.options.address);
};
deploy();
