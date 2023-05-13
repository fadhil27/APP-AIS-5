function UpdateteJobProcessload() {
    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    $("#valid_processload").validate({
        ignore: "select[type=hidden]",

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

            // Event.preventDefault();

            let old_slug = document.getElementById("old_slug").value;
            var table_container = document.getElementById("processload_create");
            var urutan = table_container.tBodies[0].rows.length;

            var nomor_kontainer = [];
            var seal = [];
            var date_activity = [];
            var tempDate = [];
            var formattedDate = [];
            var cargo = [];
            var lokasi = [];
            var driver = [];
            var nomor_polisi = [];
            var remark = [];
            var biaya_stuffing = [];
            var biaya_trucking = [];
            var ongkos_supir = [];
            var biaya_thc = [];
            var jenis_mobil = [];
            var detail_barang = [];
            // var no_surat = [];

            var fd = new FormData();

            for (let i = 0; i < urutan; i++) {
                nomor_kontainer[i] = document.getElementById(
                    "nomor_kontainer[" + (i + 1) + "]"
                ).value;
                fd.append("nomor_kontainer[]", nomor_kontainer[i]);

                seal[i] = document.getElementById(
                    "seal[" + (i + 1) + "]"
                ).value;
                fd.append("seal[]", seal[i]);

                cargo[i] = document.getElementById(
                    "cargo[" + (i + 1) + "]"
                ).value;
                fd.append("cargo[]", cargo[i]);

                date_activity[i] = document.getElementById(
                    "date_activity[" + (i + 1) + "]"
                ).value;
                tempDate[i] = new Date(date_activity[i]);
                formattedDate[i] = [
                    tempDate[i].getFullYear(),
                    tempDate[i].getMonth() + 1,
                    tempDate[i].getDate(),
                ].join("-");
                fd.append("date_activity[]", formattedDate[i]);
                lokasi[i] = document.getElementById(
                    "lokasi[" + (i + 1) + "]"
                ).value;
                fd.append("lokasi[]", lokasi[i]);

                driver[i] = document.getElementById(
                    "driver[" + (i + 1) + "]"
                ).value;
                fd.append("driver[]", driver[i]);

                nomor_polisi[i] = document.getElementById(
                    "nomor_polisi[" + (i + 1) + "]"
                ).value;
                fd.append("nomor_polisi[]", nomor_polisi[i]);

                remark[i] = document.getElementById(
                    "remark[" + (i + 1) + "]"
                ).value;
                fd.append("remark[]", remark[i]);

                biaya_stuffing[i] = document.getElementById(
                    "biaya_stuffing[" + (i + 1) + "]"
                ).value;
                fd.append("biaya_stuffing[]", biaya_stuffing[i]);

                biaya_trucking[i] = document.getElementById(
                    "biaya_trucking[" + (i + 1) + "]"
                ).value;
                fd.append("biaya_trucking[]", biaya_trucking[i]);

                ongkos_supir[i] = document.getElementById(
                    "ongkos_supir[" + (i + 1) + "]"
                ).value;
                fd.append("ongkos_supir[]", ongkos_supir[i]);

                biaya_thc[i] = document.getElementById(
                    "biaya_thc[" + (i + 1) + "]"
                ).value;
                fd.append("biaya_thc[]", biaya_thc[i]);

                detail_barang[i] = document.getElementById(
                    "detail_barang[" + (i + 1) + "]"
                ).value;
                fd.append("detail_barang[]", detail_barang[i]);

                jenis_mobil[i] = document.getElementById(
                    "jenis_mobil[" + (i + 1) + "]"
                ).value;
                fd.append("jenis_mobil[]", jenis_mobil[i]);
            }

            var no_surat = [];
            var date_activity2 = [];
            var tempDate2 = []
            var tahun2 = [];

            for(var i = 0; i < urutan; i++) {
                $.ajax({
                    url: "/getNoSurat",
                    type: "post",
                    datatype: "json",
                    async: false,
                    data: {
                        tahun: tempDate[i].getFullYear(),
                        _token: token
                    },
                    success: function (response) {
                        var sjc = "SJC";
                        var ais = "AIS";
                        var m = "M";
                        date_activity2[i] = document.getElementById("date_activity[" + (i + 1) + "]").value;
                        tempDate2[i] = new Date(date_activity2[i]);
                        tahun2[i] = tempDate2[i].getFullYear();

                        if(response == 0) {
                            if(i == 0){
                                var first = 1;
                                no_surat[i] = sjc + tempDate[i].getFullYear() + ais + String((tempDate[i].getMonth() + 1)).padStart(2, "0") + String(tempDate[i].getDate()).padStart(2, "0") + String(first).padStart(6, "0") + m;
                                fd.append("no_surat[]", no_surat[i]);
                                fd.append("tahun[]", tempDate[i].getFullYear());
                            } else {
                                var mid_last = tahun2.filter(j => j === tahun2[i]).length;
                                no_surat[i] = sjc + tempDate[i].getFullYear() + ais + String((tempDate[i].getMonth() + 1)).padStart(2, "0") + String(tempDate[i].getDate()).padStart(2, "0") + String(mid_last).padStart(6, "0") + m;
                                fd.append("no_surat[]", no_surat[i]);
                                fd.append("tahun[]", tempDate[i].getFullYear());
                            }
                        } else {
                            if(i == 0){
                                var first = 1;
                                no_surat[i] = sjc + tempDate[i].getFullYear() + ais + String((tempDate[i].getMonth() + 1)).padStart(2, "0") + String(tempDate[i].getDate()).padStart(2, "0") + String(first + response).padStart(6, "0") + m;
                                fd.append("no_surat[]", no_surat[i]);
                                fd.append("tahun[]", tempDate[i].getFullYear());
                            } else {
                                var mid_last = tahun2.filter(j => j === tahun2[i]).length;
                                no_surat[i] = sjc + tempDate[i].getFullYear() + ais + String((tempDate[i].getMonth() + 1)).padStart(2, "0") + String(tempDate[i].getDate()).padStart(2, "0") + String(mid_last + response).padStart(6, "0") + m;
                                fd.append("no_surat[]", no_surat[i]);
                                fd.append("tahun[]", tempDate[i].getFullYear());
                            }
                        }
                    }
                })
            }


            // var today = new Date();
            // var tahun = today.getFullYear();
            // var bulan = today.getMonth() + 1;
            // var tanggal = today.getDate().toString().padStart(2, "0");

            // $.ajax({
            //     url: "/getNoSurat",
            //     type: "post",
            //     data: {
            //         tahun: tahun,
            //         _token: token,
            //     },
            //     success: function (response) {
            //         var no_surat = [];
            //         var sjc = "SJC";
            //         var ais = "AIS";
            //         var m = "M";
            //         var data_bulan = [];
            //         var data_tahun = [];
            //         if (response == 0) {
            //             for (var i = 0; i < urutan; i++) {
            //                 data_bulan[i] = bulan;
            //                 data_tahun[i] = tahun;
            //                 no_surat[i] =
            //                     sjc +
            //                     tempDate[i].getFullYear() +
            //                     ais +
            //                     String((tempDate[i].getMonth() + 1)).padStart(2, "0") +
            //                     String((tempDate[i].getDate()).padStart(2, "0")) +
            //                     String(i + 1).padStart(6, "0") +
            //                     m;
            //                 fd.append("no_surat[]", no_surat[i]);
            //                 fd.append("bulan[]", data_bulan[i]);
            //                 fd.append("tahun[]", data_tahun[i]);
            //             }
            //         } else {
            //             for (var i = 0; i < urutan; i++) {
            //                 data_bulan[i] = bulan;
            //                 data_tahun[i] = tahun;
            //                 no_surat[i] =
            //                     sjc +
            //                     tahun +
            //                     ais +
            //                     bulan +
            //                     tanggal +
            //                     String(i + response + 1).padStart(5, "0") +
            //                     m;
            //                 fd.append("no_surat[]", no_surat[i]);
            //                 fd.append("bulan[]", data_bulan[i]);
            //                 fd.append("tahun[]", data_tahun[i]);
            //             }
            //         }
            //     },
            // });

            //BIAYALAINNYA
            var kontainer_biaya = [];
            var harga_biaya = [];
            var keterangan = [];

            for (let i = 0; i < tambah; i++) {
                kontainer_biaya[i] = document.getElementById(
                    "kontainer_biaya[" + (i + 1) + "]"
                ).value;
                fd.append("kontainer_biaya[]", kontainer_biaya[i]);

                harga_biaya[i] = document.getElementById(
                    "harga[" + (i + 1) + "]"
                ).value;
                fd.append("harga_biaya[]", harga_biaya[i]);

                keterangan[i] = document.getElementById(
                    "keterangan[" + (i + 1) + "]"
                ).value;
                fd.append("keterangan[]", keterangan[i]);
            }

            var kontainer_alih = [];
            var harga_alih_kapal = [];
            var keterangan_alih_kapal = [];

            var pelayaran_alih = [];
            var pot_alih = [];
            var pod_alih = [];
            var vesseL_alih = [];
            var code_vesseL_alih = [];

            for (let i = 0; i < clickalih; i++) {
                kontainer_alih[i] = document.getElementById(
                    "kontainer_alih[" + (i + 1) + "]"
                ).value;
                fd.append("kontainer_alih[]", kontainer_alih[i]);

                harga_alih_kapal[i] = document.getElementById(
                    "harga_alih_kapal[" + (i + 1) + "]"
                ).value;
                fd.append("harga_alih_kapal[]", harga_alih_kapal[i]);

                keterangan_alih_kapal[i] = document.getElementById(
                    "keterangan_alih_kapal[" + (i + 1) + "]"
                ).value;
                fd.append("keterangan_alih_kapal[]", keterangan_alih_kapal[i]);

                pelayaran_alih[i] = document.getElementById(
                    "pelayaran_alih[" + (i + 1) + "]"
                ).value;
                fd.append("pelayaran_alih[]", pelayaran_alih[i]);

                pot_alih[i] = document.getElementById(
                    "pot_alih[" + (i + 1) + "]"
                ).value;
                fd.append("pot_alih[]", pot_alih[i]);

                pod_alih[i] = document.getElementById(
                    "pod_alih[" + (i + 1) + "]"
                ).value;
                fd.append("pod_alih[]", pod_alih[i]);

                vesseL_alih[i] = document.getElementById(
                    "vesseL_alih[" + (i + 1) + "]"
                ).value;
                fd.append("vesseL_alih[]", vesseL_alih[i]);

                code_vesseL_alih[i] = document.getElementById(
                    "code_vesseL_alih[" + (i + 1) + "]"
                ).value;
                fd.append("code_vesseL_alih[]", code_vesseL_alih[i]);
            }

            var kontainer_batal = [];
            var harga_batal_muat = [];
            var keterangan_batal_muat = [];

            for (let i = 0; i < clickbatal; i++) {
                kontainer_batal[i] = document.getElementById(
                    "kontainer_batal[" + (i + 1) + "]"
                ).value;
                fd.append("kontainer_batal[]", kontainer_batal[i]);

                harga_batal_muat[i] = document.getElementById(
                    "harga[" + (i + 1) + "]"
                ).value;
                fd.append("harga_batal_muat[]", harga_batal_muat[i]);

                keterangan_batal_muat[i] = document.getElementById(
                    "keterangan_batal_muat[" + (i + 1) + "]"
                ).value;
                fd.append("keterangan_batal_muat[]", keterangan_batal_muat[i]);
            }

            fd.append("_token", token);
            fd.append("urutan", urutan);
            fd.append("tambah", tambah);
            fd.append("clickalih", clickalih);
            fd.append("clickbatal", clickbatal);
            fd.append("old_slug", old_slug);

            swal.fire({
                title: "Apakah anda yakin?",
                text: "Ingin MemProses Job Ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Iya",
                cancelButtonText: "Tidak",
            }).then(
                (
                    willCreate,
                    
                ) => {
                    if (willCreate.isConfirmed) {
                        $.ajax({
                            type: "POST",
                            url: "/create-job-processload",
                            data: fd,
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            success: function (response) {
                                swal.fire({
                                    title: "JOB processload Dibuat",
                                    text: "JOB processload Telah Berhasil Dibuat",
                                    icon: "success",
                                    timer: 9e3,
                                    showConfirmButton: false,
                                });
                                window.location.href = "../processload";
                            },
                        });
                    } else {
                        swal.fire({
                            title: "Load Job Tidak Diproess",
                            text: "Silakan Cek Kembali Data Anda",
                            icon: "error",
                            timer: 10e3,
                            showConfirmButton: false,
                        });
                    }
                }
            );
        },
    });
}


