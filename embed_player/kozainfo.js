$.ajax({
    url: 'https://pos.toshin.com/KKS/KKS1/Page/Design/KozaInfo.aspx?KozaCode=4785&Refresh=1',
    type: 'GET',
    statusCode: {
        200: function (data) {
            console.log(data);
            const result = data.responseText.match(/<td nowrap="nowrap" align="Center" valign="Middle">.+?<\/td><td>.+?<\/td>/g);
            var kozaList = {};
            for (var i = 0; i < result.length; i++) {
                var kozainfo = result[i].substring(51, result[i].length - 5).split("</td><td>");
                var kozaNum = kozainfo[0].replace(/ /g, '');
                var kozaName = kozainfo[1];
                kozaList[kozaNum] = kozaName;
            }
            var title2List = document.getElementsByClassName("tit_02");
            for (var i = 0; i < title2List.length; i++) {
                if (kozaList[title2List.innerText[i].replace(/ /g, '')]) {
                    title2List[i].innerText = title2List[i].innerText.replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ") + " - " + kozaList[title2List[i].innerText.replace(/ /g, '')].replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ");
                }
            }
        },
            302: function (data) {
            console.log(data);
            const result = data.responseText.match(/<td nowrap="nowrap" align="Center" valign="Middle">.+?<\/td><td>.+?<\/td>/g);
            var kozaList = {};
            for (var i = 0; i < result.length; i++) {
                var kozainfo = result[i].substring(51, result[i].length - 5).split("</td><td>");
                var kozaNum = kozainfo[0].replace(/ /g, '');
                var kozaName = kozainfo[1];
                kozaList[kozaNum] = kozaName;
            }
            var title2List = document.getElementsByClassName("tit_02");
            for (var i = 0; i < title2List.length; i++) {
                if (kozaList[title2List.innerText[i].replace(/ /g, '')]) {
                    title2List[i].innerText = title2List[i].innerText.replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ") + " - " + kozaList[title2List[i].innerText.replace(/ /g, '')].replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xfee0); }).replace(/[‐－―]/g, "-").replace(/[～〜]/g, "~").replace(/　/g, " ");
                }
            }
        }
    }
});