# ToshinFox


## 紹介

ToshinFoxはオープンソースの東進Firefox 開発版/早期リリース版用の拡張です。
WindowsのIEだけではなくMac、Linuxでの受講を可能にします。

注目の機能 :

- **授業プレイヤースクリプトの挿入**: IE以外での受講を可能にします
- **かんたん再ログイン**: セッション情報破棄時に自動でリダイレクト
- **IEにさようならを言おう！**: IE使えメッセージの除去
- **ポップアップは要らない**: 受講開始時に開くポップアップの除去
- **再生速度**: x1.25とx2.0もあります！
- **Picture in Picture**: 受講もPiPで！
- **5秒送り10秒戻し**
- **MediaMetadataの対応**: 講座名が表示されます(OS依存あり)

## ブラウザ&OSの対応

- Windows 10 & Firefox Nightly : 完全対応
- Windows 10 & Firefox Development : 完全対応
- Ubuntu 20.04 Desktop & Firefox Nightly : 完全対応
- Ubuntu 20.04 Desktop & Firefox Development : 完全対応
- mac & Firefox Nightly : 完全対応
- mac & Firefox Development : 完全対応

## 便利なリンク

- [Firefoxで署名されていない拡張を入れる->未署名のアドオンを有効にする](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Packaging_and_installation)

## バグ報告

Issuesでどうぞ

## 開発と仕組みについて

東進PoSはWindowsのIEではSmoothstreamingでSilverlightというデジタル著作権保護技術を、AndroidとiOSではdash(mpd)でGoogleのWidevineと言うデジタル著作権保護技術を使っています。
Silverlight技術はWindowsのIEでのみ動くのに対して、Widevineは一般的なDRM(デジタル著作権保護)技術として利用されており、モダンブラウザやOSが対応しています。身近なサービスでこれを利用しているのはDアニメがあります。

これは著作権保護を外しているのではなくWidevineという著作権保護技術を使って再生しているだけです。そのため講義のダウンロードなどはできません。

## Silverlightの未来


["Silverlight End of Support"](https://support.microsoft.com/en-gb/help/4511036/silverlight-end-of-support)

Microsoft Silverlightは2021年の10月12日に終わりを迎えるそうです。Silverlight 開発フレームワークは現在Internet Explorer 10とInternet Explorer 11のみをサポートしていますが、Internet Explorer 10のサポートは2020年の1月31日で終了しています。そしてもう、Chrome, Firefoxや他のブラウザ、そしてmac OSでは対応していません。