var KosokuMasterXMLData = "";

var debug_do_not_send_watch_log = false;

var gettingItem = browser.storage.sync.get('debug_do_not_send_watch_log');
gettingItem.then((res) => {
    debug_do_not_send_watch_log = res.debug_do_not_send_watch_log||false;
});

function setDebugOption(p){
    debug_do_not_send_watch_log = p;
    console.log("[Player Config Update] 視聴ログ送信は" + (p ? "無効" : "有効") + "です。");
}

function listener(details) {
    console.log("Loading: " + details.url);

    if (details.url.endsWith("PlayerSelector.aspx")) {
        var gettingItem = browser.storage.sync.get('debug_do_not_send_watch_log');
        gettingItem.then((res) => {
            setDebugOption(res.debug_do_not_send_watch_log);
        });
    }
    if (details.url.includes("/Page/Design/KozaInfo.aspx?KozaCode=")) {
        details.statusCode = 200;
        console.log(details.responseHeaders);
        for (var i = 0; i < details.responseHeaders.length; i++) {
            if (details.responseHeaders[i].name == "Location") {
                delete details.responseHeaders[i];
            }
        }
        console.log("Rewrote response code and headers.");
        return { responseHeaders: details.responseHeaders };
    }

    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let data = [];

    filter.ondata = event => {
        data.push(event.data);
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

            console.log("[Player Config Check] 視聴ログ送信は" + (debug_do_not_send_watch_log ? "無効" : "有効") + "です。");

            var shakaPlayerElementsScript = browser.runtime.getURL("./scripts/PlayerSelectorShakaElements.js");

            str =
                "<!DOCTYPE html><head><title>PlayerSelector</title>" +
                "<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">" +
                "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>" +
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://ajax.googleapis.com/ajax/libs/shaka-player/3.2.0/controls.css\">" +
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://shaka-player-demo.appspot.com/dist/demo.css\">" +
                "<script defer src=\"https://shaka-player-demo.appspot.com/node_modules/eme-encryption-scheme-polyfill/index.js\"></script>" +
                "<script defer src=\"https://shaka-player-demo.appspot.com/node_modules/material-design-lite/dist/material.min.js\"></script>" +
                "<script defer src=\"https://shaka-player-demo.appspot.com/node_modules/dialog-polyfill/dist/dialog-polyfill.js\"></script>" +
                "<script src=\"https://ajax.googleapis.com/ajax/libs/shaka-player/3.2.0/shaka-player.ui.debug.js\"></script>" +
                "<script defer src=\""+shakaPlayerElementsScript+"\"></script>" +
                "<script defer src=\"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js\"></script>" +
                "<script type=\"text/javascript\" src=\"https://cdn.rawgit.com/ricmoo/aes-js/e27b99df/index.js\"></script>" +
                "<style>body {width: 100vw; max-width:100vw; height: 56.25vw; max-height:100vh; background:black;} #video {width: auto; height: 100%;} .video-container {width: 100vw; max-width:100vw; height: 56.25vw; max-height:100vh;}</style>"+
                "</head><body>" +
                "<div id=\"error-display\" class=\"hidden\"><div id=\"error-display-close-button\"><p>x</p></div><p id=\"error-display-message\"></p><a id=\"error-display-link\" href=\"#\" target=\"_blank\">エラーコードの詳細</a></div><main class=\"mdl-layout__content\" id=\"main-div\">" +
                "<div data-shaka-player-container class=\"video-container\" data-shaka-player-cast-receiver-id=\"1BA79154\">" +
                "<video data-shaka-player autoplay id=\"video\" poster=\"https://i.ytimg.com/vi/I631zx0ahn0/maxresdefault.jpg\"></video></div></main>"+
                "<input id=\"initData\" type=\"hidden\" value=\""+d+"\"/>"+
                "<input id=\"debug_do_not_send_watch_log\" type=\"hidden\" value=\""+debug_do_not_send_watch_log+"\"/>"+
                "</body></html>";
        } else if(details.url.indexOf("/StdKozaJuko/Start") != -1){
            console.log("[ToshinFox] Rewrite movie className");
            console.log(str);
            str = str.replaceAll("<div class=\"movie\">","<script>setInterval(function(){$('.movie2 iframe').css('height',  document.getElementById(\"ifViewer\").clientWidth/16*9 + 'px');},500);</script><div class=\"movie2\">");

        } else if (str.indexOf("navigator.userAgent" != -1) && details.url == "https://pos.toshin.com/JKMR/Student2/StdDashBord/DashBord") {
            str = str.replace("navigator.userAgent;", "\"Android\";\nfnRedirectSmartDevice2();");
        } else if (details.url.includes("https://pos.toshin.com/KKS/KKS1/Page/Design/KozaInfo.aspx?KozaCode=")) {
            str = str.replace("charset=shift_jis", "charset=utf8");
        } else if (details.url.includes("https://pos2.toshin.com/RBT2/RBT_Student/Js/training/TrainingPage.js")) {
            str = str.replace("this._modalFrame.show(\"問題を作成中です・・・\", \"trainigForm\");", "this._modalFrame.show(\"問題を作成中だゾ！\", trainigForm);");
        } else if (details.url.includes("https://pos2.toshin.com/RBT2/RBT_Student/Js/training/BkotTrainingProcess.js")) {
            // str = str.replace(/this._waitTimer.setMS\(this._autoNextQuestionTime \* 1000\);/g, "console.log(this._currentQuestion);if (this._currentQuestion==null){this._waitTimer.setMS(100);}else{if(this._questionList.getItemByNumber(this._currentQuestionNumber)._result==Question.RESULT_INCORRECT){this._waitTimer.setMS(100);}else{this._waitTimer.setMS(1000);}}");
            str = str.replace(/this.onAnswerCheck\(\);/g, "");
            str = str.replace("BkotTrainingProcess.C_ANSWER_MODE_CHECK;", "BkotTrainingProcess.C_ANSWER_MODE_CHECK; this.onAnswerCheck();")
            str = str.replace(/this._waitTimer.informTimeout\(\);/g, "if(this.getIsImmediate()){console.log(this._currentQuestion._result);if(this._currentQuestion._result==0){console.log(\"正解！！\")}else{console.log(\"不正解\");}if(this._currentQuestion._result==0){this._waitTimer.setMS(50);}else{this._waitTimer.setMS(2000);} this._waitTimer.informTimeout();}");
        } else if (details.url.includes("https://pos2.toshin.com/RBT2/RBT_Student/WebHandlers/TrainingQuestionRequest.ashx?qn=")) {
            KosokuMasterXMLData = str;
            // console.log(str);
        } else if (details.url.includes("https://pos2.toshin.com/RBT2/RBT_Student/Page/Student/TrainingResult.aspx")) {
            //console.log("this is train result.");
            str = str.replace("if (typeof(oncontextmenu_protect) == 'function') {oncontextmenu_protect();}", "");
            if (str.includes("Explanation.aspx")) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(KosokuMasterXMLData, "text/xml");
                //console.log(str);
                const result = str.match(/<a href="javascript:void\(window\.open\('Explanation\.aspx\?questionNo=\d{2,6}',''\)\)"><span>問題へ<\/span><\/a>/g);
                for (var i = 0; i < result.length; i++) {
                    // Question.Q_TYPE_YOKO_SENTAKU1 = 1; Question.Q_TYPE_YOKO_SENTAKU2 = 2; Question.Q_TYPE_YOKO_NYURYOKU = 3;
                    // Question.Q_TYPE_YOKO_DD_TATE = 4; Question.Q_TYPE_YOKO_DD_YOKO = 5; Question.Q_TYPE_YOKO_ANAUME = 6;
                    // Question.Q_TYPE_SENTAKUSHIBETSU = 7; Question.Q_TYPE_TATE_SENTAKU = 8; Question.Q_TYPE_TATE_NYURYOKU = 9;
                    // Question.Q_TYPE_TATE_DD = 10; Question.Q_TYPE_HENKAN_NYURYOKU = 11; 12とかが確認されてるけどなんなんだろ。。
                    // Question.RESULT_CORRECT = 0; 	// 正解
                    // Question.RESULT_INCORRECT = 1; 	// 不正解
                    // Question.RESULT_DONTKNOW = 9; 	// わからない
                    // Question.ANSWER_TYPE_CHOICE = 0; 	// 選択式	
                    // Question.ANSWER_TYPE_DD = 1;        // D&D (たぶんdrop&drag)
                    // Question.ANSWER_TYPE_INPUT = 2; 	// 入力式
                    if (xmlDoc.getElementsByTagName("Question")[i].getElementsByTagName("AnswerType")[0].innerHTML == "0") { // ANSWER_TYPE_CHOICE(選択式)
                        var word = xmlDoc.getElementsByTagName("QuestionTextList")[i].getElementsByTagName("QuestionText")[0].innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#039;/g, "'");;
                        console.log(word);
                        if (word.includes('<span style = "text-decoration : overline">')) {
                            word = word.match(/>.+?<\/span>/g)[0].replace("</span>", "").substr(1);
                            var questionNumber = xmlDoc.getElementsByTagName("Question")[i].getElementsByTagName("QuestionNumber")[0].innerHTML;
                            str = str.replace(result[i], "<a href=\"./Explanation.aspx?questionNo=" + questionNumber + "\" target=\"_blank\"><span>" + word + "</span></a>");
                        } else {
                            str = str.replace(result[i], "<a href=\"https://www.ei-navi.jp/dictionary/content/" + word + "/#word_detail\" target=\"_blank\"><span>" + word + "</span></a>");
                        }
                    }
                }
            }
        } else if (details.url == "https://olt.toshin.com/OLT/Student4_R/Student/OALT_Test.aspx" || details.url.includes("https://olt.toshin.com/OLT/Student4_R/Student/OACT_Test.aspx")) {
            str = str.replace("if (obj[i].checked == true) {", "if (obj[i].parentElement.className==\"checked\") {");
        } else if (details.url.includes("https://olt.toshin.com/OLT/Student4_R/Student/OALT_OALTConfirmation.aspx")) {
            str = str.replace("var winHandle = window.open(sTestQuery, 'fs', 'fullscreen=yes,menubar=no,status=no,toolbar=no,scrollbars=yes');", "var winHandle = window.open(sTestQuery, 'fs', 'fullscreen=no,menubar=yes,location=yes,status=yes,toolbar=yes,scrollbars=yes,resizable=yes');");
        } else if (details.url.includes("https://olt.toshin.com/OLT/Student4_R/Student/OACT_OACTConfirmation.aspx")) {
            str = str.replace("var winHandle = window.open(sTestQuery, 'fs', 'fullscreen=yes,menubar=no,location=0,status=no,toolbar=no,scrollbars=yes');", "var winHandle = window.open(sTestQuery, 'fs', 'fullscreen=no,menubar=yes,location=yes,status=yes,toolbar=yes,scrollbars=yes,resizable=yes');")
        } else {
            str = str.replace("onclick='playerready_window_open", "onload='document.fdata.method=\"post\";document.fdata.action=\"./PlayerSelector.aspx\";document.fdata.submit();'");
        }
        // console.log(str);
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
        "https://pos2.toshin.com/VODPAS/STG/PlayerSelector5/PlayerSelector.aspx*",
        "https://pos2.toshin.com/openwith*",
        "https://pos.toshin.com/JKMR/Student2/StdDashBord/DashBord",
        "https://test.toshin.com/TEST_2012/JKM/Student/StdKozaJuko/Start",
        "https://pos.toshin.com/JKMR/Student2/StdKozaJuko/Start",
        "https://pos2.toshin.com/RBT2/RBT_Student/Js/training/TrainingPage.js?*",
        "https://pos2.toshin.com/RBT2/RBT_Student/Js/training/BkotTrainingProcess.js*",
        "https://pos2.toshin.com/RBT2/RBT_Student/WebHandlers/TrainingQuestionRequest.ashx?qn=*",
        "https://pos2.toshin.com/RBT2/RBT_Student/Page/Student/TrainingResult.aspx",
        "https://pos.toshin.com/KKS/KKS1/Page/Design/KozaInfo.aspx?KozaCode=*",
        "https://pos.toshin.com/KKS/KKS2/Page/Design/KozaInfo.aspx?KozaCode=*",
        "https://pos.toshin.com/KKS/KKS3/Page/Design/KozaInfo.aspx?KozaCode=*",
        "https://olt.toshin.com/OLT/Student4_R/Student/OALT_Test.aspx",
        "https://olt.toshin.com/OLT/Student4_R/Student/OACT_Test.aspx*",
        "https://olt.toshin.com/OLT/Student4_R/Student/OALT_OALTConfirmation.aspx*",
        "https://olt.toshin.com/OLT/Student4_R/Student/OACT_OACTConfirmation.aspx*"
    ]
}, ["blocking", "responseHeaders"]
);

