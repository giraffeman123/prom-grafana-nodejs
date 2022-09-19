var express = require('express');
var app = express();
const {register,httpRequestDurationMicroseconds} = require('./monitor/monitor.app');

app.get('/metrics', async (req, res) => {
    // Start the timer
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;
  
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  
    // End timer and add labels
    end({ route, code: res.statusCode, method: req.method });
  });


app.get('/monitor-app/home',async(req,res) => {
    // Start the timer
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;    

    res.status(200).json('Welcome to binary permutation app!');

    // End timer and add labels
    end({ route, code: res.statusCode, method: req.method });
});

app.get('/monitor-app/binaryPermutation/:number', async(req,res) => {
    // Start the timer
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;    

    var number = parseInt(req.params.number);
    if(number <= 0)
        res.status(400).json('not positive number');
    else{
        binaryPermutation("",number);
        res.status(200).json(binaryResult);
    }    
    // End timer and add labels
    end({ route, code: res.statusCode, method: req.method });    
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
    console.log('Example app listening on port 8080!');
});