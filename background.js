var KosokuMasterXMLData = "";

function listener(details) {
    console.log("Loading: " + details.url);

    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let data = [];

    filter.onstop = event => {
        console.log(event);
    }

    filter.ondata = event => {
        data.push(event.data);
        console.log(event.data);
    };

    filter.onstop = event => {
        let str = "";
        if (data.length == 1) {
            str = decoder.decode(data[0]);
        } else {
            for (let i = 0; i < data.length; i++) {
                let stream = (i == data.length - 1) ? false : true;
                str += decoder.decode(data[i], { stream });
            }
        }
        if (str.indexOf("A477C046-2D9B-40CF-94C0-427C9C99E580://nagase.com/openwith") != -1) {
            var d = str.match("href='.*3'")[0].replace("href='A477C046-2D9B-40CF-94C0-427C9C99E580://nagase.com/openwith", "");
            d = d.substring(1, d.length - 1);
            str = 
            "<!DOCTYPE html><head><title>PlayerSelector</title>"+
            "<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">"+
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://shaka-player-demo.appspot.com/dist/controls.css\">"+
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://shaka-player-demo.appspot.com/dist/demo.css\">"+
            // "<script defer src=\"https://shaka-player-demo.appspot.com/node_modules/material-design-lite/dist/material.min.js\"></script>"+
            "<script defer src=\"https://shaka-player-demo.appspot.com/node_modules/dialog-polyfill/dist/dialog-polyfill.js\"></script>"+
            "<script src=\"https://shaka-player-demo.appspot.com/dist/shaka-player.ui.debug.js\"></script>"+
            "<script defer src=\"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js\"></script>"+
            "<script type=\"text/javascript\" src=\"https://cdn.rawgit.com/ricmoo/aes-js/e27b99df/index.js\"></script>"+
            "<script src=\"https://code.jquery.com/jquery-3.4.1.min.js\"></script></head><body>"+
            "<div id=\"error-display\" class=\"hidden\"><div id=\"error-display-close-button\"><p>x</p></div><p id=\"error-display-message\"></p><a id=\"error-display-link\" href=\"#\" target=\"_blank\">エラーコードの詳細</a></div><main class=\"mdl-layout__content\" id=\"main-div\">"+
            "<div data-shaka-player-container class=\"video-container\">"+
            "<video data-shaka-player autoplay id=\"video\" poster=\"https://shaka-player-demo.appspot.com/assets/poster.jpg\"></video></div></main><script>" +
                "function ResizeBytesArray(e,t){for(var n=\"NagaseDRMContensCrypt_\"+e,o=new ArrayBuffer(36),r=0;r<36;r++)o[r]=n.substring(r,r+1).charCodeAt();var a=t,s=new ArrayBuffer(a);for(r=0;r<a;r++)s[r]=0;var i=0;for(a=0;i<o.byteLength;){var c=a+1;s[a]=s[a]^o[i],a=c>=s.byteLength?0:c,i++}var l=[];for(r=0;r<t;r++)l[r]=s[r];return l}function decrypt(e,t){var n=ResizeBytesArray(e,32),o=ResizeBytesArray(e,16),r=new aesjs.ModeOfOperation.cbc(n,o),a=t,s=Uint8Array.from(atob(a),e=>e.charCodeAt(0)),i=r.decrypt(s);return aesjs.utils.utf8.fromBytes(i).replace(\"\\r\",\"\").replace(\"\\n\",\"\").replace(/[\\u000f]/gu,\"\")}function initApp(e){console.log(e);for(var t=e.split(\",\"),n={},o=0;o<t.length;o++)n[t[o].split(\"=\")[0]]=t[o].replace(t[o].split(\"=\")[0]+\"=\",\"\");new URLSearchParams(e);console.log(n);const r=n.validdtm,a=n.SSO_TOKEN,s=decrypt(r,n.contentsinfo);console.log(\"contentsinfo \"+s);n.sidecutfilter_yn;const i=decrypt(r,n.url_2).replace(\"WV/300\",\"WV/800\");console.log(\"url_2 \"+i);decrypt(r,n.url),decrypt(r,n.url_normalspeed),decrypt(r,n.url_highspeed),decrypt(r,n.telop_info),decrypt(r,n.cut_info);const c=n.ticket;t=s.split(\",\");var l={};for(o=0;o<t.length;o++)l[t[o].split(\"=\")[0]]=t[o].substring(t[o].split(\"=\")[0].length+1);console.log(l);var d=i;if(shaka.polyfill.installAll(),shaka.Player.isBrowserSupported())initPlayer(c,d,n,a,r,l);else{console.error(\"Browser not supported!\");const e=\"Your browser is not supported!\",t=\"https://github.com/google/shaka-player#platform-and-browser-support-matrix\";document.getElementById(\"error-display\").className=\"\",document.getElementById(\"error-display-message\").innerText=e,document.getElementById(\"error-display-link\").href=t}}function initPlayer(e,t,n,o,r,a){console.log(t);var s=document.getElementById(\"video\"),i=new shaka.Player(s);i.configure({drm:{servers:{\"com.widevine.alpha\":\"https://drm.toshin.com/drmapi/wv/nagase?custom_data=\"+e}}}),createButtonForward(),createButtonReplay(),createButtonV10(),createButtonV12(),createButtonV15(),createButtonV20();s.ui.configure({controlPanelElements:[\"play_pause\",\"replay_10\",\"forward_5\",\"mute\",\"volume\",\"time_and_duration\",\"spacer\",\"x1.0\",\"x1.25\",\"x1.5\",\"x2.0\",\"fullscreen\",\"overflow_menu\"],overflowMenuButtons:[\"captions\",\"quality\",\"language\",\"picture_in_picture\"],seekBarColors:{base:\"rgba(255, 255, 255, 0.3)\",buffered:\"rgba(128, 203, 196, 0.54)\",played:\"rgb(128, 203, 196)\"},volumeBarColors:{base:\"rgba(255, 255, 255, 0.54)\",level:\"rgb(255, 255, 255)\"},addBigPlayButton:!1,doubleClickForFullscreen:!0,enableKeyboardPlaybackControls:!0,enableFullscreenOnRotation:!0}),window.player=i,window.manifestUri=t,i.addEventListener(\"error\",onErrorEvent),i.load(t).then(function(){if(console.log(\"The video has now been loaded!\"),\"mediaSession\"in navigator){var e=\"\"==a.title?a.title:\"不明な講座名\",t=\"\"==a.kozano?a.kozano:\"不明な講数\",s=\"\"==a.kozacd?a.kozacd:\"不明な講座コード\";navigator.mediaSession.metadata=new MediaMetadata({title:e+\" (講座番号：\"+t+\")\",artist:\"東進衛星予備校T-Pod君\",album:\"講座コード：\"+s,artwork:[{src:\"https://pos.toshin.com/SSO1/SSOMenu/IMAGES/webclip.png\"}]}),navigator.mediaSession.setActionHandler(\"play\",function(){document.getElementById(\"video\").play()}),navigator.mediaSession.setActionHandler(\"pause\",function(){document.getElementById(\"video\").pause()}),navigator.mediaSession.setActionHandler(\"seekforward\",function(){document.getElementById(\"video\").currentTime+=5}),navigator.mediaSession.setActionHandler(\"nexttrack\",function(){document.getElementById(\"video\").currentTime+=5}),navigator.mediaSession.setActionHandler(\"seekbackward\",function(){document.getElementById(\"video\").currentTime-=10}),navigator.mediaSession.setActionHandler(\"previoustrack\",function(){document.getElementById(\"video\").currentTime-=10})}$.ajax({type:\"POST\",url:\"https://pos2.toshin.com/DRM2/DRM25/Webservice/DRMWebService.asmx\",dataType:\"xml\",contentType:\"text/xml;charset=utf-8\",beforeSend:function(e){e.setRequestHeader(\"SOAPAction\",\"http://pos.toshin.com/registViewedContents\")},data:'<v:Envelope xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\" xmlns:c=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:v=\"http://schemas.xmlsoap.org/soap/envelope/\"><v:Header /><v:Body><registViewedContents xmlns=\"http://pos.toshin.com/\" id=\"o0\" c:root=\"1\"><contentsinfo i:type=\"d:string\">'+n.contentsinfo+'</contentsinfo><SSO_TOKEN i:type=\"d:string\">'+o+'</SSO_TOKEN><validdtm i:type=\"d:string\">'+r+'</validdtm><vodfilepath i:type=\"d:string\">'+a.vodfilepath+\"</vodfilepath></registViewedContents></v:Body></v:Envelope>\",success:function(e){console.log(\"registViewedContents \"+e)}}),document.getElementsByClassName(\"shaka-spinner-container\")[0].hidden=!0}).catch(onError)}function createButtonForward(){Forward=class extends shaka.ui.Element{constructor(e,t){super(e,t),this.button_=document.createElement(\"span\"),this.button_.className=\"material-icons\",this.button_.innerText=\"forward_5\",this.parent.appendChild(this.button_),this.eventManager.listen(this.button_,\"click\",()=>{document.getElementById(\"video\").currentTime+=5})}},Forward.Factory=class{create(e,t){return new Forward(e,t)}},shaka.ui.Controls.registerElement(\"forward_5\",new Forward.Factory)}function createButtonReplay(){Replay=class extends shaka.ui.Element{constructor(e,t){super(e,t),this.button_=document.createElement(\"span\"),this.button_.className=\"material-icons\",this.button_.innerText=\"replay_10\",this.parent.appendChild(this.button_),this.eventManager.listen(this.button_,\"click\",()=>{document.getElementById(\"video\").currentTime-=10})}},Replay.Factory=class{create(e,t){return new Replay(e,t)}},shaka.ui.Controls.registerElement(\"replay_10\",new Replay.Factory)}function createButtonV10(){FastX10=class extends shaka.ui.Element{constructor(e,t){super(e,t),this.button_=document.createElement(\"button\"),this.button_.textContent=\"x1.0\",this.parent.appendChild(this.button_),this.eventManager.listen(this.button_,\"click\",()=>{document.getElementById(\"video\").playbackRate=1})}},FastX10.Factory=class{create(e,t){return new FastX10(e,t)}},shaka.ui.Controls.registerElement(\"x1.0\",new FastX10.Factory)}function createButtonV12(){FastX12=class extends shaka.ui.Element{constructor(e,t){super(e,t),this.button_=document.createElement(\"button\"),this.button_.textContent=\"x1.25\",this.parent.appendChild(this.button_),this.eventManager.listen(this.button_,\"click\",()=>{document.getElementById(\"video\").playbackRate=1.25})}},FastX12.Factory=class{create(e,t){return new FastX12(e,t)}},shaka.ui.Controls.registerElement(\"x1.25\",new FastX12.Factory)}function createButtonV15(){FastX15=class extends shaka.ui.Element{constructor(e,t){super(e,t),this.button_=document.createElement(\"button\"),this.button_.textContent=\"x1.5\",this.parent.appendChild(this.button_),this.eventManager.listen(this.button_,\"click\",()=>{document.getElementById(\"video\").playbackRate=1.5})}},FastX15.Factory=class{create(e,t){return new FastX15(e,t)}},shaka.ui.Controls.registerElement(\"x1.5\",new FastX15.Factory)}function createButtonV20(){FastX20=class extends shaka.ui.Element{constructor(e,t){super(e,t),this.button_=document.createElement(\"button\"),this.button_.textContent=\"x2.0\",this.parent.appendChild(this.button_),this.eventManager.listen(this.button_,\"click\",()=>{document.getElementById(\"video\").playbackRate=2})}},FastX20.Factory=class{create(e,t){return new FastX20(e,t)}},shaka.ui.Controls.registerElement(\"x2.0\",new FastX20.Factory)}function onErrorEvent(e){onError(e.detail)}function onError(e){console.error(\"Error code\",e.code,\"object\",e),document.getElementById(\"error-display\").className=\"\",document.getElementById(\"error-display-message\").innerText=\"ERROR(\"+e.code+\") : \"+e.message,document.getElementById(\"error-display-link\").href=\"https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html#value:\"+e.code}document.addEventListener(\"shaka-ui-loaded\",()=> {initApp(\"" + d.replace("\"", "\\\"") + "\")});</script></body></html>";
        } else if(str.indexOf("navigator.userAgent" != -1)&&details.url=="https://pos.toshin.com/JKMR/Student2/StdDashBord/DashBord") {
            str = str.replace("navigator.userAgent;","\"Android\";\nfnRedirectSmartDevice2();");
        } else if(details.url.includes("https://pos.toshin.com/SDBJ/dashboard/")){
            // Support for VOD (SDBJ)
            str = str.replace(/<iframe name="vodpas"/g,"<iframe name=\"vodpas\" allowfullscreen=\"allowfullscreen\"");
        } else if(details.url == "https://pos.toshin.com/JKMR/Student1/StdDashBord/Index"){
            // Support for VOD (SDBJ)
            str = str.replace(/<iframe name="ModalFrame"/g,"<iframe name=\"ModalFrame\" allowfullscreen=\"allowfullscreen\"");
        } else if(details.url.includes("https://pos.toshin.com/SDBJ/dashboard.do")){
            // Support for VOD (SDBJ)
            str = str.replace(/<iframe src/g,"<iframe allowfullscreen=\"allowfullscreen\" src");
        } else if(details.url.includes("https://pos2.toshin.com/RBT2/RBT_Student/Js/training/BkotTrainingProcess.js")){
            str = str.replace(/this._waitTimer.setMS\(this._autoNextQuestionTime \* 1000\);/g, "this._waitTimer.setMS(100);");
        } else if(details.url.includes("https://pos2.toshin.com/RBT2/RBT_Student/WebHandlers/TrainingQuestionRequest.ashx?qn=")){
            KosokuMasterXMLData = str;
            console.log(str);
        } else if(details.url.includes("https://pos2.toshin.com/RBT2/RBT_Student/Page/Student/TrainingResult.aspx")){
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(KosokuMasterXMLData,"text/xml");
            const result = str.match(/<a href="javascript:void\(window\.open\('Explanation\.aspx\?questionNo=\d{2,6}',''\)\)"><span>問題へ<\/span><\/a>/g);
            for(var i=0; i < result.length; i++){
                if(xmlDoc.getElementsByTagName("Question")[i].getElementsByTagName("QuestionType")[0].innerHTML == "1"){
                    var word = xmlDoc.getElementsByTagName("QuestionTextList")[i].getElementsByTagName("QuestionText")[0].innerHTML;
                    str = str.replace(result[i],"<a href=\"https://www.ei-navi.jp/dictionary/content/"+word+"/#word_detail\" target=\"_blank\"><span>"+word+"</span></a>");
                }
            }
        } else {
            str = str.replace("onclick='playerready_window_open", "onclick='document.fdata.method=\"post\";document.fdata.action=\"./PlayerSelector.aspx\";document.fdata.submit();'");
            str = str.replace("<a id='asd'", "<a id='asd' target='_blank' rel='noopener noreferrer'");
            str = str.replace("function playerready_window_open()", "function playerready_window_open(){} function test()");
            str = str.replace("document.fdata.target = \"window_name\";", '');
            str = str.replace(/class="movie"/g, "class=\"\"");
            str = str.replace("<iframe id=\"ifViewer\"", "<iframe id=\"ifViewer\" style=\"height: 470px;\" webkitallowfullscreen=\"true\" mozallowfullscreen=\"true\"")
            str = str.replace(".movie_area .movie{", ".movie_area .movie{} .test{");
        }
        console.log(str);
        filter.write(encoder.encode(str));
        filter.close();
    };

    return {};
}

