
Context: 
User is a token holder and he needs to approve transfers (set allowances) on several tokens, for the same approved address (e.g. a DEX)
App in browser with metamask, user signed in with an address holding ETH and tokens.

inputs: 
- array of token addresses and decimals (global hardcoded list for now), 
- user address (from metamask provider),

compute:
check balance of user on each token,  make a list of available tokens
check allowance for inputaddress on each token
Apply decimals to all values meant for UI display, convert to uint256/BigNumber before calling smart contracts

User story:
The first thing I see on the page is a textfield asking for the address to approve.
Below it is a list view of all tokens I have in my wallet :
for each available token I can {
  -  read the current balance and allowance (textfield)
  + button to set allowance to unlimited (2^256)
  ++ display today’s equivalent ETH or USD value (approximate to nearest 0.1 ETH or 10 USD), unless unlimited, grabbing rates from any API like CMC or crypto compare.
}
If I modify an allowance, it’s bg changes color and info gets added to the transaction batch. Then:
A “tx box” appears at page right (panel maybe) to display new allowances and I see a “Set Allowances” button.
In the tx box I can now read: “Set `token.name` allowance to : `allowanceAmount`” + I get a flash message on first  occurrence saying: “You can add more token allowances to this transaction, then click the Set allowances button to generate, sign and send all transactions together.”

When I click the “set allowances” button, I get a prompt to sign the first transaction, and as soon as it is safely sent to a node, I get another prompt, etc.

When the last transaction is sent, I am forwarded to a page where all the tx hashes are listed, with tx info (token + old allowance + new allowance) and tx status for each.
