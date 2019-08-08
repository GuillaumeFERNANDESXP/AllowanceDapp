// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn1");

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
/* ETHER TOKEN */
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
	var version = web3.version.api;
            /* A simple sample for retrieving the contractABI using Web3.js and Jquery to interact with a contract */
    $.getJSON('http://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', function (data) {
        var contractABI = "";
        contractABI = JSON.parse(data.result);
        if (contractABI != ''){
            var MyContract = new web3.eth.Contract(contractABI);
            var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
		
			var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715"); // Valid etherscan API key
            console.log("result1 : " + result);            
            var result = myContractInstance.members(1);
            console.log("result2 : " + result);
        } else {
            console.log("Error" );
        }            
    });
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
	const _contractAddress = '0x15699bdb2d9fff24b29c7554be64d88ba820c37b'; //OR const _contractAddress = $('#_contractAddress).val();
	var myContractInstance = new web3.eth.Contract(contractABI, _contractAddress);

	myContractInstance.methods.name().call(function(error, result){ 
		if(error){console.error(error);}
		if (result){console.log("Name of the token :" + result);}
	});

	myContractInstance.methods.symbol().call(function(error, symbol){
		if(error){console.log(error)};
		if(symbol){console.log("Token's symbol :" + symbol)};
		$('#symbolOfToken').text(symbol);
	})
	//balanceOf(address ownerAddress) or web3.eth.accounts[0]
	myContractInstance.methods.balanceOf('0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54').call(function(error, balance){
		if(error){console.log(error)};
		if(balance){console.log("Balance of the token is :"+ balance )};
		$('#balanceOfToken').text(balance);
	})

	// * Path By Default *

	//var allowanceAmount=$('#allowanceTo').val(); allowance(address ownerAddress, address spenderAddress)
	myContractInstance.methods.allowance('0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54', '0x92a441d4b29688B5f1926b2f6870b93910DFbe99').call(function(error, allowance){
		if(error){console.log(error)};
		if(allowance){console.log("allowance for this address :"+ allowance)};
		$('#allowanceAmount').text(allowance);
	})

	//approve(address spenderAddress, uint256 approveValue)
	$("#myBtn" ).click(function() {
		console.log("Start allowance");
	//web3.eth.accounts[0];
	//var allowanceAmount=$('#allowanceTo').val();
	//var _addressAllow = $('#_addressAllow').val();
	//var allowanceAmount = 300;
	myContractInstance.methods.approve('0x92a441d4b29688B5f1926b2f6870b93910DFbe99', 300).send({from:'0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54'}, function(error, approve){
			if(error){console.log(error)};
			if(approve){console.log("allowance for this address :"+ approve)};
			//$('#allowanceAmount').text(allowance);



	// * Path 2 Increase/DecreaseAllowance *
	
	// * For increaseAllowance * => REPLACE _APPROVE() <=
	//1st get amount of allowance
	myContractInstance.methods.allowance('0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54', '0x92a441d4b29688B5f1926b2f6870b93910DFbe99').call(function(error, allowance){
		if(error){console.log(error)};
		if(allowance){console.log("allowance for this address :"+ allowance)};
		$('#allowanceAmount').text(allowance);
		return allowanceAmount;
	})
	var _spender = $('addressSpender').val();
	var addAllowance = $('AddAllowance').val();
	var decreaseAllowance = $('decreaseAllowance').val();
	
	// => increaseAllowance 
	myContractInstance.methods.increaseAllowance( _spender, addAllowance).send({from:'0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54'}, function(error, increaseAllowance){
			if(error){console.log(error)};
			if(increaseAllowance){console.log("allowance for this address :"+ increaseAllowance)};
	// => decreaseAllowance 
			myContractInstance.methods.decreaseAllowance( _spender,  allowanceAmount).send({from:'0xC3d309EcA484Db05655Ad86D317c3C3ac8121D54'}, function(error, decreaseAllowance){
			if(error){console.log(error)};
			if(decreaseAllowance){console.log("allowance for this address :"+ decreaseAllowance)};
	})
})
});
})}	

	
 /* 
 * WARNING: Infura doesn't support sending non-raw transactions. See https://infura.io/docs/ethereum/json-rpc/eth_sendRawTransaction
 * So I have to:
 * 1. Prepare the transaction
 * 2. Sign it 
 * 3. Send it (using infura)
 * 
 */
	/**Pre-1.0 web3
	 * 
	 * web3.eth.getAccounts(function(error, accounts){
		if (error) throw error;
	
	myContractInstance.methods.Transfer("0x1BD9514B03292448efd0eFDb88CD4cd34BBBcf7E", 300)({from:"0x2a0a2c5029621007BC539152a87f547Af93326b7"}), function(error, txnHash){
		if (error) throw error;
		console.log(txHash);
	}});
	 *  
web3.eth.getAccounts().then((accounts) => {
		myContractInstance.methods.Transfer(
			"0x1BD9514B03292448efd0eFDb88CD4cd34BBBcf7E", 
			300).send({from:"0x2a0a2c5029621007BC539152a87f547Af93326b7"})
			.once('transactionHash', (hash) => {console.log(hash);  })
			.once('receipt', (receipt) => {console.log(receipt); }  )
	});
	 * */
//Issue: Error: Returned error: The method eth_sendTransaction does not exist/is not available
/**  
 * 
Version of web3.js 1.0 or 0.2.x? Here is how you do it for each:

=> 1.0: var myContract = new web3.eth.Contract(abi, "0x2a2a7c53a6cc3d775e80c38d0fc446e73078902f")

0.2.x: var myContract = web3.eth.contract(abi).at("0x2a2a7c53a6cc3d775e80c38d0fc446e73078902f")
contract.methods.transfer('0x497fe03ba1dabf3b391079e8f69eb178243a736b')
    .send({from:accounts[0]})
    .then(console.log)
    .catch(console.log)
 
	transferFrom(address fromAddress, address toAddress, uint256 numberOfTokens)
	TODO Monday 05/08 ethod eth_sendTransaction does not exist/is not available
*/

/**

 //sendRawTransaction 
 var rawTransaction ={
	 "from": "0x92a441d4b29688B5f1926b2f6870b93910DFbe99",
	 "nonce": web3.toHex(count),
	 "gasPrice": "0x04e3b29200",
	 "gasLimit":"0x7458",
	 "to":contractAddress,
	"value":"0x0",
	"data": myContractInstance.methods.transfer(destAdress, transferAmount).encodeABI(),
	"chainId":0x03,
 }
	myContractInstance.methods.transferFrom(fromAddress, toAddress, numberOfTokens).send({from:web3.eth.account[0]}, function(error, transferFrom){

	if(error){console.log(error)}
	if(transferFrom){console.log(transferFrom)}
 })
 

 or myContractInstance.methods.transfer.sendTransaction("0x1BD9514B03292448efd0eFDb88CD4cd34BBBcf7E", 300).send({from:"0x2a0a2c5029621007BC539152a87f547Af93326b7"}), function(error, txnHash){
	if (error) throw error;
	console.log(txHash);
 };
 */

