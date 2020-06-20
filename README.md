# ToshinFox


## 紹介

ToshinFoxはオープンソースの東進Firefox受講用の拡張です。
WindowsだけではなくMac、Linuxでの受講を可能にします。

注目の機能 :

- **授業プレイヤースクリプトの挿入**: Internet Explorer以外(Firefox)での受講を可能にします
- **かんたん再ログイン**: セッション情報破棄時に自動でリダイレクト
- **IEにさようならを言おう！**: IE使えメッセージの除去
- **連打クリック警告さようなら**: 要らない警告メッセージを削除
- **再生速度**: x1.25とx2.0もあります！
- **Picture in Picture**: 受講もPiPで！
- **5秒送り10秒戻し**

## ブラウザ&OSの対応

- Windows 10 2004 : 完全対応
- Ubuntu 20.04 Desktop : 完全対応
- macOS v10.15 Catalina : 完全対応

## 余談

一部環境で確認テストのマークができない問題が報告されています。その場合はFireFoxのテストのWindowのサイズ(縦横)を変更してやるとできるようになります。

## 便利なリンク

- [Firefoxで署名されていない拡張を入れる->未署名のアドオンを有効にする](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Packaging_and_installation)

## バグ報告

環境や何の講座かを添えて、Issuesまでどうぞ

## 開発と仕組みについて

東進PoSはWindowsのIEではSmoothstreamingでSilverlightというデジタル著作権保護技術を、AndroidとiOSではdash(mpd)でGoogleのWidevineと言うデジタル著作権保護技術を使っています。
Silverlight技術はWindowsのIEでのみ動くのに対して、Widevineは一般的なDRM(デジタル著作権保護)技術として利用されており、モダンブラウザやOSが対応しています。身近なサービスでこれを利用しているのはDアニメがあります。

これは著作権保護を外しているのではなくWidevineという著作権保護技術を使って再生しているだけです。そのため講義のダウンロードなどはできません。

## Silverlightの未来


["Silverlight End of Support"](https://support.microsoft.com/en-gb/help/4511036/silverlight-end-of-support)

Microsoft Silverlightは2021年の10月12日に終わりを迎えます。(`the Silverlight installer will no longer be available after the end of support date of October 12, 2021.`とあるのでダウンロードもできなくなります)Silverlight 開発フレームワークは現在Internet Explorer 11のみをサポートしていて、既にInternet Explorer 10のサポートは2020年の1月31日で終了しています。そしてもう、Chrome, Firefoxや他のブラウザ、そしてmacOSでは対応していません。