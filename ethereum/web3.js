import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);


let web3;

// Checking to see if code is on a server or a browser
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {

    window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);

    // console.log('metamask enabled');
} else {
    // we are on the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/3effaa658621463a9a4daa7b247e877a'
    );
    web3 = new Web3(provider);

    // console.log('infura enabled');
}

export default web3;


// let web3;
//
// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//     // We are in the browser and metamask is running.
//    web3 = new Web3(window.ethereum);
//    console.log("aquii")
// } else {
//    // We are on the server *OR* the user is not running metamask.
//    const provider = new Web3.providers.HttpProvider(
//      'https://rinkeby.infura.io/v3/3effaa658621463a9a4daa7b247e877a'
//    );
//    web3 = new Web3(provider);
// }
//
// export default web3;
