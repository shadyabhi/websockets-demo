$(function(){
  ws = new WebSocket("ws://localhost:8080");

  ws.onmessage = function(evt) {
    if ($('#alerts tbody tr:first').length > 0){
      $('#alerts tbody tr:first').before('<tr><td>' + evt.data + '</td></tr>');
    } else {
      $('#alerts tbody').append('<tr><td>' + evt.data + '</td></tr>');
    }
    msg = evt.data;
    //for (i=0;i<a.length;i++) { console.log(a.charCodeAt(i)); }
    //var obj = jQuery.parseJSON(msg);
    var obj = json_parse(msg);
    alert(obj.severity);
  };

  ws.onclose = function() {
    ws.send("Leaves the chat");
  };

  ws.onopen = function() {
    ws.send("Join the chat");
  };

});