var table_container1 = document.getElementById("processload_create");
var urutan1 = table_container1.tBodies[0].rows.length;
urutan1 = parseInt(urutan1);
console.log(urutan1);

function reindex_container() {
    const ids = document.querySelectorAll(
        "#processload_create tr > td:nth-child(2)"
    );
    ids.forEach((e, i) => {
        e.innerHTML = i + 1 + ".";
        nomor_tabel_lokasi = i + 1;
    });


}

function delete_kontainer(r) {
    var table = r.parentNode.parentNode.rowIndex;
    document.getElementById("processload_create").deleteRow(table);
    urutan1--;

    var button = document.querySelectorAll(
        "#processload_create tr td:nth-child(1) button"
    );

    for (var i = 0; i < button.length; i++) {
        button[i].id = "button_kontainer[" + (i+1) + "]";
        button[i].name = "button_kontainer[" + (i+1) + "]";
    }

    var label = document.querySelectorAll(
        "#processload_create tr td:nth-child(3) label"
    );

    for (var i = 0; i < label.length; i++) {
        label[i].id = "size[" + (i + 1) + "]";
        label[i].name = "size[" + (i + 1) + "]";
    }


    var input = document.querySelectorAll(
        "#processload_create tr td:nth-child(4) input"
    );

    for (var i = 0; i < input.length; i++) {
        input[i].id = "nomor_kontainer[" + (i + 1) + "]";
        input[i].name = "nomor_kontainer[" + (i + 1) + "]";
    }

    var input2 = document.querySelectorAll(
        "#processload_create tr td:nth-child(5) input"
    );

    for (var i = 0; i < input2.length; i++) {
        input2[i].id = "cargo[" + (i + 1) + "]";
        input2[i].name = "cargo[" + (i + 1) + "]";
    }

    var select1 = document.querySelectorAll(
        "#processload_create tr td:nth-child(6) select"
    );

    for (var i = 0; i < select1.length; i++) {
        select1[i].id = "seal[" + (i + 1) + "]";
        select1[i].name = "seal[" + (i + 1) + "]";
        // select1[i].data-select2-id = "seal[" + (i + 1) + "]";
    }

    var input3 = document.querySelectorAll(
        "#processload_create tr td:nth-child(8) input"
    );

    for (var i = 0; i < input3.length; i++) {
        input3[i].id = "date_activity[" + (i + 1) + "]";
        input3[i].name = "date_activity[" + (i + 1) + "]";
    }

    var select2 = document.querySelectorAll(
        "#processload_create tr td:nth-child(9) select"
    );

    for (var i = 0; i < select2.length; i++) {
        select2[i].id = "lokasi[" + (i + 1) + "]";
        select2[i].name = "lokasi[" + (i + 1) + "]";
    }

    var input4 = document.querySelectorAll(
        "#processload_create tr td:nth-child(10) input"
    );

    for (var i = 0; i < input4.length; i++) {
        input4[i].id = "driver[" + (i + 1) + "]";
        input4[i].name = "driver[" + (i + 1) + "]";
    }

    var input5 = document.querySelectorAll(
        "#processload_create tr td:nth-child(11) input"
    );

    for (var i = 0; i < input5.length; i++) {
        input5[i].id = "nomor_polisi[" + (i + 1) + "]";
        input5[i].name = "nomor_polisi[" + (i + 1) + "]";
    }

    var input6 = document.querySelectorAll(
        "#processload_create tr td:nth-child(12) input"
    );

    for (var i = 0; i < input6.length; i++) {
        input6[i].id = "remark[" + (i + 1) + "]";
        input6[i].name = "remark[" + (i + 1) + "]";
    }

    var input7 = document.querySelectorAll(
        "#processload_create tr td:nth-child(13) input"
    );

    for (var i = 0; i < input7.length; i++) {
        input7[i].id = "biaya_stuffing[" + (i + 1) + "]";
        input7[i].name = "biaya_stuffing[" + (i + 1) + "]";
    }

    var input8 = document.querySelectorAll(
        "#processload_create tr td:nth-child(14) input"
    );

    for (var i = 0; i < input8.length; i++) {
        input8[i].id = "biaya_trucking[" + (i + 1) + "]";
        input8[i].name = "biaya_trucking[" + (i + 1) + "]";
    }

    var input9 = document.querySelectorAll(
        "#processload_create tr td:nth-child(15) input"
    );

    for (var i = 0; i < input9.length; i++) {
        input9[i].id = "ongkos_supir[" + (i + 1) + "]";
        input9[i].name = "ongkos_supir[" + (i + 1) + "]";
    }

    var input10 = document.querySelectorAll(
        "#processload_create tr td:nth-child(16) input"
    );

    for (var i = 0; i < input10.length; i++) {
        input10[i].id = "biaya_thc[" + (i + 1) + "]";
        input10[i].name = "biaya_thc[" + (i + 1) + "]";
    }

    var select3 = document.querySelectorAll(
        "#processload_create tr td:nth-child(17) select"
    );

    for (var i = 0; i < select3.length; i++) {
        select3[i].id = "jenis_mobil[" + (i + 1) + "]";
        select3[i].name = "jenis_mobil[" + (i + 1) + "]";
    }



    reindex_container();
}

