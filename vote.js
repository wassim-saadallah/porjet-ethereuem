var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' });
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.personal.unlockAccount("0xc98c1f7189f89aa37993063096acc1a090cf8f3e", "hamza123", 6000);

var srcContent;
var reader;
var name;
var abi = [{ "constant": false, "inputs": [{ "name": "proposalHash", "type": "bytes32" }], "name": "addProposal", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "f", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "showProposals", "outputs": [{ "name": "", "type": "bytes32[]" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "proposalHash", "type": "bytes32" }], "name": "voteForProposal", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "", "type": "bytes32" }, { "indexed": false, "name": "", "type": "uint256" }], "name": "Show_hash", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "", "type": "bytes32[]" }], "name": "Show_best", "type": "event" }];
var Examcontract = web3.eth.contract(abi);
var contractInstance = Examcontract.at("0x43615bc3336cdb6c36e344562a5c349583607258");


function showHashes(arr){
    var divs = arr.map(elem => `<div class="list-group">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" aria-label="Checkbox for following text input">
          </div>
        </div>
        <a href="#" class="list-group-item">${web3.toAscii(elem)}</a>
      </div>
</div>`).reduce((p, c) => p + c, "");
    console.log(divs)
    $("#hashesContainer").append(divs);
}

var result = contractInstance.showProposals.call({ from: web3.eth.accounts[0], gas: 3000000 },
    function (err, res) { showHashes(res) });
