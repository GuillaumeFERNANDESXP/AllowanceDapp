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

	if (!isWeb3Available() || !isEthereumAvailable()) {
		console.log("Metamask is not loaded");
		const provider = window["ethereum"] || window.web3.currentProvider;

	} else {
		console.log("page loaded" + "Metamask is loaded");
	}
}); 
//ETHER TOKEN 
web3.eth.getAccounts(function (error, accounts) {
	if (error) {
		console.log(error);
	}
	$('#Account').val(accounts[0]);
	web3.eth.getBalance(accounts[0]).then(function (result) {
		console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
		$('#BalanceEth').text(web3.utils.fromWei(result, 'ether'));
	});
});

$(document).ready(function () {
	console.log("ready!");
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider); // Put infura or not?
	} else {
		// Provider of my choice
		web3 = new Web3(new Web3.eth.currentProvider); // Put infura or not?
	}
	web3 = new Web3(new Web3.eth.currentProvider);	/* Get Node Info */
	web3.eth.getNodeInfo(function (error, result) {
		if (error) {
			console.log("error", error);
		}
		else {
			console.log("result", result);
			$('#NodeInfo').val(result);
		}

		startApp();
	})
});



//Interacting with the smart contract --- TestTokenContract ---
var account = web3.eth.accounts[0]
var contractABI = [
	
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
			}
		  ],
		  "name": "approve",
		  "outputs": [
			{
			  "name": "success",
			  "type": "bool"
			}
		  ],
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
		  "type": "function"
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
		  "type": "function"
		},
		{
		  "constant": false,
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
		}
	  ]
const contractAddress = document.getElementById("contractAddress").value;
var tokenContract = new web3.eth.Contract(abi, contractAddress);

/** --- Balance of THIS token --- Todo: f() to apply to an another token
 * Check balance of this token for _owner(address)
 * token.balanceOf(address _owner) return value* 
 */

function startApp(){
// Get the token NAME
	tokenContract.name.call(function(err, name) { 
  if(err) { 
	  console.log(err) 
	}
  if(name) {
	console.log('The token name is: ' + name);
  $('#tokenName').val(name); }
})
 // Get the token SYMBOL
	tokenContract.symbol.call({from: addr}, function(err, symbol) {
	if(err) { 
		console.log(err) 
	}
	console.log('Token symbol: ' + symbol);
	$('#tokenSymbol').val(symbol);
  });

 // balanceOf  
  tokenContract.balanceOf.call(web3.eth.accounts[0], function(err, bal) {
	if (err) { 
		console.error(err) 
	}
	console.log('balance is ' + bal.toString(10));
	$('#balanceOfToken').val(bal);
  });
  //OU ? voir version web3
  tokenContract.balanceOf(account, function(err, ok) {console.log(err,ok.c[0])});

/** --- Allowance ---
 * Check Allowance of this token for _owner(address), spender(address);
 * Check how many token is possible to allow = set 00.00 token /(token.balanceOf(address_owner) - allowance in progress)
 * 
 * For setting : setAllowance
 * token.Allowance(web.eth.account[0], input address _spender);
 * 
 * This value changes when approve or transferFrom are called.
 * 
 * Think about DecreaseAllowance n' IncreaseAllowance
 */
//Only for visualisation of allowance
var spender = $('#AddressToApprove').val(); 
tokenContract.allowance.call(web3.eth.accounts[0], spender,  function (err, allow){
	if(err) {
		 console.log(err)
		}
	console.log('allowance for this' + allow.toString(10));
	$('#allowance').val(allow);
})
/**
 * allowance(address ownerAddress, address spenderAddress)
The allowance function tells 
how many tokens the ownerAddress HAS ALLOWED the spenderAddress to spend.
 */



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
allowAmount = document.getElementById("allowanceAmount").innerHTML
spender = document.getElementById("AddressToApprove").innerHTML
tokenContract.approve(spender, allowAmount, function(err, approval){
	if(err) {
		console.log(err)
	}
	console.log('boolean for this approval' + approval )
	$('#approval').val(approval);
})

}

 



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