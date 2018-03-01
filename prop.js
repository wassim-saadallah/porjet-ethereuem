var srcContent;
var name;
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
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