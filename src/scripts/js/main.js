// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
 

btn.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
//--------------------//
//Allowance DApp would like to connect to your account
ethereum.enable();
/* Loading Test  */
function isWeb3Available() {
	return typeof window.web3 !== "undefined";
}
function isEthereumAvailable() {
	return typeof window.ethereum !== "undefined";
}
document.addEventListener("DOMContentLoaded", function () {
	var statusELement = document.querySelector("#status");
	console.log(isEthereumAvailable() ? "Ethereum is available" : "No ethereum");
	console.log(isWeb3Available() ? "Web3 is available" : "No web3");

	if (!isWeb3Available() || !isEthereumAvailable()) {console.log("Metamask is not loaded");
		const provider = window["ethereum"] || window.web3.currentProvider;}
		else {console.log("page loaded" + "Metamask is loaded");}
}); 
//ETHER TOKEN 
web3.eth.getAccounts(function (error, accounts) {
	if (error) {console.log(error);}
	$('#Account').val(accounts[0]);
	web3.eth.getBalance(accounts[0]).then(function (result) {
		console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
		$('#BalanceEth').text(web3.utils.fromWei(result, 'ether'));
	});
});

$(document).ready(function () {
	console.log("ready!");
	if (typeof window !== 'undefined') {
        if(window.web3 !== 'undefined'){
			const provider = new Web3.providers.HttpProvider(
                'https://ropsten.infura.io/v3/9e21dc77472b4080bda47efba7ed3065'); //API key Infura
            web3 = new Web3(provider);
        } else{web3 = new Web3(window.web3.currentProvider);}
    } else {const provider = new Web3.providers.HttpProvider(
			'https://ropsten.infura.io/v3/9e21dc77472b4080bda47efba7ed3065'); // API key Infura
        web3 = new Web3(provider);
    };	/* Get Node Info */
	web3.eth.getNodeInfo(function (error, result) {
		if (error) {console.log("error", error);}
		else {console.log("result", result);}
		startApp();
	})
});

//Interacting with the smart contract --- TestTokenContract on the ropstenNetwork ---

function startApp(){

	var account = web3.eth.accounts[0]
	var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "version",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
	const contract = new web3.eth.Contract(contractABI);
	const _contractAddress = '0x15699bdb2d9fff24b29c7554be64d88ba820c37b';

	var myContractInstance = new web3.eth.Contract(contractABI, _contractAddress);

	myContractInstance.methods.name().call(function(error, result){ 
		if(error){console.error(error);}
		if (result){console.log("Nom du coin demandé :" + result);}
	});

	myContractInstance.methods.symbol().call(function(error, symbol){
		if(error){console.log(error)};
		if(symbol){console.log("Symbol du token :" + symbol)};
		$('#symbolOfToken').text(symbol);
	})
	myContractInstance.methods.balanceOf('0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54').call(function(error, balance){
		if(error){console.log(error)};
		if(balance){console.log("Balance of the token is :"+ balance )};
		$('#balanceOfToken').text(balance);
	})
	myContractInstance.methods.allowance('0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54', '0x92a441d4b29688B5f1926b2f6870b93910DFbe99').call(function(error, allowance){
		if(error){console.log(error)};
		if(allowance){console.log("allowance for this address :"+ allowance)};
		$('#allowanceAmount').text(allowance);
	})

	var allowanceAmount=$('#allowanceTo').val();
	myContractInstance.methods.approve('0x92a441d4b29688B5f1926b2f6870b93910DFbe99', allowanceAmount).call(function(error, approve){
	if(error){console.log(error)};
	if(approve){console.log("allowance for this address :"+ approve)};
	//$('#allowanceAmount').text(allowance);
})
	$("#myBtn" ).click(function() {
	var allowanceAmount=$('#allowanceTo').val();
	myContractInstance.methods.approve('0x92a441d4b29688B5f1926b2f6870b93910DFbe99', allowanceAmount).call(function(error, approve){
			if(error){console.log(error)};
			if(approve){console.log("allowance for this address :"+ approve)};
			//$('#allowanceAmount').text(allowance);
	})})};


	
	







/** -- Approval ---
 * Check if address _spender is allowed to spend token of account[0] + define the event of approval
 * function approve(address _spender, uint256 _value) returns (bool success)
 *
 * token.approve(param1, uint256 _value) returns bool success;
 * param1 = address _spender
 * param2 = uint256 _value = 00.00 token (allowed before in allowance function)
 */

 //This function is just being used to make an entry to the allowance array when another contract want to spend some tokens. _ spender is the address of the contract which is going to use it.
 // _value denotes the number of tokens to be spend

 



/** Documentation *
 * 
You aren't creating the contract object correctly. What version of Web3.js are you using? 1.0 or 0.2.x? Here is how you do it for each:

1.0: var myContract = new web3.eth.Contract(abi, "0x2a2a7c53a6cc3d775e80c38d0fc446e73078902f")

0.2.x: var myContract = web3.eth.contract(abi).at("0x2a2a7c53a6cc3d775e80c38d0fc446e73078902f")
 https://nuclearcryptobuddha.blog/2017/06/how-to-send-receive-and-check-balance-of-erc20-tokens-using-geth/
 https://github.com/danfinlay/human-standard-token-abi
 https://ropsten.etherscan.io/token/0xcfd76dacc71f65ad1137f9405ed8c25c9739ea9e?a=0xc3d309eca484db05655ad86d317c3c3ac8121d54#readContract
https://ethereum.stackexchange.com/questions/12852/could-somebody-please-explain-in-detail-what-this-ethereum-contract-is-doing
https://medium.com/coinmonks/interacting-with-ethereum-smart-contracts-through-web3-js-e0efad17977
https://hackernoon.com/https-medium-com-momannn-live-testing-smart-contracts-with-estimategas-f45429086c3a
https://ethereum.stackexchange.com/questions/46383/solidity-web3-token-balance
doc sur front attack Vector https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/edit?source=post_page---------------------------#
*/