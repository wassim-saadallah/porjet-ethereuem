// var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' });
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// web3.personal.unlockAccount("0xc98c1f7189f89aa37993063096acc1a090cf8f3e", "hamza123", 6000);

//var config = require('./config');

var srcContent;
var reader;
var name;
var arr;
// var abi = [{"constant":false,"inputs":[{"name":"proposalHashFirst","type":"bytes32"},{"name":"proposalHashSecond","type":"bytes14"}],"name":"addProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"f","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"bytes32"}],"name":"showProposals","outputs":[{"name":"","type":"bytes14"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"showFullProposals","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"bytes32"},{"indexed":false,"name":"","type":"uint256"}],"name":"Show_hash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"bytes32[]"}],"name":"Show_best","type":"event"}];
// var Examcontract = web3.eth.contract(abi);
// var contractInstance = Examcontract.at("0x8089892aEFF19674742afD0ba25DB1E54D32B3C7");


function showHashes(arr){
    var divs = arr.map((elem,i) => `<div class="list-group">
    <div class="input-group mb-3">
        <a href="#" id="${web3.toAscii(elem)}" class="list-group-item">Proposition ${i}</a>
      </div>
</div>`).reduce((p, c) => p + c, "");
    $("#hashesContainer").append(divs);
}


function showFile(hashHexed){
    contractInstance.getSecondPart.call(hashHexed,{ from: web3.eth.accounts[0], gas: 3000000 },
    function(err, res){
        console.log(hashHexed + "--" +  res);
        ipfs.files.cat('/ipfs/'+web3.toAscii(hashHexed) + web3.toAscii(res), function(err, file){
            if(err) console.log(err)
           // console.log('we got a file : ' + file.toString())
             $('#displayFile').attr('data', file.toString('utf8'));
        });
    })

    
}

// $('#submit').click(function () {
//     var chkArray = [];
//     $("#hashesContainer input:checked").each(function(){
//         chkArray.push($(this).val());
//        // console.log("123");
//     });
    
//     console.log(chkArray);

//     contractInstance.voteForProposal(chkArray, {from: web3.eth.accounts[0] , gas: 3000000}, function(err, res){
//         if(err) console.log(err);
//         console.log(res);
//     });
// })


contractInstance.getBestProposals.call({ from: web3.eth.accounts[0], gas: 3000000 },
    function (err, res) { 
        arr = res;
        showHashes(res)
        var children    = $('#hashesContainer').children();
        for(var i = 1; i < children.length; i++){
            children[i].querySelector("a").addEventListener("click", function(e){
                //console.log(web3.fromAscii(e.target.id))
                showFile(web3.fromAscii(e.target.id));
            })
        }
     });


