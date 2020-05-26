document.body.style.border = "5px solid red";

var url = window.location.href;

console.log(url);

if (url.indexOf("https://pos.toshin.com/DRM2/") != -1) {
    console.log("This is PlayPage");
    var player = document.getElementById("frmRedirector");
    console.log(player);
    var contentURL = player.getAttribute("action");
    contentURL += "&dummyuseragent=&SmartDevicePlayFlag=y";
    var contentslist = document.getElementById("contentslist").value;
    contentURL += "&contentslist=" + encodeURIComponent(contentslist);
    console.log(contentURL);
    var ifViewer = document.getElementById("ifViewer");
    if (ifViewer != null) {
        ifViewer.setAttribute("allowfullscreen", true);
        ifViewer.setAttribute("webkitallowfullscreen", true);
        ifViewer.setAttribute("mozallowfullscreen", true);
    }
    var appFrame = document.getElementById("appFrame");
    if (appFrame != null) {
        appFrame.setAttribute("allowfullscreen", true);
        appFrame.setAttribute("webkitallowfullscreen", true);
        appFrame.setAttribute("mozallowfullscreen", true);
    }
} else if (url.indexOf("https://pos.toshin.com/sso1/ssomenu/sessionerror.html?aspxerrorpath=") != -1) {
    browser.runtime.sendMessage({ "title": "セッション情報が破棄されたので再ログインしてください", "msg": "東進学力POSでは個人情報保護の観点より、一定時間操作が無かった場合にセッション情報を破棄しています。" });
    window.location.href = "https://pos.toshin.com/SSO1/SSOLogin/StudentLogin.aspx";
} else {
    console.log(url);
    var as = document.getElementsByTagName("a");
    for (var i = 0; i < as.length; i++) {
        // Unsupported Browser Remover
        if (as[i].href == "https://pos.toshin.com/info/NewsInfomation/cannotEdgeWindows10.pdf") {
            as[i].hidden = true;
        }
    }
    var appFrame = document.getElementById("appFrame");
    if (appFrame != null) {
        appFrame.setAttribute("allowfullscreen", true);
        appFrame.setAttribute("webkitallowfullscreen", true);
        appFrame.setAttribute("mozallowfullscreen", true);
    }
}