var tambah = 0;

function tambah_biaya() {
    let token = $("#csrf").val();
    let slug = $("#old_slug").val();

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    var table = document.getElementById("tbody_biaya");
    tambah++;

    var table_container = document.getElementById("processload_create");
    var urutan = table_container.tBodies[0].rows.length;
    var ifkontainer = [];

    for (let i = 0; i < urutan; i++) {
        ifkontainer[i] = document.getElementById(
            "nomor_kontainer[" + (i + 1) + "]"
        ).value;
    }
    if (ifkontainer.includes("")) {
        swal.fire({
            title: "Silahkan Masukkan Nomor Kontainer Terlebih Dahulu",
            icon: "error",
            timer: 10e3,
            showConfirmButton: false,
        }).then(() => {
            tambah = tambah - 1;
        });
    } else {
        var nomor_kontainer = [""];

        var table_container = document.getElementById("processload_create");
        var urutan = table_container.tBodies[0].rows.length;
        for (var i = 0; i < urutan; i++) {
            value_kontainer = document.getElementById(
                "nomor_kontainer[" + (i + 1) + "]"
            ).value;
            nomor_kontainer +=
                "<option value='" +
                value_kontainer +
                "'>" +
                value_kontainer +
                "</option>";
        }

        var div1 = document.createElement("div");
        div1.setAttribute("class", "validation-container");
        var select = document.createElement("select");
        select.innerHTML =
            "<option selected disabled>Pilih Nomor Kontainer</option>" +
            nomor_kontainer;
        select.setAttribute("id", "kontainer_biaya[" + tambah + "]");
        select.setAttribute("name", "kontainer_biaya[" + tambah + "]");
        select.setAttribute("class", "form-select");
        select.setAttribute("required", true);
        div1.append(select);
        var div2 = document.createElement("div");
        div2.setAttribute("class", "validation-container");
        var input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("type", "text");
        input.setAttribute("required", true);
        input.setAttribute("placeholder", "Harga");
        input.setAttribute("onkeydown", "return numbersonly(this, event);");
        input.setAttribute("onkeyup", "javascript:tandaPemisahTitik(this);");
        input.setAttribute("id", "harga[" + tambah + "]");
        input.setAttribute("name", "harga[" + tambah + "]");
        div2.append(input);
        var div3 = document.createElement("div");
        div3.setAttribute("class", "validation-container");
        var textarea = document.createElement("textarea");
        textarea.setAttribute("class", "form-control");
        textarea.setAttribute("required", true);
        textarea.setAttribute("id", "keterangan[" + tambah + "]");
        textarea.setAttribute("name", "keterangan[" + tambah + "]");
        div3.append(textarea);
        var button = document.createElement("button");
        button.setAttribute("id", "deleterow" + tambah);
        button.setAttribute(
            "class",
            "btn btn-label-danger btn-icon btn-circle btn-sm"
        );
        button.setAttribute("type", "button");
        button.setAttribute("onclick", "delete_biaya(this)");
        var icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-trash");
        button.append(icon);

        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = "1.";
        cell2.appendChild(div1);
        cell3.appendChild(div2);
        cell4.appendChild(div3);
        cell5.appendChild(button);

        reindex_biaya();
    }
}

