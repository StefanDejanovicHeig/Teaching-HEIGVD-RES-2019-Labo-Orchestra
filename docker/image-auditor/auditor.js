// Protocol port
PROTOCOL_PORT_UDP = 9907;
// Protocol port TCP
PROTOCOL_PORT_TCP = 2205
// Multicast address
PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";

// UDP
const dgram = require('dgram');
// TCP
const net = require('net');
// Schedule | npm install node-schedule
var schedule = require('node-schedule');
var moment = require('moment');


// Set all instrument that have sound
var soundInstrument = new Map();
soundInstrument.set("ti-ta-ti", "piano");
soundInstrument.set("pouet", "trumpet");
soundInstrument.set("trulu", "flute");
soundInstrument.set("gzi-gzi", "violin");
soundInstrument.set("boum-boum", "drum");

const s = dgram.createSocket('udp4');
const serverTCP = net.createServer();
var musicianListen = new Map();

// Joining multicast to waiting information from udp server
s.bind(PROTOCOL_PORT_UDP, function() {
  console.log("Joining multicast group");
  s.addMembership(PROTOCOL_MULTICAST_ADDRESS);
});

// Get the message from server
s.on('message', function(msg, source) {
  console.log("Received:" + msg)
  var messageReceive = JSON.parse(msg);
  if(!musicianListen.has(messageReceive['uuid'])){
    musicianListen.set(messageReceive['uuid'], [soundInstrument.get(messageReceive['sound']), messageReceive['date'], moment()]);
  }
});

// Check all music that is listen
var checkDate = schedule.scheduleJob('*/5 * * * * *', function(){
  musicianListen.forEach(function([intrument, dateSent, dateReceived], uuid, mapObj){
    if(moment().diff(dateReceived, 'second') > 5){
      musicianListen.delete(uuid);
    }
  });
});

// Waiting for TCP conexion
serverTCP.listen(PROTOCOL_PORT_TCP, function() {
  console.log("Waiting for client TCP connexion");
});

// Send information to client
serverTCP.on('connection', function(socket){
  var tcpToSend = "[";
  musicianListen.forEach(function([instrument, dateSent, dateReceived], uuid, mapObj){
    tcpToSend += '{ "uuid": "' + uuid + '", "instrument" : "' + instrument + '", "activeSince" : "' + dateSent + '\" },';
                
  });
  tcpToSend = tcpToSend.substring(0, tcpToSend.length-1);
  tcpToSend += "]";
  console.log("Sending: " + tcpToSend)
  socket.write(tcpToSend);
  socket.end();
})