var Web3 = require('web3');
var IpfsApi = require('ipfs-api');

var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' });
var web3;
var arr;
var fileArray;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.personal.unlockAccount("0x8210e98d22a1decca92bd8d60f4f4d1ade27606c", "wassim", 6000);

var abi = [{ "constant": true, "inputs": [{ "name": "index", "type": "bytes32" }], "name": "getSecondPart", "outputs": [{ "name": "", "type": "bytes14" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "hasVoted", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "proposalHashFirst", "type": "bytes32" }, { "name": "proposalHashSecond", "type": "bytes14" }], "name": "addProposal", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "f", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "firstParts", "type": "bytes32[]" }], "name": "voteForProposal", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "best_4", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes32" }], "name": "proposalsHashes", "outputs": [{ "name": "", "type": "bytes14" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes32" }], "name": "proposalsWithVotes", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllProposals", "outputs": [{ "name": "", "type": "bytes32[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "", "type": "bytes32" }, { "indexed": false, "name": "", "type": "uint256" }], "name": "Show_hash", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "", "type": "bytes32[]" }], "name": "Show_best", "type": "event" }];
var Examcontract = web3.eth.contract(abi);
var contractInstance = Examcontract.at("0x1054B7E2FE1037038D5E3b2B1fEf8177AfF17Fb4");
console.log(Examcontract);

var targetDate = new Date("05/05/2018 14:46");

function getPropositions() {
    if (targetDate.getMinutes() >= new Date().getMinutes()) {
        console.log('getting files ....')
        contractInstance.getBestProposals.call({ from: web3.eth.accounts[0], gas: 3000000 },
            function (err, res) {
                arr = res;
                res.forEach((el, index) => getFile(el, index))
            });
    }
}


function getFile(firstPart , index) {
    //get the second part
    console.log('getting the second part : of' + firstPart)
    contractInstance.getSecondPart.call(firstPart, { from: web3.eth.accounts[0], gas: 3000000 },
        function (err, secondPart) {
            console.log('getting the file : of' + firstPart + secondPart)
            ipfs.files.cat('/ipfs/' + web3.toAscii(firstPart) + web3.toAscii(secondPart), function (err, file) {
                if (err) console.log(err)
                console.log('we got a file : ' + file)
                fileArray.push(file);
                console.log("doing some magic")
            });
        });
}



getPropositions();


//getBestProposals -> best4

//if date = targetDate
//tx1 = GET : best_4 
//tx2 = GET : secondPart(best_4)
//ipfs.cat(best_4)
//some magic (to figure out LATER)
//ipfs.add(exam)
//tx3 =  POST : exam and POST to centers