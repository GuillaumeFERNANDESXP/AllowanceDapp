	//Loading--------------------------------------------------
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
			statusELement.textContent = "Metamask is not loaded";
			const provider = window["ethereum"] || window.web3.currentProvider;

		} else {
			statusELement.textContent = "Metamask is loaded";
			console.log("page loaded");
		}
	});
	web3.eth.getAccounts(function (error, accounts) {
		if (error) {
			console.log(error);
		}
		$('#Account').val(accounts[0]);
		web3.eth.getBalance(accounts[0]).then(function (result) {
			console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
			$('#Balance').val(web3.utils.fromWei(result, 'ether'));
		});

	});



	$(document).ready(function () {
		console.log("ready!");

		if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
		} else {
			// set the provider you want from Web3.providers
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		/* Get Node Info */
		web3.eth.getNodeInfo(function (error, result) {
			if (error) {
				console.log("error", error);
			}
			else {
				console.log("result", result);
				$('#NodeInfo').val(result);
			}
		})
	});

	//Interacting with the smart contract --- TestTokenContract ---
	web3.eth.defaultAccount = web3.eth.accounts[0];

	//Abi of contract
	var tokenContract = new web3.eth.Contract([
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
]);


	//Address of this contract
	var token = tokenContract.at("0x82d4f4fa2bf857aec33f6d81ef4e3e52a1594df2"); //Token to allow
	
	/** --- Balance of the token ---
	 * Check balance of this token for _owner(address)
	 * token.balanceOf(address _owner) return value
	 */


	/** --- Allowance ---
	 * Check Allowance of this token for _owner(address), spender(address);
	 * Check how many token is possible to allow = set 00.00 token /(token.balanceOf(address_owner) - allowance in progress)
	 * 
	 * For setting : setAllowance
	 * token.Allowance(web.eth.account[0], input address _spender);
	 * 
	 * This value changes when approve or transferFrom are called.
	 * 
	 * IF I want to add a tx increaseAllowance() or for delete a tx decreaseAllowance() are a solution.
	 */

	/** -- Approval ---
	 * Check if address _spender is allowed to spend token of account[0] + define the event of approval
	 * function approve(address _spender, uint256 _value) returns (bool success)
	 *
	 * token.approve(param1, uint256 _value) returns bool success;
	 * param1 = address _spender 
	 * param2 = _value = 00.00 token (allowed before in allowance function)
	 */


//---------------
