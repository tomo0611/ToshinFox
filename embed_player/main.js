function ResizeBytesArray(validdtm, size) {
    var PK = "NagaseDRMContensCrypt_" + validdtm;
    var var0 = new ArrayBuffer(36);
    for (var i = 0; i < 36; i++) {
        var0[i] = PK.substring(i, i + 1).charCodeAt();
    }
    var var1 = size
    var var2 = new ArrayBuffer(var1);
    for (var i = 0; i < var1; i++) {
        var2[i] = 0;
    }
    var var5 = 0
    var1 = 0
    while (var5 < var0.byteLength) {
        var var4 = var1 + 1;
        var2[var1] = (var2[var1] ^ var0[var5])
        if (var4 >= var2.byteLength) { var1 = 0; } else { var1 = var4 }
        var5++;
    }
    var r = [];
    for (var i = 0; i < size; i++) { r[i] = var2[i]; }
    return r;
}

function decrypt(validdtm, d) {
    var key = ResizeBytesArray(validdtm, 32);
    var iv = ResizeBytesArray(validdtm, 16);
    var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    var encryptedB64 = d;
    var encryptedBytes = Uint8Array.from(atob(encryptedB64), c => c.charCodeAt(0));
    var decryptedBytes = aesCbc.decrypt(encryptedBytes);
    return aesjs.utils.utf8.fromBytes(decryptedBytes).replace("\r", "").replace("\n", "").replace(/[\u000f]/gu, "");
}

function initApp(url_param) {
    console.log(url_param);
    var params = url_param.split(",");
    var param_list = {}
    for (var i = 0; i < params.length; i++) {
        param_list[params[i].split("=")[0]] = params[i].replace(params[i].split("=")[0] + "=", "");
    }
    const urlParams = new URLSearchParams(url_param);
    console.log(param_list);
    const validdtm = param_list['validdtm'];
    const SSO_TOKEN = param_list['SSO_TOKEN'];
    const contentsinfo = decrypt(validdtm, param_list['contentsinfo']);
    console.log("contentsinfo " + contentsinfo);
    const sidecutfilter_yn = param_list['sidecutfilter_yn'];
    const url_2 = decrypt(validdtm, param_list['url_2']).replace("WV/300","WV/800");
    console.log("url_2 " + url_2);
    const url = decrypt(validdtm, param_list['url']);
    const url_normalspeed = decrypt(validdtm, param_list['url_normalspeed']);
    const url_highspeed = decrypt(validdtm, param_list['url_highspeed']);
    const telop_info = decrypt(validdtm, param_list['telop_info']);
    const cut_info = decrypt(validdtm, param_list['cut_info']);
    const ticket = param_list['ticket'];

    var params = contentsinfo.split(",");
    var c_param_list = {}
    for (var i = 0; i < params.length; i++) {
        c_param_list[params[i].split("=")[0]] = params[i].substring(params[i].split("=")[0].length + 1);
    }
    console.log(c_param_list);

    c_param_list["title"] = decrypt(validdtm, c_param_list['title']);
    
    var manifestUri = url_2;
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
        initPlayer(ticket, manifestUri, param_list, SSO_TOKEN, validdtm, c_param_list);
    } else {
        console.error('Browser not supported!');
        const message = 'Your browser is not supported!';
        const href = 'https://github.com/google/shaka-player#platform-and-browser-support-matrix';
        document.getElementById("error-display").className = "";
        document.getElementById("error-display-message").innerText = message;
        document.getElementById("error-display-link").href = href;
    }
}