//BATAL-MUAT
var clickbatal = 0;
function tambah_batal_muat() {
    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    let token = $("#csrf").val();
    let slug = $("#old_slug").val();

    var table = document.getElementById("tbody_batal_muat");
    clickbatal++;

    var table_container = document.getElementById("processload_create");
    var urutan = table_container.tBodies[0].rows.length;
    var ifkontainer = [];
    for (let i = 0; i < urutan; i++) {
        ifkontainer[i] = document.getElementById(
            "nomor_kontainer[" + (i + 1) + "]"
        ).value;
    }

    if (ifkontainer.includes("")) {
        swal.fire({
            title: "Silahkan Masukkan Nomor Kontainer Terlebih Dahulu",
            icon: "error",
            timer: 10e3,
            showConfirmButton: false,
        }).then(() => {
            clickbatal = clickbatal - 1;
        });
    } else {
        var nomor_kontainer = [""];

        for (var i = 0; i < urutan; i++) {
            value_kontainer = document.getElementById(
                "nomor_kontainer[" + (i + 1) + "]"
            ).value;
            nomor_kontainer +=
                "<option value='" +
                value_kontainer +
                "'>" +
                value_kontainer +
                "</option>";
        }

        var div1 = document.createElement("div");
        div1.setAttribute("class", "validation-container");
        var select = document.createElement("select");
        select.innerHTML =
            "<option selected disabled>Pilih Nomor Kontainer</option>" +
            nomor_kontainer;
        select.setAttribute("id", "kontainer_batal[" + clickbatal + "]");
        select.setAttribute("name", "kontainer_batal[" + clickbatal + "]");
        select.setAttribute("class", "form-select");
        select.setAttribute("required", true);
        div1.append(select);
        var div2 = document.createElement("div");
        div2.setAttribute("class", "validation-container");
        var input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("type", "text");
        input.setAttribute("required", true);
        input.setAttribute("placeholder", "Harga Batal Muat");
        input.setAttribute("onkeydown", "return numbersonly(this, event);");
        input.setAttribute("onkeyup", "javascript:tandaPemisahTitik(this);");
        input.setAttribute("id", "harga_batal_muat[" + clickbatal + "]");
        input.setAttribute("name", "harga_batal_muat[" + clickbatal + "]");
        div2.append(input);
        var div3 = document.createElement("div");
        div3.setAttribute("class", "validation-container");
        var textarea = document.createElement("textarea");
        textarea.setAttribute("class", "form-control");
        textarea.setAttribute("required", true);
        textarea.setAttribute(
            "id",
            "keterangan_batal_muat[" + clickbatal + "]"
        );
        textarea.setAttribute(
            "name",
            "keterangan_batal_muat[" + clickbatal + "]"
        );
        div3.append(textarea);
        var button = document.createElement("button");
        button.setAttribute("id", "deleterow" + clickbatal);
        button.setAttribute(
            "class",
            "btn btn-label-danger btn-icon btn-circle btn-sm"
        );
        button.setAttribute("type", "button");
        button.setAttribute("onclick", "delete_batal(this)");
        var icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-trash");
        button.append(icon);

        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = "1.";
        cell2.appendChild(div1);
        cell3.appendChild(div2);
        cell4.appendChild(div3);
        cell5.appendChild(button);

        reindex_batal();
    }
}

