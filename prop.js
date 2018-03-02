var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' });
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.personal.unlockAccount("0xb9707f8a8ccdd83fca58d8c5642e6e4ff1c14126","hamza123",3600);

var srcContent;
var reader;
var name;
var abi = [{"constant":false,"inputs":[{"name":"proposalHash","type":"bytes32"}],"name":"addProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"f","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"bytes32"},{"indexed":false,"name":"","type":"uint256"}],"name":"Show_hash","type":"event"}];
var Examcontract = web3.eth.contract(abi);
var conractInstance = Examcontract.at("0x5197263ed86d1ccae941aff6faf24945e5b470e0");
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
        let hash = result[0].hash;
        //console.error(hash)
        
        //web3.eth.sendTransaction()
        
        conractInstance.addProposal(hash,{from: web3.eth.accounts[0] }, function(err, res){
            if(err) console.log(err);
            console.log(res);
        });

    })
})


