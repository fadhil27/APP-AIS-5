"use strict";
$(function () {
    var offset =
        $(window).width() >= 1025
            ? $("#sticky-header-desktop").height()
            : $("#sticky-header-mobile").height();
    $("#datatable-1").DataTable({
        responsive: true,
        fixedHeader: { header: true, headerOffset: offset },
    });
    $("#datatable-2").DataTable({
        responsive: true,
        fixedHeader: { header: true, footer: true, headerOffset: offset },
    });
});