function reindex_batal() {
    const ids = document.querySelectorAll(
        "#table_batal_muat tr > td:nth-child(1)"
    );
    ids.forEach((e, i) => {
        e.innerHTML = i + 1 + ".";
        nomor_tabel_lokasi = i + 1;
    });
}
function delete_batal(r) {
    var table = r.parentNode.parentNode.rowIndex;
    document.getElementById("table_batal_muat").deleteRow(table);
    clickbatal--;

    var select = document.querySelectorAll(
        "#table_batal_muat tr td:nth-child(2) select"
    );
    for (var i = 0; i < select.length; i++) {
        select[i].id = "kontainer_batal[" + (i + 1) + "]";
        select[i].name = "kontainer_batal[" + (i + 1) + "]";
    }

    var input = document.querySelectorAll(
        "#table_batal_muat tr td:nth-child(3) input"
    );
    for (var i = 0; i < input.length; i++) {
        input[i].id = "harga_batal_muat[" + (i + 1) + "]";
        input[i].name = "harga_batal_muat[" + (i + 1) + "]";
    }

    var textarea = document.querySelectorAll(
        "#table_batal_muat tr td:nth-child(4) textarea"
    );
    for (var i = 0; i < textarea.length; i++) {
        textarea[i].id = "keterangan_batal_muat[" + (i + 1) + "]";
        textarea[i].name = "keterangan_batal_muat[" + (i + 1) + "]";
    }

    var button = document.querySelectorAll(
        "#table_batal_muat tr td:nth-child(5) button"
    );
    for (var i = 0; i < button.length; i++) {
        button[i].id = "deleterow" + (i + 1);
    }

    reindex_batal();
}

