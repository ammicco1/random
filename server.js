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

        switch(choise % 4){
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
            case 3: 
                let max2 = Math.floor(Math.random() * 5);
                let str4, str5; 
                let counter2;
                let choise2;
                let out = {};

                for(i = 0; i < max2; i++){
                    str4 = "";
                    counter2 = 0;
        
                    while(counter2 < 6){
                        str4 += chars.charAt(Math.floor(Math.random() * charsLength));
                        counter2++;
                    }
        
                    choise2 = Math.floor(Math.random() * 10);
        
                    switch(choise2 % 3){
                        case 0: out[str4] = Math.floor(Math.random() * 1000); break;
                        case 1: str5 = "";
                            counter2 = 0;
        
                            while(counter2 < 10){
                                str5 += chars.charAt(Math.floor(Math.random() * charsLength));
                                counter2++;
                            }
        
                            out[str4] = str5; break;
                        case 2: let array2 = [];
                            let alen2 = Math.floor(Math.random() * 10);
        
                            for(j = 0; j < alen2; j++){
                                if(Math.floor(Math.random() * 10) % 2 == 0){
                                    array2.push(Math.floor(Math.random() * 1000));
                                }else{
                                    var str6 = "";
                                    let c2 = 0;
                                
                                    while(c2 < 8){
                                        str6 += chars.charAt(Math.floor(Math.random() * charsLength));
                                        c2++;
                                    }
                                }
                            
                                array2.push(str6);
                            }

                            out[str4] = array2;
                    }   
                } json[str] = out;
        }
    }

    res.send(json);
});
