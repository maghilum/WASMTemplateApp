function InitDataTable(elem, withNum = false, colClassDisableSorting = null, defaultOrderColIndex = null, pageLength = 10) {
    return new Promise(resolve => {
        setTimeout(function () {
            var pageMenus = [];
            var pageStart = pageLength;
            var pageInc = 5;

            for (var i = 1; i <= 5; i++) {
                pageMenus.push(pageStart);
                pageInc += pageInc;
                pageStart += pageInc;
            }

            var t = $(elem).DataTable({
                responsive: true,
                pageLength: pageLength,
                lengthMenu: pageMenus,
                columnDefs: [
                    colClassDisableSorting != null ? { orderable: false, targets: colClassDisableSorting } : null
                ],
                order: defaultOrderColIndex == null ? [[0, "asc"]] : [[defaultOrderColIndex, "asc"]]
            });

            $(elem).fadeIn();

            if (withNum) {
                t.on('order.dt search.dt', function () {
                    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();
            }

            setTimeout(function () {
                $(elem + "_wrapper .row:nth-of-type(2) .col-sm-12").addClass("table-responsive");

                resolve(true);
            }, 100);
        }, 50);
    });
}