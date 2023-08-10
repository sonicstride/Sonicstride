var username = document.getElementById('username');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var send = document.getElementById('send');

send.addEventListener('click', function(e){

    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('post','/writeData');
    xhr.setRequestHeader("Content-type", "application/json");

    var data = JSON.stringify({"name":username.value, "phone":phone.value, "email":email.value});
    xhr.send(data);
    xhr.onload = function(){
        console.log(xhr.responseText);
    }
});
