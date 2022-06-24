const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Criando um contrato Fabrica
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

    // Criando uma Campanha
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    //  Recupera o endereço das Campanhas que estão implantadas
    // const addresses = await factory.methods.getDeployCampaigns().call();
    // campaignAddress = addresses[0];

    // Modo mais elegante retorna o primeiro elemento da matriz
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires a minumum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('allows s manager to make a paymant request', async () => {
        await campaign.methods
        .createRequest('Buy batteries', '100', accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });
        const request = await campaign.methods.requests(0).call();

        assert.equal('Buy batteries', request.description);
    });

    it('should process requests', async () => {
    let balance = await web3.eth.getBalance(accounts[7]);
    balance = web3.utils.fromWei(balance, 'ether');
    startBalance = parseFloat(balance);

    await campaign.methods.contribute().send({
      from: accounts[6],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('Buy Widgets', web3.utils.toWei('5', 'ether'), accounts[7])
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    await campaign.methods
      .approveRequest(0)
      .send({
        from: accounts[6],
        gas: '1000000'
      });

    await campaign.methods
      .finalizeRequest(0)
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    balance = await web3.eth.getBalance(accounts[7]);
    balance = web3.utils.fromWei(balance, 'ether');
    endBalance = parseFloat(balance);
    console.log(endBalance);

    assert(endBalance = startBalance + 5);
  });

});
