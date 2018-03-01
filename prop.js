var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' });
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var srcContent;
var reader;
var name;
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
        web3.eth.sendTransaction()
        
    })
})


