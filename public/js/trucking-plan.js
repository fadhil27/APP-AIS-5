
"use strict";



var tambah = 0;

function CreateTrucking() {
    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    $("#valid_planload").validate({
        // ignore: [],
        ignore: 'input[type=hidden]',
        rules: {

            activity: {
                required: true,
            },
            nomor_do: {
                required: true,
            },
            emkl: {
                required: true,
            },
            vessel: {
                required: true,
            },
            vessel_code: {
                required: true,
            },
            select_company: {
                required: true,
            },
            Pengirim_1: {
                required: true,
            },
            penerima_1: {
                required: true,
            },



        },
        messages: {

            select_company: {
                required: "Silakan Pilih Pelayaran",
            },
            activity: {
                required: "Silakan Pilih Activity",
            },
            emkl: {
                required: "Silakan isi EMKL",
            },
            vessel: {
                required: "Silakan Isi Vessel/Voyage",
            },
            vessel_code: {
                required: "Silakan Isi Vessel Code",
            },
            penerima_1: {
                required: "Silakan Pilih Penerima",
            },
            Pengirim_1: {
                required: "Silakan Pilih Pengirim",
            },


        },
        highlight: function highlight(element, errorClass, validClass) {
            $(element).addClass("is-invalid");
            $(element).removeClass("is-valid");
        },
        unhighlight: function unhighlight(element, errorClass, validClass) {
            $(element).removeClass("is-invalid");
            $(element).addClass("is-valid");
        },
        errorPlacement: function errorPlacement(error, element) {
            error.addClass("invalid-feedback");
            element.closest(".validation-container").append(error);
        },
        submitHandler: function (form) {
            let token = $("#csrf").val();
            let activity = document.getElementById("activity").value;
            let vessel = document.getElementById("vessel").value;
            let vessel_code = document.getElementById("vessel_code").value;
            let emkl = document.getElementById("emkl").value;
            let select_company = document.getElementById("select_company").value;
            let penerima = document.getElementById("penerima_1").value;
            let pengirim = document.getElementById("Pengirim_1").value;


            // let penerima = document.getElementById("Penerima_1").value;

            var fd = new FormData();
            var tempDate;
            var formattedDate;

            tempDate = new Date();
            formattedDate = [
                tempDate.getFullYear(),
                tempDate.getMonth() + 1,
                tempDate.getDate(),
            ].join("-");

            fd.append("_token", token);
            fd.append("tanggal", formattedDate);
            fd.append("vessel", vessel);
            fd.append("vessel_code", vessel_code);
            fd.append("select_company", select_company);
            fd.append("pengirim", pengirim);
            fd.append("penerima", penerima);
            fd.append("activity", activity);
            fd.append("emkl", emkl);

            fd.append("tambah", tambah);

            var jumlah_kontainer = [];
            var size = [];
            var type = [];
            var cargo = [];

            for(var i = 0; i < tambah; i++) {
                size[i] = [];
                type[i] = [];
                cargo[i] = [];
                jumlah_kontainer[i] = document.getElementById("jumlah-container[" + (i + 1) + "]").value;
                jumlah_kontainer[i] = parseInt(jumlah_kontainer[i]);
                fd.append("jumlah_kontainer[]", jumlah_kontainer[i]);

                for(var j = 0; j < jumlah_kontainer[i]; j++) {
                    size[i][j] = document.getElementById("size[" + (i + 1) + "]").value;
                    type[i][j] = document.getElementById("type[" + (i + 1) + "]").value;
                    cargo[i][j] = document.getElementById("cargo[" + (i + 1) + "]").value;

                    fd.append("size["+i+"][]", size[i][j]);
                    fd.append("type["+i+"][]", type[i][j]);
                    fd.append("cargo["+i+"][]", cargo[i][j]);
                }
            }

            swal.fire({
                title: "Apakah anda yakin?",
                text: "Ingin Membuat Plan Trucking Ini",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Iya",
                cancelButtonText: "Tidak",
            }).then((willCreate) => {
                if (willCreate.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: "/create-job-truckingplan",
                        data: fd,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                            swal.fire({
                                title: "Plan Trucking Dibuat",
                                text: "Plan Trucking Telah Berhasil Dibuat",
                                icon: "success",
                                timer: 2e3,
                                showConfirmButton: false,
                            });
                            window.location.href = "../truckingplan";
                        },
                    });
                } else {
                    swal.fire({
                        title: "Data Belum Dibuat",
                        text: "Silakan Cek Kembali Data Anda",
                        icon: "error",
                        timer: 10e3,
                        showConfirmButton: false,
                    });
                }
            });
        },
    });
}