function initPlayer(ticket, manifestUri, param_list, SSO_TOKEN, validdtm, c_param_list) {
    console.log(manifestUri);
    const video = document.getElementById('video');
    const ui = video['ui'];
    const controls = ui.getControls();
    const player = controls.getPlayer();

    player.configure({
        drm: {
            servers: {
                'com.widevine.alpha': 'https://drm.toshin.com/drmapi/wv/nagase?custom_data=' + ticket
            }
        }
    });
    createButtonForward();
    createButtonReplay();
    createButtonV10();
    createButtonV12();
    createButtonV15();
    createButtonV20();
    
    var config = {
        controlPanelElements: [
            'play_pause',
            'replay_10',
            'forward_5',
            'mute',
            'volume',
            'time_and_duration',
            'spacer',
            'x1.0',
            'x1.25',
            'x1.5',
            'x2.0',
            'picture_in_picture',
            'fullscreen',
            'overflow_menu',
        ],
        overflowMenuButtons: [
            'captions',
            'cast',
            'quality',
            'language',
            'picture_in_picture',
            'playback_rate',
            'airplay',
        ],
        seekBarColors: {
            base: 'rgba(255, 255, 255, 0.3)',
            buffered: 'rgba(128, 203, 196, 0.54)',
            played: 'rgb(128, 203, 196)'
        },
        volumeBarColors: {
            base: 'rgba(255, 255, 255, 0.54)',
            level: 'rgb(255, 255, 255)'
        },
        addBigPlayButton: false,
        doubleClickForFullscreen: true,
        enableKeyboardPlaybackControls: true,
        enableFullscreenOnRotation: true
    };
    ui.configure(config);
    window.player = player;
    window.ui = ui;
    window.manifestUri = manifestUri;
    player.addEventListener('error', onErrorEvent);
    player.load(manifestUri).then(function () {
        console.log('The video has now been loaded!');
        if ('mediaSession' in navigator) {
            var title = c_param_list["title"] != "" ? c_param_list["title"] : "不明な講座名";
            var koza_number = c_param_list["kozano"] != "" ? c_param_list["kozano"] : "不明な講数";
            var koza_code = c_param_list["kozacd"] != "" ? c_param_list["kozacd"] : "不明な講座コード";
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title + " (講座番号：" + koza_number + ")",
                artist: "東進衛星予備校T-Pod君",
                album: "講座コード：" + koza_code,
                artwork: [{ src: "https://pos.toshin.com/SSO1/SSOMenu/IMAGES/webclip.png" }]
            });
            navigator.mediaSession.setActionHandler('play', function () {
                document.getElementById("video").play();
            });
            navigator.mediaSession.setActionHandler('pause', function () {
                document.getElementById("video").pause();
            });
            navigator.mediaSession.setActionHandler('seekforward', function () {
                document.getElementById("video").currentTime += 5;
            });
            navigator.mediaSession.setActionHandler('nexttrack', function () {
                document.getElementById("video").currentTime += 5;
            });
            navigator.mediaSession.setActionHandler('seekbackward', function () {
                document.getElementById("video").currentTime -= 10;
            });
            navigator.mediaSession.setActionHandler('previoustrack', function () {
                document.getElementById("video").currentTime -= 10;
            });
        }
        $.ajax({
            type: "POST",
            url: "https://pos2.toshin.com/DRM2/DRM25/Webservice/DRMWebService.asmx",
            dataType: "xml",
            contentType: "text/xml;charset=utf-8",
            beforeSend: function (xhr) { xhr.setRequestHeader("SOAPAction", "http://pos.toshin.com/registViewedContents"); },
            data: '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><registViewedContents xmlns="http://pos.toshin.com/" id="o0" c:root="1">' +
                '<contentsinfo i:type="d:string">' + param_list['contentsinfo'] + '</contentsinfo>' +
                '<SSO_TOKEN i:type="d:string">' + SSO_TOKEN + '</SSO_TOKEN>' +
                '<validdtm i:type="d:string">' + validdtm + '</validdtm>' +
                '<vodfilepath i:type="d:string">' + c_param_list['vodfilepath'] + '</vodfilepath></registViewedContents></v:Body></v:Envelope>',
            success: function (res) {
                console.log("registViewedContents " + res);
            }
        });
        document.getElementsByClassName("shaka-spinner-container")[0].hidden = true;
    }).catch(onError);
}

function createButtonForward() {
    // Use shaka.ui.Element as a base class
    Forward = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('span');
            this.button_.className = 'material-icons';
            this.button_.innerText = 'forward_5';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById("video").currentTime += 5;
            });
        }
    };
    // Factory that will create a button at run time.
    Forward.Factory = class {
        create(rootElement, controls) {
            return new Forward(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'forward_5',
        new Forward.Factory());
}

function createButtonReplay() {
    // Use shaka.ui.Element as a base class
    Replay = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('span');
            this.button_.className = 'material-icons';
            this.button_.innerText = 'replay_10';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById("video").currentTime -= 10;
            });
        }
    };
    // Factory that will create a button at run time.
    Replay.Factory = class {
        create(rootElement, controls) {
            return new Replay(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'replay_10',
        new Replay.Factory());
}

function createButtonV10() {
    // Use shaka.ui.Element as a base class
    FastX10 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x1.0';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 1.0;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX10.Factory = class {
        create(rootElement, controls) {
            return new FastX10(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x1.0',
        new FastX10.Factory());
}

function createButtonV12() {
    // Use shaka.ui.Element as a base class
    FastX12 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x1.25';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 1.25;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX12.Factory = class {
        create(rootElement, controls) {
            return new FastX12(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x1.25',
        new FastX12.Factory());
}

function createButtonV15() {
    // Use shaka.ui.Element as a base class
    FastX15 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x1.5';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 1.5;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX15.Factory = class {
        create(rootElement, controls) {
            return new FastX15(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x1.5',
        new FastX15.Factory());
}

function createButtonV20() {
    // Use shaka.ui.Element as a base class
    FastX20 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x2.0';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 2.0;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX20.Factory = class {
        create(rootElement, controls) {
            return new FastX20(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x2.0',
        new FastX20.Factory());
}

function onErrorEvent(event) {
    onError(event.detail);
}

function onError(error) {
    console.error('Error code', error.code, 'object', error);
    document.getElementById("error-display").className = "";
    document.getElementById("error-display-message").innerText = "ERROR(" + error.code + ") : " + error.message;
    document.getElementById("error-display-link").href = "https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html#value:" + error.code;
}

//document.addEventListener('DOMContentLoaded', initApp);