browser.webRequest.onHeadersReceived.addListener(
    listener, {
        urls: [
            "https://pos2.toshin.com/VODPAS/PlayerSelector5old/PlayerSelector.aspx*",
            "https://pos2.toshin.com/VODPAS/PlayerSelector5/PlayerSelector.aspx*",
            "https://pos2.toshin.com/VODPAS/PlayerSelector5pc/PlayerSelector.aspx*",
            "https://pos2.toshin.com/openwith*",
            "https://pos.toshin.com/JKMR/Student2/StdKozaJuko/Notes?RenshoCnt=*",
            "https://pos.toshin.com/JKMR/Student2/StdKozaJuko/Start",
            "https://pos.toshin.com/JKMR/Student1/StdKozaJuko/Start",
            "https://pos.toshin.com/JKMR/Student1/css/SOD0021/pc.css",
            "https://pos.toshin.com/JKMR/Student2/StdKozaJuko/Webjugyo",
            "https://pos.toshin.com/JKMR/Student2/StdDashBord/DashBord",
            "https://pos.toshin.com/JKMR/Student1/StdDashBord/Index",
            "https://pos.toshin.com/SDBJ/dashboard/*.jsp*",
            "https://pos.toshin.com/SDBJ/dashboard.do*",
            "https://pos2.toshin.com/RBT2/RBT_Student/Js/training/BkotTrainingProcess.js*",
            "https://pos2.toshin.com/RBT2/RBT_Student/WebHandlers/TrainingQuestionRequest.ashx?qn=*",
            "https://pos2.toshin.com/RBT2/RBT_Student/Page/Student/TrainingResult.aspx"
            // "https://pos.toshin.com/SDBJ/th_dashboard/THmidProcessSP.jsp?SSO_Token=*"
        ]
    }, ["blocking", "responseHeaders"]
);

