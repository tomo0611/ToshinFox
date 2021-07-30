var url = window.location.href;

console.log("link -> " + url);

injectScript("content_interception.js");


// https://fonts.google.com/?preview.text=%20%E7%94%9F%E5%BE%92%E7%95%AA%E5%8F%B7%EF%BC%9A%20%E5%8F%A4%E6%A9%8B%20%E6%96%87%E4%B9%83(10%2F23)%20%E5%AD%A6%E5%B9%B4%EF%BC%9A%20%E9%AB%98%EF%BC%93%20&preview.text_type=custom&subset=japanese

var gettingItem = browser.storage.sync.get('font');
gettingItem.then((res) => {
    injectStyleSheet("https://fonts.googleapis.com/css?family=" + encodeURIComponent(res.font || 'M PLUS Rounded 1c'), res.font || 'M PLUS Rounded 1c');
});

if (url.toLowerCase().includes("https://pos.toshin.com/jkmr/student2/stdkobetsujukoyoyaku/kosuselect")) {
    injectScriptsForKosuSelect();
} else if (url.includes("https://pos2.toshin.com/VODPAS/")) {
    console.log("Injecting scripts & styles to PlayerSelector Page...");
    injectScriptsForPlayPage();
} else if (url.indexOf("https://pos.toshin.com/sso1/ssomenu/sessionerror.html?aspxerrorpath=") != -1) {
    console.log("Redirecting to LoginPage...");
    redirectToLoginPage();
}

async function injectScriptsForPlayPage() {

    await injectScript('scripts/PlayerSelector.js');

    /*await injectScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js');

    await injectScript('https://cdn.rawgit.com/ricmoo/aes-js/e27b99df/index.js');

    await injectScript('https://code.getmdl.io/1.3.0/material.min.js');
    await injectScript('https://shaka-player-demo.appspot.com/node_modules/eme-encryption-scheme-polyfill/index.js');
    await injectScript('https://shaka-player-demo.appspot.com/node_modules/material-design-lite/dist/material.min.js');
    await injectScript('https://shaka-player-demo.appspot.com/node_modules/dialog-polyfill/dist/dialog-polyfill.js');
    
    await injectScript('https://ajax.googleapis.com/ajax/libs/shaka-player/3.1.0/shaka-player.ui.debug.js');
    await injectScript('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js');*/
}

async function injectScriptsForKosuSelect() {
    await injectScript('scripts/KosuSelect.js');
}

async function redirectToLoginPage() {
    browser.runtime.sendMessage({"title": "セッション情報が破棄されたので再ログインしてください","message": "東進学力POSでは個人情報保護の観点より、一定時間操作が無かった場合にセッション情報を破棄しています。"})
    window.location.href = "https://pos.toshin.com/SSO1/SSOLogin/StudentLogin.aspx";
}

async function addFontChangeListener(){
    await fontChangeListener();
}

function injectScript(scriptName) {
    return new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = browser.runtime.getURL(scriptName);
        s.onload = function () {
            resolve(true);
        };
        (document.head || document.documentElement).appendChild(s);
    });
}

// <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet">

function injectStyleSheet(styleName, font_name) {
    return new Promise(function (resolve, reject) {
        var s = document.createElement('link');
        s.href = browser.runtime.getURL(styleName);
        s.rel = "stylesheet";
        s.onload = function () {
            resolve(true);
        };
        (document.head || document.documentElement).appendChild(s);
        var elements = document.querySelectorAll('*');
        for(var i=0;i<elements.length;i++){
            elements[i].style.fontFamily = "\"" + font_name + "\"";
        }
    });
}