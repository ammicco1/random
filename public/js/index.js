function addElement(){
    var newDiv = document.createElement("div");
    newDiv.className = "blink";
    newDiv.style.left = Math.floor(Math.random() * document.getElementsByTagName("html")[0].clientWidth) + "px";
    newDiv.style.top = Math.floor(Math.random() * document.getElementsByTagName("html")[0].clientHeight) + "px";
    
    document.getElementById("container").appendChild(newDiv);
}

for(i = 0; i < 50; i++){
    addElement();
}
