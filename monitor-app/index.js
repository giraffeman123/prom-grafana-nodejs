var express = require('express');
const requestIp = require('request-ip');
const {getIpv4} = require('./ip.utils');
var app = express();
const {register,httpRequestDurationMicroseconds} = require('./monitor/monitor.app');

app.get('/metrics', async (req, res) => {
    // Start the timer
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;
  
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  
    // End timer and add labels
    end({ route, code: res.statusCode, method: req.method, parameters: 'N/A' });
  });


app.get('/monitor-app/home',async(req,res) => {
    // Start the timer
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;    

    res.status(200).json('Welcome to binary permutation app!');

    // End timer and add labels
    end({ route, code: res.statusCode, method: req.method, parameters: 'N/A' });
});

app.get('/monitor-app/binaryPermutation/:number', async(req,res) => {
    // Start the timer
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;   
    var clientIp = getIpv4(requestIp.getClientIp(req)); 
    var cleanIp = clientIp !== null ? clientIp : 'Ip Retrieval Error';        
    
    var number = parseInt(req.params.number);
    var paramStr = 'number='+number;    
    if(number <= 0)
        res.status(400).json('not positive number');
    else{
        binaryPermutation("",number);
        res.status(200).json(binaryResult);
    }    
    // End timer and add labels        
    end({ route, code: res.statusCode, method: req.method, parameters: paramStr, clientIpv4: cleanIp });    
});

var binaryResult = [];
var binaryPermutation = function(combination, n){    
    if(combination.length == n)
        binaryResult.push(combination);
    else{
        binaryPermutation(combination+"0",n);        
        binaryPermutation(combination+"1",n);        
    }
}

app.listen(8080, function () {
    console.log('Example apsp listening on port 8080!');
});