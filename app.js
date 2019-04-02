/*function sayHello(name){
    console.log('Hello' + name);
}
sayHello('Shahshank');
var log = require('./logger')
console.log(module);
log('Here is Shashank');
console.log(log); 
log('here is Shashank');
const path = require('path');
var pathObj=path.parse(__filename);
console.log(pathObj);
const os = require('os');
var totalMem = os.totalmem();
var freeMem = os.freemem();
console.log(totalMem);
console.log(freeMem);
const fs = require('fs');
const files = fs.readdirSync('./')
console.log(files);
fs.readdir('$',function(err,files){
    if(err) console.log('Error', err);
    else console.log('Result', files);
});

const EventEmitter  = require('events');
  

 
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) =>{
    console.log('Listener called', arg);
});
logger.log('message');*/  

const http = require('http');
const server = http.createServer((req,res) =>{
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }
    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
   

server.on('connection', (socket) =>{
    console.log('new connection');  //handling event at server
});
server.listen(4000);
console.log('listening on port 4000...');
