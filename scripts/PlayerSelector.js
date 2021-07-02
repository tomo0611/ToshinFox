var url = window.location.href;

if(url.includes("https://pos2.toshin.com/VODPAS/")){
    console.log("This is PlayPage!!");

    if(document.fdata != undefined){
        document.fdata.method="post";
        document.fdata.action="./PlayerSelector.aspx";
        document.fdata.target = "";
        document.fdata.submit();
    } /*else if(document.getElementById("asd") != null){
        var param = document.getElementById("asd").href.substring(59).replaceAll(",","&");
        console.log("link --> "+ "https://tomo0611.github.io/PlayerSelector.html?"+param);
        window.location.href = "https://tomo0611.github.io/PlayerSelector.html?"+param;
    }*/
}