function UpdatetePlan() {
    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    $("#valid_planload").validate({
        ignore: 'input[type=hidden]',

        rules: {

            activity: {
                required: true,
            },
            nomor_do: {
                required: true,
            },
            emkl: {
                required: true,
            },
            vessel: {
                required: true,
            },
            vessel_code: {
                required: true,
            },
            select_company: {
                required: true,
            },
            Pengirim_1: {
                required: true,
            },
            Penerima_1: {
                required: true,
            },



        },
        messages: {

            select_company: {
                required: "Silakan Pilih Pelayaran",
            },
            activity: {
                required: "Silakan Pilih Activity",
            },
            emkl: {
                required: "Silakan isi EMKL",
            },
            vessel: {
                required: "Silakan Isi Vessel/Voyage",
            },
            vessel_code: {
                required: "Silakan Isi Vessel Code",
            },
            Penerima_1: {
                required: "Silakan Pilih Penerima",
            },
            Pengirim_1: {
                required: "Silakan Pilih Pengirim",
            },


        },
        highlight: function highlight(element, errorClass, validClass) {
            $(element).addClass("is-invalid");
            $(element).removeClass("is-valid");
        },
        unhighlight: function unhighlight(element, errorClass, validClass) {
            $(element).removeClass("is-invalid");
            $(element).addClass("is-valid");
        },
        errorPlacement: function errorPlacement(error, element) {
            error.addClass("invalid-feedback");
            element.closest(".validation-container").append(error);
        },
        submitHandler: function (form) {
            let token = $("#csrf").val();
            let activity = document.getElementById("activity").value;
            let vessel = document.getElementById("vessel").value;
            let vessel_code = document.getElementById("vessel_code").value;
            let emkl = document.getElementById("emkl").value;
            let select_company = document.getElementById("select_company").value;
            let penerima = document.getElementById("Penerima_1").value;
            let pengirim = document.getElementById("Pengirim_1").value;
            let old_slug = document.getElementById("old_slug").value;


            // let penerima = document.getElementById("Penerima_1").value;

            var fd = new FormData();
            var tempDate;
            var formattedDate;

            tempDate = new Date();
            formattedDate = [
                tempDate.getFullYear(),
                tempDate.getMonth() + 1,
                tempDate.getDate(),
            ].join("-");

            fd.append("_token", token);
            fd.append("tanggal", formattedDate);
            fd.append("vessel", vessel);
            fd.append("vessel_code", vessel_code);
            fd.append("select_company", select_company);
            fd.append("pengirim", pengirim);
            fd.append("penerima", penerima);
            fd.append("activity", activity);
            fd.append("emkl", emkl);


            fd.append("old_slug", old_slug);
            var table_container = document.getElementById("table_container");
            var urutan = table_container.tBodies[0].rows.length;

            fd.append("urutan", urutan);

            var jumlah_kontainer = [];
            var size = [];
            var type = [];
            var cargo = [];

            for(var i = 0; i < urutan; i++) {
                size[i] = [];
                type[i] = [];
                cargo[i] = [];
                jumlah_kontainer[i] = document.getElementById("jumlah-container[" + (i + 1) + "]").value;
                jumlah_kontainer[i] = parseInt(jumlah_kontainer[i]);
                fd.append("jumlah_kontainer[]", jumlah_kontainer[i]);

                for(var j = 0; j < jumlah_kontainer[i]; j++) {
                    size[i][j] = document.getElementById("size[" + (i + 1) + "]").value;
                    type[i][j] = document.getElementById("type[" + (i + 1) + "]").value;
                    cargo[i][j] = document.getElementById("cargo[" + (i + 1) + "]").value;

                    fd.append("size["+i+"][]", size[i][j]);
                    fd.append("type["+i+"][]", type[i][j]);
                    fd.append("cargo["+i+"][]", cargo[i][j]);
                }
            }

            swal.fire({
                title: "Apakah anda yakin?",
                text: "Ingin MENGUPDATE Job Ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Iya",
                cancelButtonText: "Tidak",
            }).then((willCreate) => {
                if (willCreate.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: "/update-job-truckinplan",
                        data: fd,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                            swal.fire({
                                title: "JOB Trucking DIUPDATE",
                                text: "JOB Trucking Telah Berhasil DIUPDATE",
                                icon: "success",
                                timer: 9e3,
                                showConfirmButton: false,
                            });
                            window.location.href = "../truckingplan";
                        },
                    });
                } else {
                    swal.fire({
                        title: "Data Tidak Diupdate",
                        text: "Silakan Cek Kembali Data Anda",
                        icon: "error",
                        timer: 10e3,
                        showConfirmButton: false,
                    });
                }
            });
        },
    });
}

