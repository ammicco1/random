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

    if(isNaN(len) || len == null || len == undefined){
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

    if(isNaN(max) || max == null || max == undefined){
        max = 10000;
    }

    let num = Math.floor(Math.random() * max).toString();

    res.send(num);
});

server.get("/json", function(req, res){
    let max = Math.floor(Math.random() * 15);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charsLength = chars.length;
    
    let str, str2;
    let counter;
    let choise;

    let json = {}; 
    
    while(max == 0){
        max = Math.floor(Math.random() * 15);
    }

    for(i = 0; i < max; i++){
        str = "";
        counter = 0;

        while(counter < 6){
            str += chars.charAt(Math.floor(Math.random() * charsLength));
            counter++;
        }

        choise = Math.floor(Math.random() * 10);

        switch(choise % 3){
            case 0: json[str] = Math.floor(Math.random() * 1000); break;
            case 1: str2 = "";
                counter = 0;

                while(counter < 10){
                    str2 += chars.charAt(Math.floor(Math.random() * charsLength));
                    counter++;
                }

                json[str] = str2; break;
            case 2: let array = [];
                let alen = Math.floor(Math.random() * 10);

                for(i = 0; i < alen; i++){
                    if(Math.floor(Math.random() * 10) % 2 == 0){
                        array.push(Math.floor(Math.random() * 1000));
                    }else{
                        var str3 = "";
                        let c = 0;

                        while(c < 8){
                            str3 += chars.charAt(Math.floor(Math.random() * charsLength));
                            c++;
                        }
                    }

                    array.push(str3);
                }

                json[str] = array; break;
        }
    }

    res.send(json);
});
