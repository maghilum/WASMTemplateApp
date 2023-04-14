let ensureCorrectUrl = function () {
    var url = window.location.href;
    var currentUrl = url.replace(/^(http:\/\/)/, "").replace(/^(https:\/\/)/, "");

    if (currentUrl.includes('//')) {

        currentUrl = currentUrl.replace('//', '/');

        if (url.startsWith('https://'))
            currentUrl = `https://${currentUrl}`;

        if (url.startsWith('http://'))
            currentUrl = `http://${currentUrl}`;

        window.location.replace(currentUrl);
    }
    else
        console.log('Url is correct...');
}

ensureCorrectUrl();

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
            'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
            '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>' +
            '</x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        //window.location.href = uri + base64(format(template, ctx))

        var url = uri + base64(format(template, ctx));
        var fileName = name + ".xls";

        const anchorElement = document.createElement('a');
        anchorElement.href = url;
        anchorElement.target = "_blank";
        anchorElement.download = fileName ?? '';
        anchorElement.click();
        anchorElement.remove();
        URL.revokeObjectURL(url);
    }
})()


window.getReportUrl = async (contentStreamReference) => {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return url;
}