// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('name'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      typing = document.getElementById('typing');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      name: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', function() {
  socket.emit('type', handle.value);  
})

// Listen for events
socket.on('chat', function(data){
    typing.innerHTML = ''; 
    output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
});

socket.on('type', function(data) {
  typing.innerHTML = '<p><em>'+data+' is typing...</em></p>';
})