function tambah_kontener() {
    let token = $("#csrf").val();

    var table = document.getElementById("tbody_container");
    tambah++;

    $.ajax({
        url: "/getJenisKontainer",
        type: "post",
        data: {
            _token: token,
        },
        success: function (response) {
            var size = [""];
            var type = [""];
            for (var i = 0; i < response.size.length; i++) {
                size +=
                    "<option value='" +
                    response.size[i].size_container +
                    "'>" +
                    response.size[i].size_container +
                    "</option>";
            }
            for (var i = 0; i < response.type.length; i++) {
                type +=
                    "<option value='" +
                    response.type[i].type_container +
                    "'>" +
                    response.type[i].type_container +
                    "</option>";
            }
            var div1 = document.createElement("div");
            div1.setAttribute("class", "validation-container");
            var input1 = document.createElement("input");
            input1.setAttribute("class", "form-control jumlah-container");
            input1.setAttribute("id", "jumlah-container[" + tambah + "]");
            input1.setAttribute("name", "jumlah-container[" + tambah + "]");
            input1.setAttribute("required", true);
            input1.setAttribute("type", "text");
            input1.setAttribute("min", 0);
            input1.setAttribute("max", 100);
            input1.setAttribute("value", 0);
            div1.append(input1);

            var label1 = document.createElement("div");
            var labelx = document.createElement("label");
            labelx.innerHTML = "X";
            label1.append(labelx);


            var div2 = document.createElement("div");
            div2.setAttribute("class", "validation-container");
            var select1 = document.createElement("select");
            select1.innerHTML =
            "<option selected disabled>Pilih Kontainer</option>" + size;
            select1.setAttribute("id", "size[" + tambah + "]");
            select1.setAttribute("class", "form-select");
            select1.setAttribute("name", "size[" + tambah + "]");
            select1.setAttribute("required", true);
            div2.append(select1);
            var div3 = document.createElement("div");
            div3.setAttribute("class", "validation-container");
            var select2 = document.createElement("select");
            select2.innerHTML =
                "<option selected disabled>Pilih Kontainer</option>" + type;
            select2.setAttribute("id", "type[" + tambah + "]");
            select2.setAttribute("class", "form-select");
            select2.setAttribute("name", "type[" + tambah + "]");
            select2.setAttribute("required", true);
            div3.append(select2);
            var div4 = document.createElement("div");
            div4.setAttribute("class", "validation-container");
            var textarea1 = document.createElement("textarea");
            textarea1.setAttribute("id", "cargo[" + tambah + "]");
            textarea1.setAttribute("name", "cargo[" + tambah + "]");
            textarea1.setAttribute("class", "form-control");
            textarea1.setAttribute("required", true);
            div4.append(textarea1);
            var button = document.createElement("button");
            button.setAttribute("id", "deleterow" + tambah);
            button.setAttribute(
                "class",
                "btn btn-label-danger btn-icon btn-circle btn-sm"
            );
            button.setAttribute("type", "button");
            button.setAttribute("onclick", "delete_container(this)");
            var icon = document.createElement("i");
            icon.setAttribute("class", "fa fa-trash");
            button.append(icon);

            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);

            cell1.innerHTML = "1.";
            cell2.appendChild(div1);
            cell3.appendChild(label1);
            cell4.appendChild(div2);
            cell5.appendChild(div3);
            cell6.appendChild(div4);
            cell7.appendChild(button);

            reindex_container();
        },
    });
}

function reindex_container() {
    var nomor_tabel_lokasi;

    const ids = document.querySelectorAll(
        "#table_container tr > td:nth-child(1)"
    );
    ids.forEach((e, i) => {
        e.innerHTML = i + 1 + ".";
        nomor_tabel_lokasi = i + 1;
    });

    $("#table_container tr > td:nth-child(2) input").TouchSpin({
        buttondown_class: "btn btn-label-primary",
        buttonup_class: "btn btn-label-primary",
        max: 100,
        min: 1,
        step: 1,
    });
}

function delete_container(r) {
    var table = r.parentNode.parentNode.rowIndex;
    document.getElementById("table_container").deleteRow(table);
    tambah--;

    var input1 = document.querySelectorAll(
        "#table_container tr td:nth-child(2) input"
    );
    for (var i = 0; i < input1.length; i++) {
        input1[i].id = "jumlah-container[" + (i + 1) + "]";
        input1[i].name = "jumlah-container[" + (i + 1) + "]";
    }
    var label1 = document.querySelectorAll(
        "#table_container tr td:nth-child(3) input"
    );



    var select1 = document.querySelectorAll("#table_container tr td:nth-child(4) select");
    for (var i = 0; i < select1.length; i++) {
        select1[i].id = "size[" + (i + 1) + "]";
        select1[i].name = "size[" + (i + 1) + "]";
    }

    var select2 = document.querySelectorAll("#table_container tr td:nth-child(5) select");
    for (var i = 0; i < select2.length; i++) {
        select2[i].id = "type[" + (i + 1) + "]";
        select2[i].name = "type[" + (i + 1) + "]";
    }

    var textarea1 = document.querySelectorAll("#table_container tr td:nth-child(6) textarea");
    for (var i = 0; i < textarea1.length; i++) {
        textarea1[i].id = "cargo[" + (i + 1) + "]";
        textarea1[i].name = "cargo[" + (i + 1) + "]";
    }

    var button = document.querySelectorAll(
        "#table_container tr td:nth-child(7) button"
    );
    for (var i = 0; i < button.length; i++) {
        button[i].id = "deleterow" + (i + 1);
    }

    reindex_container();
}

