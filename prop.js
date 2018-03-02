var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' });
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.personal.unlockAccount("0xc98c1f7189f89aa37993063096acc1a090cf8f3e","hamza123",6000);

var srcContent;
var reader;
var name;
var abi = [{"constant":false,"inputs":[{"name":"proposalHashFirst","type":"bytes32"},{"name":"proposalHashSecond","type":"bytes14"}],"name":"addProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"f","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"bytes32"}],"name":"showProposals","outputs":[{"name":"","type":"bytes14"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"showFullProposals","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"bytes32"},{"indexed":false,"name":"","type":"uint256"}],"name":"Show_hash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"bytes32[]"}],"name":"Show_best","type":"event"}];
var Examcontract = web3.eth.contract(abi);
var contractInstance = Examcontract.at("0x8089892aEFF19674742afD0ba25DB1E54D32B3C7");

function readURL(input) {
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            srcContent = e.target.result;
            name = input.files[0].name;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$(document).ready(function () {
    $("#file").change(function () {
        if (this.files[0].name != "") {
            readURL(this);
            console.log(this.files.length)
        }
    });
    $('#btnPrvw').click(function () {
        $('#displayFile').attr('data', srcContent);
    });
});

$('#submit').click(function (e) {
    const buf = buffer.Buffer(reader.result) // Convert data into buffer
    ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
            console.error(err)
            return
        }
        
        console.log(typeof(result[0].path))

        let firstPart = result[0].path.substring(0,32);
        let secondPart = result[0].path.substring(32,result[0].path.length);
        console.log(firstPart, secondPart)

        //console.error(hash)
        
        //web3.eth.sendTransaction()
        
        contractInstance.addProposal(firstPart,secondPart,{from: web3.eth.accounts[0] }, function(err, res){
            if(err) console.log(err);
            console.log(res);
        });

    })
})


