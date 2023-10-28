const express = require("express");
const server = express();

const port = process.argv[2] || 3000;

server.use(express.static(`${__dirname}/public`));

server.listen(port, function(){
    console.debug(`random listen on port ${port}`);
});

server.get("/", function(req, res){
    console.log("request GET / ");

    res.sendFile(`${__dirname}/views/index.html`);
});

server.get("/string", function(req, res){
    let len = parseInt(req.query.len) || 32;

    if(isNaN(len) || len == null || len == undefined){
        len = 32;
    }

    console.log(`request GET /string?len=${len}`);

    res.send(genStr(len));
});

server.get("/int", function(req, res){
    let max = parseInt(req.query.max) || 10000;

    if(isNaN(max) || max == null || max == undefined){
        max = 10000;
    }

    console.log(`request GET /int?max=${max}`);

    res.send(Math.floor(Math.random() * max).toString());
});

server.get("/array", function(req, res){
    let type = req.query.type;
    let len = req.query.len; 
    let strlen = req.query.strlen;

    if(type == null || type == undefined){
        type = "mix";
    }    

    if(len == null || len == undefined){
        len = Math.floor(Math.random() * 100);
    }

    if(strlen == null || strlen == undefined || strlen < 1){
        strlen = -1;
    }

    console.log(`request GET /array?type=${type}?len=${len}?strlen=${strlen}`);

    res.send(genArray(len, type, strlen));
});

server.get("/json", function(req, res){
    let max = Math.floor(Math.random() * 15);    
    let str;
    let json = {}; 
    
    while(max == 0){
        max = Math.floor(Math.random() * 15);
    }

    console.log("request GET /json");

    for(i = 0; i < max; i++){
        str = genStr(6);

        switch(Math.floor(Math.random() * 10) % 4){
            case 0: json[str] = Math.floor(Math.random() * 1000); break;
            case 1: json[str] = genStr(10); break;
            case 2: json[str] = genArray(Math.floor(Math.random() * 10), "mix", -1); break;
            case 3: json[str] = genJson(Math.floor(Math.random() * 5)); break;
        }
    }

    res.send(json);
});

function genStr(len){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?^+*#@.,:;-_$%&=";
    const charsLength = chars.length;
    
    let result = "";
    let counter = 0;
    
    while(counter < len){
        result += chars.charAt(Math.floor(Math.random() * charsLength));
        counter++;
    }

    return result;
}

function genArray(len, type, strlen){
    let array = [];

    if(type == "int"){
        for(i = 0; i < len; i++){
            array.push(Math.floor(Math.random() * 1000));
        }
    }else if(type == "strings" || type == "string"){
        for(i = 0; i < len; i++){
            array.push(genStr(strlen > -1 ? strlen : 8));
        }
    }else{
        for(i = 0; i < len; i++){
            if(Math.floor(Math.random() * 10) % 2 == 0){
                array.push(Math.floor(Math.random() * 1000));
            }else{
                array.push(genStr(strlen > -1 ? strlen : 8));
            }
        }
    }

    return array;
}

function genJson(numObj){
    let out = {};
    let name;

    for(i = 0; i < numObj; i++){
        name = genStr(6);

        switch(Math.floor(Math.random() * 10) % 3){
            case 0: out[name] = Math.floor(Math.random() * 1000); break;
            case 1: out[name] = genStr(10); break;
            case 2: out[name] = genArray(Math.floor(Math.random() * 10), "mix"); break;
        }   
    } 

    return out;
}