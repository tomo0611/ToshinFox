var url = window.location.href;

if (url.includes("https://pos.toshin.com/OPSTTS/OPSTTS_Student")) {
    console.log("This is 過去問二次ページ!!");

    forceOpenInNewTab();
}

function forceOpenInNewTab(){
    var links = document.getElementsByTagName("a");
    for(var i=0; i< links.length; i++){
        if(links[i].textContent == "戻る"){
            links[i].href="javascript:close();";
        } else if(links[i].href.includes("/OPSTTS/OPSTTS_Student/ZentaiRireki")|| links[i].href.includes("/OPSTTS/OPSTTS_Student/KozaTop") || links[i].textContent == "取得講座一覧へ"){
            // 変更なし
        } else {
            links[i].target = "_blank";
        }
    }

    var forms = document.getElementsByTagName("form");
    for(var i=0; i< forms.length; i++){
        if(forms[i].action == "https://pos.toshin.com/OPSTTS/OPSTTS_Student/EnshuKaishi"){
            forms[i].target = "_blank";
        }
    }

    var buttons = document.getElementsByTagName("button");
    for(var i=0; i< buttons.length; i++){
        if(buttons[i].value.includes("/OPSTTS/OPSTTS_Student/KaitoYoshiInsatsu?EnshuSetId=")){
            buttons[i].value = "/OPSTTS/OPSTTS_Student/Contents/GetAnswerSheetPdf?" + buttons[i].value.split("?")[1];
        }
    }

}