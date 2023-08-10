var content = document.getElementById('content');
var send = document.getElementById('send');

send.addEventListener('click', function(e){

    e.preventDefault();
    var str = content.value;
    var xhr = new XMLHttpRequest();
    xhr.open('post','/inputAJAX');
    xhr.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify({"value1":str});
    xhr.send(data);
    xhr.onload = function(){
        console.log(xhr.responseText);
    }
});
