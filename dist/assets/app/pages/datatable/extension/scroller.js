"use strict";
$(function () {
    $("#datatable-1").DataTable({
        ajax: "https://blueupcode.com/datatable/api.json",
        deferRender: true,
        scrollCollapse: true,
        scrollY: 300,
        scroller: true,
    });
});
