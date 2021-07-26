function saveOptions(e) {
    var selectedFont = document.querySelector("#font").value;
    browser.storage.sync.set({
        font: selectedFont
    });
    console.log("[Preference] font設定を"+selectedFont+"にしました。");

    var debug_do_not_send_watch_log = document.querySelector("#debug_do_not_send_watch_log").checked;
    browser.storage.sync.set({
        debug_do_not_send_watch_log: debug_do_not_send_watch_log
    });
    console.log("[Preference] 視聴ログ送信を"+(debug_do_not_send_watch_log?"無効":"有効")+"にしました。");

    e.preventDefault();
}

function restoreOptions() {
    var storageItem = browser.storage.managed.get('font');
    storageItem.then((res) => {
        document.querySelector("#managed-font").innerText = res.font;
    });

    var gettingItem = browser.storage.sync.get('font');
    gettingItem.then((res) => {
        document.querySelector("#font").value = res.font || 'M PLUS Rounded 1c';
    });

    storageItem = browser.storage.managed.get('debug_do_not_send_watch_log');
    storageItem.then((res) => {
        document.querySelector("#managed-debug_do_not_send_watch_log").innerText = res.debug_do_not_send_watch_log;
    });

    gettingItem = browser.storage.sync.get('debug_do_not_send_watch_log');
    gettingItem.then((res) => {
        document.querySelector("#debug_do_not_send_watch_log").checked = res.debug_do_not_send_watch_log || false;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);