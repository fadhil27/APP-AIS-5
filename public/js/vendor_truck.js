function bayar() {
    // console.log(id);
    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    var toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3e3,
        timerProgressBar: true,
        didOpen: function didOpen(toast) {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    swal.fire({
        title: " Ingin Membayar Selisih Untuk kontainer ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    }).then((willCreate) => {
        if (willCreate.isConfirmed) {
            var id_container = $(".check-container1:checked")
                .map(function () {
                    return this.value;
                })
                .get();

            var csrf = $("#csrf").val();

            $.ajax({
                url: "/get-selisih-load",
                type: "POST",
                data: {
                    _token: csrf,
                    id: id_container,
                },
                success: function (response) {
                    // let new_id = id;
                    // $("#modal_biaya_do").modal("show");

                    // $("#id_container").val(response.result.id);
                    // $("#old_terbayar").val(response.result.dibayar);
                    // var biaya_trucking = response.result.biaya_trucking;
                    // var ongkos_supir = response.result.ongkos_supir;
                    // var dibayar = response.result.dibayar;

                    var Selisih = response;
                    $("#old_selisih").val(Selisih);
                    Selisih = tandaPemisahTitik(Selisih);

                    $("#selisih").html("Rp. " + Selisih);

                    console.log(id_container);
                    $("#modal_biaya_do").modal("show");
                    $("#valid_pod").validate({
                        highlight: function highlight(
                            element,
                            errorClass,
                            validClass
                        ) {
                            $(element).addClass("is-invalid");
                            $(element).removeClass("is-valid");
                        },
                        unhighlight: function unhighlight(
                            element,
                            errorClass,
                            validClass
                        ) {
                            $(element).removeClass("is-invalid");
                        },
                        errorPlacement: function errorPlacement(
                            error,
                            element
                        ) {
                            error.addClass("invalid-feedback");
                            element
                                .closest(".validation-container")
                                .append(error);
                        },
                        submitHandler: function (form) {
                            // var id_container = $("#id_container").val();
                            var dibayar = $("#dibayar")
                                .val()
                                .replace(/\./g, "");
                            // var old_terbayar = $("#old_terbayar")
                            //     .val()
                            //     .replace(/\./g, "");
                            // var old_selisih = $("#old_selisih")
                            //     .val()
                            //     .replace(/\./g, "");

                            var data = {
                                _token: csrf,
                                selisih: dibayar,
                                id: id_container,
                            };

                            $.ajax({
                                type: "POST",
                                url: "/kontainer-dibayar",
                                data: data,

                                success: function (response) {
                                    // console.log(response);
                                    toast
                                        .fire({
                                            icon: "success",
                                            title: "Behasil Dibayar",
                                            timer: 2e3,
                                        })
                                        .then((result) => {
                                            location.reload();
                                        });
                                },
                            });
                        },
                    });
                },
            });
        } else {
            toast.fire({
                title: "Belum dibayar",
                icon: "error",
                timer: 2e3,
            });
        }
    });

    // for (let i = 0; i < chek_container.length; i++) {
    //     volume[i] = document.getElementById("volume[" + item_id[i] + "]").value;

    // }
}

function blur_terbayar(ini) {
    var terbayar = ini.value.replace(/\./g, "");
    terbayar = parseFloat(terbayar);
    var selisih = document
        .getElementById("old_selisih")
        .value.replace(/\./g, "");
    selisih = parseFloat(selisih);

    if (terbayar > selisih) {
        swal.fire({
            title: "Nominal Melebihi Selisih",
            icon: "error",
            timer: 2e3,
            showConfirmButton: false,
        }).then((result) => {
            ini.value = "";
        });
    }
}