//ALIH-KAPAL
var clickalih = 0;
function tambah_alih() {
    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    let token = $("#csrf").val();
    let slug = $("#old_slug").val();

    var table = document.getElementById("tbody_alih");
    clickalih++;

    var table_container = document.getElementById("processload_create");
    var urutan = table_container.tBodies[0].rows.length;
    var ifkontainer = [];

    for (let i = 0; i < urutan; i++) {
        ifkontainer[i] = document.getElementById(
            "nomor_kontainer[" + (i + 1) + "]"
        ).value;
    }
    if (ifkontainer.includes("")) {
        swal.fire({
            title: "Silahkan Masukkan Nomor Kontainer Terlebih Dahulu",
            icon: "error",
            timer: 10e3,
            showConfirmButton: false,
        }).then(() => {
            clickalih = clickalih - 1;
        });
    } else {
        var nomor_kontainer = [""];

        for (var i = 0; i < urutan; i++) {
            value_kontainer = document.getElementById(
                "nomor_kontainer[" + (i + 1) + "]"
            ).value;
            nomor_kontainer +=
                "<option value='" +
                value_kontainer +
                "'>" +
                value_kontainer +
                "</option>";
        }
        var pelayaran = [""];
        var pelabuhan = [""];
        $.ajax({
            url: "/getpelayaran",
            type: "post",
            datatype: "json",
            async: false,
            data: {
                _token: token,
            },
            success: function (response) {

                for (var i = 0; i < response.pelayaran.length; i++) {
                    pelayaran +=
                        "<option value='" +
                        response.pelayaran[i].nama_company +
                        "'>" +
                        response.pelayaran[i].nama_company +
                        "</option>";
                }
                for (var i = 0; i < response.pelabuhan.length; i++) {
                    pelabuhan +=
                        "<option value='" +
                        response.pelabuhan[i].nama_pelabuhan +
                        "'>" +
                        response.pelabuhan[i].nama_pelabuhan +
                        "</option>";
                }
            }
        });

        var div1 = document.createElement("div");
        div1.setAttribute("class", "validation-container");
        var select = document.createElement("select");
        select.innerHTML =
            "<option selected disabled>Pilih Nomor Kontainer</option>" +
            nomor_kontainer;
        select.setAttribute("id", "kontainer_alih[" + clickalih + "]");
        select.setAttribute("name", "kontainer_alih[" + clickalih + "]");
        select.setAttribute("class", "form-select");
        select.setAttribute("required", true);
        div1.append(select);

        var div4 = document.createElement("div");
        div4.setAttribute("class", "validation-container");
        var select1 = document.createElement("select");
        select1.innerHTML =
            "<option selected disabled>Pilih Pelayaran</option>" +
            pelayaran;
        select1.setAttribute("id", "pelayaran_alih[" + clickalih + "]");
        select1.setAttribute("name", "pelayaran_alih[" + clickalih + "]");
        select1.setAttribute("class", "form-select");
        select1.setAttribute("required", true);
        div4.append(select1);

        var div2 = document.createElement("div");
        div2.setAttribute("class", "validation-container");
        var input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("type", "text");
        input.setAttribute("required", true);
        input.setAttribute("placeholder", "Harga Alih Kapal");
        input.setAttribute("onkeydown", "return numbersonly(this, event);");
        input.setAttribute("onkeyup", "javascript:tandaPemisahTitik(this);");
        input.setAttribute("id", "harga_alih_kapal[" + clickalih + "]");
        input.setAttribute("name", "harga_alih_kapal[" + clickalih + "]");
        div2.append(input);

        var div5 = document.createElement("div");
        div5.setAttribute("class", "validation-container");
        var input2 = document.createElement("input");
        input2.setAttribute("class", "form-control");
        input2.setAttribute("type", "text");
        input2.setAttribute("required", true);
        input2.setAttribute("placeholder", "Vessel/Voyage");
        input2.setAttribute("id", "vesseL_alih[" + clickalih + "]");
        input2.setAttribute("name", "vesseL_alih[" + clickalih + "]");
        div5.append(input2);



        var div6 = document.createElement("div");
        div6.setAttribute("class", "validation-container");
        var input3 = document.createElement("input");
        input3.setAttribute("class", "form-control");
        input3.setAttribute("type", "text");
        input3.setAttribute("required", true);
        input3.setAttribute("placeholder", "Code Vessel/Voyage");
        input3.setAttribute("id", "code_vesseL_alih[" + clickalih + "]");
        input3.setAttribute("name", "code_vesseL_alih[" + clickalih + "]");
        div6.append(input3);

        var div7 = document.createElement("div");
        div7.setAttribute("class", "validation-container");
        var select2 = document.createElement("select");
        select2.innerHTML =
            "<option selected disabled value=''>Pilih POT (Jika Ada)</option>" +
            pelabuhan;
        select2.setAttribute("id", "pot_alih[" + clickalih + "]");
        select2.setAttribute("name", "pot_alih[" + clickalih + "]");
        select2.setAttribute("class", "form-select");
        div7.append(select2);

        var div8 = document.createElement("div");
        div8.setAttribute("class", "validation-container");
        var select3 = document.createElement("select");
        select3.innerHTML =
            "<option selected disabled >Pilih POD</option>" +
            pelabuhan;
        select3.setAttribute("id", "pod_alih[" + clickalih + "]");
        select3.setAttribute("name", "pod_alih[" + clickalih + "]");
        select3.setAttribute("class", "form-select");
        select3.setAttribute("required", true);

        div8.append(select3);

        var div3 = document.createElement("div");
        div3.setAttribute("class", "validation-container");
        var textarea = document.createElement("textarea");
        textarea.setAttribute("class", "form-control");
        textarea.setAttribute("required", true);
        textarea.setAttribute("id", "keterangan_alih_kapal[" + clickalih + "]");
        textarea.setAttribute(
            "name",
            "keterangan_alih_kapal[" + clickalih + "]"
        );
        div3.append(textarea);

        var button = document.createElement("button");
        button.setAttribute("id", "deleterow" + clickalih);
        button.setAttribute(
            "class",
            "btn btn-label-danger btn-icon btn-circle btn-sm"
        );
        button.setAttribute("type", "button");
        button.setAttribute("onclick", "delete_alih(this)");
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
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);

        cell1.innerHTML = "1.";
        cell2.appendChild(div1);
        cell3.appendChild(div4);
        cell4.appendChild(div7);
        cell5.appendChild(div8);
        cell6.appendChild(div5);
        cell7.appendChild(div6);
        cell8.appendChild(div2);
        cell9.appendChild(div3);
        cell10.appendChild(button);

        reindex_alih();
    }
}

