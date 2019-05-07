// We use a standard Node.js module to work with UDP
const dgram = require('dgram');
// Let's create a datagram socket. We will use it to send our UDP datagrams
const s = dgram.createSocket('udp4');
// Protocol port
const PROTOCOL_PORT = 9907;
// Multicast address
const PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";

// Set all instrument that have sound
var soundInstrument = new Map();
soundInstrument.set("piano", "ti-ta-ti");
soundInstrument.set("trumpet", "pouet");
soundInstrument.set("flute", "trulu");
soundInstrument.set("violin", "gzi-gzi");
soundInstrument.set("drum", "boum-boum");

// Class Instrument who will assigne the sound of choosen intrument
function Instrument(name){
  this.instrument = name;
  this.sound = soundInstrument.get(name);
  Instrument.prototype.sendingSound = function(){
      // Define the instrument
    const instrumentDefine = new Instrument(process.argv[2]);
    
    // Convert the object to string
    const payload = JSON.stringify(instrumentDefine);
    
    // Create a measure object and serialize it to JSON
    // Send the payload via UDP (multicast)
    message = Buffer.from(payload);
    s.send(message, 0, message.length, PROTOCOL_PORT, PROTOCOL_MULTICAST_ADDRESS,
    function(err, bytes) {
    console.log("Sending payload: " + payload + " via port " + s.address().port);
    });
  }

  setInterval(this.sendingSound.bind(this), 1000);
}

// Check if the paramter is good
if(soundInstrument.has(process.argv[2])){
  var sound = new Instrument(process.argv[2]);
} else {
  console.log("Error with parameter " + process.argv[2]);
}
