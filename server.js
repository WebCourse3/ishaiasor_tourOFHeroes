const express = require('express');
const app = express();
const http = require('http').Server(app);

require('./heroes.js')(app);

app.use(express.static('public'));

module.exports = http.listen(3000, function(){
	console.log('listening on *:3000');
});