function reindex_alih() {
    const ids = document.querySelectorAll(
        "#table_alih_kapal tr > td:nth-child(1)"
    );
    ids.forEach((e, i) => {
        e.innerHTML = i + 1 + ".";
        nomor_tabel_lokasi = i + 1;
    });
    $("#table_alih_kapal tr > td:nth-child(2) select").select2({
        dropdownAutoWidth:true,
        placeholder:"Pilih Nomor Kontainer",
        allowClear:true
    });
    $("#table_alih_kapal tr > td:nth-child(3) select").select2({
        dropdownAutoWidth:true,
        placeholder:"Pilih Pelayaran",

        allowClear:true
    });
    $("#table_alih_kapal tr > td:nth-child(4) select").select2({
        dropdownAutoWidth:true,
        placeholder:"Pilih POT",
        allowClear:true
    });
    $("#table_alih_kapal tr > td:nth-child(5) select").select2({
        dropdownAutoWidth:true,
        placeholder:"Pilih POD",

        allowClear:true
    });
}
function delete_alih(r) {
    var table = r.parentNode.parentNode.rowIndex;
    document.getElementById("table_alih_kapal").deleteRow(table);
    clickalih--;

    var select = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(2) select"
    );
    for (var i = 0; i < select.length; i++) {
        select[i].id = "kontainer_alih[" + (i + 1) + "]";
        select[i].name = "kontainer_alih[" + (i + 1) + "]";
    }

    var select1 = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(3) select"
    );
    for (var i = 0; i < select1.length; i++) {
        select1[i].id = "pelayaran_alih[" + (i + 1) + "]";
        select1[i].name = "pelayaran_alih[" + (i + 1) + "]";
    }

    var select2 = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(4) select"
    );
    for (var i = 0; i < select2.length; i++) {
        select2[i].id = "pot_alih[" + (i + 1) + "]";
        select2[i].name = "pot_alih[" + (i + 1) + "]";
    }

    var select3 = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(5) select"
    );
    for (var i = 0; i < select3.length; i++) {
        select3[i].id = "pod_alih[" + (i + 1) + "]";
        select3[i].name = "pod_alih[" + (i + 1) + "]";
    }

    var input = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(6) input"
    );
    for (var i = 0; i < input.length; i++) {
        input[i].id = "vesseL_alih[" + (i + 1) + "]";
        input[i].name = "vesseL_alih[" + (i + 1) + "]";
    }

    var input2 = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(7) input"
    );
    for (var i = 0; i < input2.length; i++) {
        input2[i].id = "code_vesseL_alih[" + (i + 1) + "]";
        input2[i].name = "code_vesseL_alih[" + (i + 1) + "]";
    }

    var input8 = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(8) input"
    );
    for (var i = 0; i < input8.length; i++) {
        input8[i].id = "harga_alih_kapal[" + (i + 1) + "]";
        input8[i].name = "harga_alih_kapal[" + (i + 1) + "]";
    }



    var textarea = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(9) textarea"
    );
    for (var i = 0; i < textarea.length; i++) {
        textarea[i].id = "keterangan_alih_kapal[" + (i + 1) + "]";
        textarea[i].name = "keterangan_alih_kapal[" + (i + 1) + "]";
    }

    var button = document.querySelectorAll(
        "#table_alih_kapal tr td:nth-child(5) button"
    );
    for (var i = 0; i < button.length; i++) {
        button[i].id = "deleterow" + (i + 1);
    }

    reindex_alih();
}
function blur_no_container(ini) {
    let token = $("#csrf").val();

    $.ajax({
        url: "/getNoContainer",
        type: "post",
        data: {
            _token: token,
        },
        success: function (response) {
            var baris = ini.parentNode.parentNode.parentNode.rowIndex;
            var table = document.getElementById("processload_create");
            var count_row = table.tBodies[0].rows.length;

            for (var i = 1; i <= count_row; i++) {
                if (i != baris) {
                    if (ini.value != "") {
                        if (
                            ini.value ==
                                document.getElementById(
                                    "nomor_kontainer[" + i + "]"
                                ).value ||
                            response.includes(ini.value)
                        ) {
                            swal.fire({
                                title: "Nomor Kontainer Sudah Ada",
                                text: "Silakan Masukkan Nomor Kontainer yang Lain",
                                icon: "error",
                                timer: 10e3,
                                showConfirmButton: false,
                            }).then(() => {
                                ini.value = "";
                                if (
                                    document.getElementById("tbody_alih")
                                        .innerHTML != ""
                                ) {
                                    if (ini.value == "") {
                                        document.getElementById(
                                            "tbody_alih"
                                        ).innerHTML = "";
                                        clickalih = 0;
                                    }
                                }
                                if (
                                    document.getElementById("tbody_batal_muat")
                                        .innerHTML != ""
                                ) {
                                    if (ini.value == "") {
                                        document.getElementById(
                                            "tbody_batal_muat"
                                        ).innerHTML = "";
                                        clickbatal = 0;
                                    }
                                }
                                if (
                                    document.getElementById("tbody_biaya")
                                        .innerHTML != ""
                                ) {
                                    if (ini.value == "") {
                                        document.getElementById(
                                            "tbody_biaya"
                                        ).innerHTML = "";
                                        tambah = 0;
                                    }
                                }
                            });
                        }
                    }
                }
            }
        },
    });

    if (document.getElementById("tbody_alih").innerHTML != "") {
        if (ini.value == "") {
            document.getElementById("tbody_alih").innerHTML = "";
            clickalih = 0;
        }
    }
    if (document.getElementById("tbody_batal_muat").innerHTML != "") {
        if (ini.value == "") {
            document.getElementById("tbody_batal_muat").innerHTML = "";
            clickbatal = 0;
        }
    }
    if (document.getElementById("tbody_biaya").innerHTML != "") {
        if (ini.value == "") {
            document.getElementById("tbody_biaya").innerHTML = "";
            tambah = 0;
        }
    }
}

