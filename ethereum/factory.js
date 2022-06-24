import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x62418039d5bd8c5C68cb0D81B2416D0cFbBB7b57'
);

export default instance;