function listenerForJS(details) {
    console.log("Loading: " + details.url);

    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let data = [];

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
        str = str.replace(/alert\("連続クリックはお控えください"\);/g, "console.log(\"Popup was removed! hahaha\")");
        console.log(str);
        filter.write(encoder.encode(str));
        filter.close();
    };

    return {};
}

browser.webRequest.onHeadersReceived.addListener(
    listenerForJS, {
    urls: [
        "https://pos.toshin.com/JKMR/Student1/js/Common.js",
        "https://pos.toshin.com/JKMR/Student2/js/Common.js",
        "https://test.toshin.com/TEST_2012/JKM/Student/js/Common.js"
    ]
}, ["blocking", "responseHeaders"]
);

function rewriteUserAgentHeader(e) {
    e.requestHeaders.forEach(function (header) {
        if (header.name.toLowerCase() == "user-agent") {
            header.value = "Mozilla/5.0 (Linux; Android 12.0; Pixel 5 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.86 Mobile Safari/537.36";
        }
    });
    return { requestHeaders: e.requestHeaders };
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader, {
    urls: [
        "https://pos2.toshin.com/VODPAS/PlayerSelector5old/PlayerSelector.aspx*",
        "https://pos2.toshin.com/VODPAS/PlayerSelector5/PlayerSelector.aspx*",
        "https://pos2.toshin.com/VODPAS/PlayerSelector5pc/PlayerSelector.aspx*",
        "https://pos2.toshin.com/VODPAS/STG/PlayerSelector5/PlayerSelector.aspx*"
    ]
}, ["blocking", "requestHeaders"]
);

function notify(message) {
    console.log("[Runtime Messager] A message is received!");
    console.log(message)
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("./icons/ic_main.png"),
        "title": message.title,
        "message": message.msg
    });
}

browser.runtime.onMessage.addListener(notify);