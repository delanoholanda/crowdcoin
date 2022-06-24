'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const web3 = new Web3(window.web3.currentProvider);


var web3 = void 0;

// Checking to see if code is on a server or a browser
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {

    window.ethereum.enable();
    web3 = new _web2.default(window.web3.currentProvider);

    // console.log('metamask enabled');
} else {
    // we are on the server or the user is not running metamask
    var provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/v3/3effaa658621463a9a4daa7b247e877a');
    web3 = new _web2.default(provider);

    // console.log('infura enabled');
}

exports.default = web3;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFx3ZWIzLmpzIl0sIm5hbWVzIjpbIldlYjMiLCJ3ZWIzIiwid2luZG93IiwiZXRoZXJldW0iLCJlbmFibGUiLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQOzs7Ozs7QUFFQTs7O0FBR0EsSUFBSSxZQUFKOztBQUVBO0FBQ0EsSUFBSSxPQUFPLEFBQVAsV0FBa0IsQUFBbEIsZUFBaUMsT0FBTyxPQUFPLEFBQWQsU0FBdUIsQUFBNUQsYUFBeUUsQUFFckU7O1dBQU8sQUFBUCxTQUFnQixBQUFoQixBQUNBO1dBQU8sQUFBSSxBQUFKLGtCQUFTLE9BQU8sQUFBUCxLQUFZLEFBQXJCLEFBQVAsQUFFQTs7QUFDSDtBQU5ELE9BTU8sQUFDSDtBQUNBO1FBQU0sV0FBVyxJQUFJLGNBQUssQUFBTCxVQUFlLEFBQW5CLGFBQ2IsQUFEYSxBQUFqQixBQUdBO1dBQU8sQUFBSSxBQUFKLGtCQUFTLEFBQVQsQUFBUCxBQUVBOztBQUNIO0FBRUQ7O2tCQUFlLEFBQWY7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IndlYjMuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvRGVsYW5vL0Rlc2t0b3Ava2lja3N0YXJ0In0=