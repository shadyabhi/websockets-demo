$(function(){
  ws = new WebSocket("ws://localhost:8080");

  ws.onmessage = function(evt) {
    var msg = json_parse(evt.data);

    row = '<tr><td>' + msg.severity + '</td>' + '<td>' + msg.service + '</td>' + '<td>' + msg.description+ '</td>' + '<td>' + msg.server + '</td>'+ '<td>' + msg.source + '</td>' + '<td>' + msg.date + '</td>'  + '<td>' + msg.host_address + '</td>' + '<td>' + msg.additional_info + '</td>' + '<td>' + msg.event_type + '</td>' + '</tr>'
    if ($('#alerts tbody tr:first').length > 0){
      $('#alerts tbody tr:first').before(row);
    } else {
      $('#alerts tbody').append(row);
    }
  };

  ws.onclose = function() {
    ws.send("Leaves the chat");
  };

  ws.onopen = function() {
    ws.send("Join the chat");
  };

});