function edit_kontener() {
    var table_container = document.getElementById("table_container");
    var urutan = table_container.tBodies[0].rows.length;

    let token = $("#csrf").val();

    var table = document.getElementById("tbody_container");
    urutan++;

    $.ajax({
        url: "/getJenisKontainer",
        type: "post",
        data: {
            _token: token,
        },
        success: function (response) {
            var size = [""];
            var type = [""];
            for (var i = 0; i < response.size.length; i++) {
                size +=
                    "<option value='" +
                    response.size[i].size_container +
                    "'>" +
                    response.size[i].size_container +
                    "</option>";
            }
            for (var i = 0; i < response.type.length; i++) {
                type +=
                    "<option value='" +
                    response.type[i].type_container +
                    "'>" +
                    response.type[i].type_container +
                    "</option>";
            }
            var div1 = document.createElement("div");
            div1.setAttribute("class", "validation-container");
            var input1 = document.createElement("input");
            input1.setAttribute("class", "form-control jumlah-container");
            input1.setAttribute("id", "jumlah-container[" + urutan + "]");
            input1.setAttribute("name", "jumlah-container[" + urutan + "]");
            input1.setAttribute("required", true);
            input1.setAttribute("type", "text");
            input1.setAttribute("value", 0);
            div1.append(input1);

            var label1 = document.createElement("div");
            var labelx = document.createElement("label");
            labelx.innerHTML = "X";
            label1.append(labelx);

            var div2 = document.createElement("div");
            div2.setAttribute("class", "validation-container");
            var select1 = document.createElement("select");
            select1.innerHTML =
                "<option selected disabled>Pilih Size Kontainer</option>" + size;
            select1.setAttribute("id", "size[" + urutan + "]");
            select1.setAttribute("class", "form-select");
            select1.setAttribute("name", "size[" + urutan + "]");
            select1.setAttribute("required", true);
            div2.append(select1);
            var div3 = document.createElement("div");
            div3.setAttribute("class", "validation-container");
            var select2 = document.createElement("select");
            select2.innerHTML =
                "<option selected disabled>Pilih Type Kontainer</option>" + type;
            select2.setAttribute("id", "type[" + urutan + "]");
            select2.setAttribute("class", "form-select");
            select2.setAttribute("name", "type[" + urutan + "]");
            select2.setAttribute("required", true);
            div3.append(select2);
            var div4 = document.createElement("div");
            div4.setAttribute("class", "validation-container");
            var textarea1 = document.createElement("textarea");
            textarea1.setAttribute("id", "cargo[" + urutan + "]");
            textarea1.setAttribute("name", "cargo[" + urutan + "]");
            textarea1.setAttribute("class", "form-control");
            textarea1.setAttribute("required", true);
            div4.append(textarea1);
            var button = document.createElement("button");
            button.setAttribute("id", "deleterow" + urutan);
            button.setAttribute(
                "class",
                "btn btn-label-danger btn-icon btn-circle btn-sm"
            );
            button.setAttribute("type", "button");
            button.setAttribute("onclick", "delete_container(this)");
            var icon = document.createElement("i");
            icon.setAttribute("class", "fa fa-trash");
            button.append(icon);


            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);

            cell1.innerHTML = "1.";
            cell2.appendChild(div1);
            cell3.appendChild(label1);
            cell4.appendChild(div2);
            cell5.appendChild(div3);
            cell6.appendChild(div4);
            cell7.appendChild(button);

            reindex_container();
        },
    });
}

function change_container(ini) {
    let token = $("#csrf").val();
    var urutan = ini.parentNode.parentNode.parentNode.rowIndex;
    var id_container = ini.value;

    $.ajax({
        url: "/getSizeTypeContainer",
        type: "post",
        data: {
            id_container: id_container,
            _token: token,
        },
        success: function (response) {
            document.getElementById("size[" + urutan + "]").innerHTML =
                response[0].size_container;
            document.getElementById("type[" + urutan + "]").innerHTML =
                response[0].type_container;
        },
    });
}
