
// https://pos.toshin.com/JKMR/Student2/StdKobetsuJukoYoyaku/KosuSelect
// https://test.toshin.com/TEST_2012/JKM/Student/StdKobetsuJukoYoyaku/KosuSelect
// 大文字小文字区別なし

var kozaid = document.documentElement.innerHTML.match(/<label id=\"LblKozaCode\">.+?<\/label>/g)[0];
kozaid = kozaid.substring(24, kozaid.length - 8);

$.ajax({
    url: 'https://pos.toshin.com/KKS/KKS1/Page/Design/KozaInfo.aspx?KozaCode=' + kozaid + '&Refresh=1',
    type: 'GET',
    statusCode: {
        200: function (data) {
            console.log(data);
            const result = data.match(/<td nowrap="nowrap" align="Center" valign="Middle">.+?<\/td><td>.+?<\/td>/g);
            if (result != null) {
                var kozaList = {};
                for (var i = 0; i < result.length; i++) {
                    var kozainfo = result[i].substring(51, result[i].length - 5).split("</td><td>");
                    var kozaNum = kozainfo[0].replace(/ /g, '');
                    var kozaName = kozainfo[1];
                    kozaList[kozaNum] = kozaName;
                }
                console.log(kozaList);
                var title2List = document.getElementsByClassName("tit_02");
                for (var i = 0; i < title2List.length; i++) {
                    if (kozaList[title2List[i].innerText.replace(/ /g, '')]) {
                        title2List[i].innerText = title2List[i].innerText.replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ") + " - " + kozaList[title2List[i].innerText.replace(/ /g, '')].replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ");
                    }
                }
            }
        },
        302: function (data) {
            console.log(data.responseText);
            const result = data.responseText.match(/<td nowrap="nowrap" align="Center" valign="Middle">.+?<\/td><td>.+?<\/td>/g);
            if (result != null) {
                var kozaList = {};
                for (var i = 0; i < result.length; i++) {
                    var kozainfo = result[i].substring(51, result[i].length - 5).split("</td><td>");
                    var kozaNum = kozainfo[0].replace(/ /g, '');
                    var kozaName = kozainfo[1];
                    kozaList[kozaNum] = kozaName;
                }
                console.log(kozaList);
                var title2List = document.getElementsByClassName("tit_02");
                for (var i = 0; i < title2List.length; i++) {
                    if (kozaList[title2List[i].innerText.replace(/ /g, '')]) {
                        title2List[i].innerText = title2List[i].innerText.replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ") + " - " + kozaList[title2List[i].innerText.replace(/ /g, '')].replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ");
                    }
                }
            }
        }
    }
});