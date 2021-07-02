document.body.style.border = "5px solid red";

function allowFullScreenForiframe(){
    var iframes = document.getElementsByTagName("iframe");
    console.log("iframe found!!");
    for(var i=0; i< iframes.length; i++){
        iframes[i].allowFullscreen = true;
        iframes[i].webkitallowfullscreen = true;
        iframes[i].mozallowfullscreen = true;
    }
}

allowFullScreenForiframe();

console.log("allowFullScreenForiframe()");