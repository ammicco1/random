const express = require("express");
const server = express();

const port = process.argv[2] || 3000;

server.listen(port, function(){
    console.debug(`random listen on port ${port}`);
});

server.get("/", function(req, res){
    res.sendFile(`${__dirname}/views/index.html`);
});

server.get("/string", function(req, res){
    let len = parseInt(req.query.len) || 32;

    if(isNaN(len) || len == null || len == undefined || typeof len != "number"){
        len = 32;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?^+*#@.,:;-_$%&=";
    const charsLength = chars.length;
    
    let result = "";
    let counter = 0;
    
    while(counter < len){
        result += chars.charAt(Math.floor(Math.random() * charsLength));
        counter++;
    }
    
    res.send(result);
});

server.get("/int", function(req, res){
    let max = parseInt(req.query.max) || 10000;

    if(isNaN(max) || max == null || max == undefined || typeof len != "number"){
        max = 10000;
    }

    let num = Math.floor(Math.random() * max).toString();

    res.send(num);
});