function change_container(ini) {
    let token = $("#csrf").val();

    $.ajax({
        url: "/getSealProcessLoad",
        type: "post",
        data: {
            _token: token,
        },
        success: function (response) {
            var baris = ini.parentNode.parentNode.parentNode.rowIndex;
            var table = document.getElementById("processload_create");
            var count_row = table.tBodies[0].rows.length;

            for (var i = 1; i <= count_row; i++) {
                if (i != baris) {
                    if (ini.value != "") {
                        if (
                            ini.value ==
                                document.getElementById("seal[" + i + "]")
                                    .value ||
                            response.includes(ini.value)
                        ) {
                            swal.fire({
                                title: "Seal Sudah Terpakai",
                                text: "Silakan Pilih Seal yang Lain",
                                icon: "error",
                                timer: 10e3,
                                showConfirmButton: false,
                            }).then(() => {
                                document.getElementById(
                                    "select2-seal" + baris + "-container"
                                ).title = "Pilih Seal";
                                document.getElementById(
                                    "select2-seal" + baris + "-container"
                                ).innerHTML = "Pilih Seal";
                                ini.value = "";
                            });
                        }
                    }
                }
            }
        },
    });
}

function reindex_biaya() {
    const ids = document.querySelectorAll("#table_biaya tr > td:nth-child(1)");
    ids.forEach((e, i) => {
        e.innerHTML = i + 1 + ".";
        nomor_tabel_lokasi = i + 1;
    });
}

function delete_biaya(r) {
    var table = r.parentNode.parentNode.rowIndex;
    document.getElementById("table_biaya").deleteRow(table);
    tambah--;

    var select = document.querySelectorAll(
        "#table_biaya tr td:nth-child(2) select"
    );
    for (var i = 0; i < select.length; i++) {
        select[i].id = "kontainer_biaya[" + (i + 1) + "]";
        select[i].name = "kontainer_biaya[" + (i + 1) + "]";
    }

    var input = document.querySelectorAll(
        "#table_biaya tr td:nth-child(3) input"
    );
    for (var i = 0; i < input.length; i++) {
        input[i].id = "harga[" + (i + 1) + "]";
        input[i].name = "harga[" + (i + 1) + "]";
    }

    var textarea = document.querySelectorAll(
        "#table_biaya tr td:nth-child(4) textarea"
    );
    for (var i = 0; i < textarea.length; i++) {
        textarea[i].id = "keterangan[" + (i + 1) + "]";
        textarea[i].name = "keterangan[" + (i + 1) + "]";
    }

    var button = document.querySelectorAll(
        "#table_biaya tr td:nth-child(5) button"
    );
    for (var i = 0; i < button.length; i++) {
        button[i].id = "deleterow" + (i + 1);
    }

    reindex_biaya();
}

function seal(ini) {
    let token = $("#csrf").val();

    $.ajax({
        url: "/getSealProcessLoad",
        type: "post",
        data: {
            _token: token,
        },
        success: function (response) {
            var baris =
                ini.parentNode.parentNode.parentNode.parentNode.rowIndex;
            var table = document.getElementById("processload_create");
            var count_row = table.tBodies[0].rows.length;

            for (var i = 1; i <= count_row; i++) {
                if (i != baris) {
                    if (ini.value != "") {
                        if (
                            ini.value ==
                                document.getElementById("seals[" + i + "]")
                                    .value ||
                            response.includes(ini.value)
                        ) {
                            swal.fire({
                                title: "Seal Sudah Terpakai",
                                text: "Silakan Pilih Seal yang Lain atau Masukkan Seal Sendiri",
                                icon: "error",
                                timer: 10e3,
                                showConfirmButton: false,
                            }).then(() => {
                                ini.value = "";
                            });
                        }
                    }
                }
            }
        },
    });
}