function listenerForJS(details) {
    console.log("Loading: " + details.url);

    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let data = [];

    filter.onstop = event => {
        console.log(event);
    }

    filter.ondata = event => {
        data.push(event.data);
        console.log(event.data);
    };

    filter.onstop = event => {
        let str = "";
        if (data.length == 1) {
            str = decoder.decode(data[0]);
        } else {
            for (let i = 0; i < data.length; i++) {
                let stream = (i == data.length - 1) ? false : true;
                str += decoder.decode(data[i], { stream });
            }
        }
        str = str.replace(/alert\("連続クリックはお控えください"\);/g,"console.log(\"Popup was removed! hahaha\")");
        console.log(str);
        filter.write(encoder.encode(str));
        filter.close();
    };

    return {};
}

browser.webRequest.onHeadersReceived.addListener(
    listenerForJS, {
        urls: [
            "https://pos.toshin.com/JKMR/Student1/js/Common.js"
        ]
    }, ["blocking", "responseHeaders"]
);

function rewriteUserAgentHeader(e) {
    e.requestHeaders.forEach(function(header) {
        if (header.name.toLowerCase() == "user-agent") {
            header.value = "Mozilla/5.0 (Linux; Android 11; Pixel 4a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3904.62 Mobile Safari/537.36";
        }
    });
    return { requestHeaders: e.requestHeaders };
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader, { urls: [
        "https://pos2.toshin.com/VODPAS/PlayerSelector5old/PlayerSelector.aspx*",
        "https://pos2.toshin.com/VODPAS/PlayerSelector5/PlayerSelector.aspx*",
        "https://pos2.toshin.com/VODPAS/PlayerSelector5pc/PlayerSelector.aspx*"
    ] }, ["blocking", "requestHeaders"]
);

function notify(message) {
    console.log("background script received message");
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("./icons/ic_main.png"),
        "title": message["title"],
        "message": message["msg"]
    });
}

browser.runtime.onMessage.addListener(notify);