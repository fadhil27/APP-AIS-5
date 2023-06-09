"use strict";
$(function () {
    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
        });
    var toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3e3,
        timerProgressBar: true,
        didOpen: function didOpen(toast) {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer)
        }
    });

    $.validator.addMethod("notEqual", function (value, element, arg) { return arg !== value }, "Value must not equal arg.");


    $('#valid_company').validate({
        rules: {

            nama_company: {
                required: true
            }
        },
        messages: {

            nama_company: {
                required: "Silakan Isi Nama Kompany"
            }
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

            var nama_company = $("#nama_company").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "nama_company": nama_company
            }

            $.ajax({
                type: 'POST',
                url: 'shipping-company',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Company Berhasil Ditambah",
                    showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });
    $('#valid_vendor').validate({
        rules: {

            nama_vendor: {
                required: true
            }
        },
        messages: {

            nama_vendor: {
                required: "Silakan Isi Nama Vendor"
            }
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

            var nama_vendor = $("#nama_vendor").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "nama_vendor": nama_vendor
            }

            $.ajax({
                type: 'POST',
                url: '/vendor-mobil',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Vendor Berhasil Ditambah",
                    showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });

    $('#valid_depo').validate({
        rules: {

            nama_depo: {
                required: true
            }
        },
        messages: {

            nama_depo: {
                required: "Silakan Isi Nama Kompany"
            }
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

            var nama_depo = $("#nama_depo").val();
            var pelayaran_id_tambah = $("#pelayaran_id_tambah").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "nama_depo": nama_depo,
                "pelayaran_id": pelayaran_id_tambah
            }

            $.ajax({
                type: 'POST',
                url: 'add-depo',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Depo Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                         location.reload();
                        });
                },
            });
        }
    });

    $('#valid_pelabuhan').validate({
        rules: {

            area_code: {
                required: true
            },
            nama_pelabuhan: {
                required: true
            }
        },
        messages: {

            area_code: {
                required: "Silakan Isi Area Code"
            },
            nama_pelabuhan: {
                required: "Silakan Isi Nama Pelabuhan"
            }
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

            var area_code = $("#area_code").val();
            var nama_pelabuhan = $("#nama_pelabuhan").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "area_code": area_code,
                "nama_pelabuhan": nama_pelabuhan
            }

            $.ajax({
                type: 'POST',
                url: 'add-pelabuhan',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Pelabuhan Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });

    $('#valid_pengirim').validate({
        rules: {

            alamat: {
                required: true
            },
            nama_costumer: {
                required: true,
                remote: {
                    url: "/checkpengirim",
                    type: "post",
                    data :{
                        "_token": $('#csrf').val(),
                    }
                }

            },
            email: {
                required: true
            },
            no_telp: {
                required: true
            },
            rekening: {
                required: true
            },
        },
        messages: {

            alamat: {
                required: "Silakan Isi Alamat"
            },
            nama_costumer: {
                required: "Silakan Isi Nama costumer",
                remote: " Nama Pengirim Sudah Ada"
            },
            email: {
                required: "Silakan Isi email"
            },
            no_telp: {
                required: "Silakan Isi no. telp"
            },
            rekening: {
                required: "Silakan Isi rekening"
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

            var alamat = $("#alamat").val();
            var nama_costumer = $("#nama_costumer").val();
            var email = $("#email").val();
            var no_telp = $("#no_telp").val();
            var rekening = $("#rekening").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "alamat": alamat,
                "nama_costumer": nama_costumer,
                "email": email,
                "no_telp": no_telp,
                "rekening": rekening,
            }

            $.ajax({
                type: 'POST',
                url: 'add-pengirim',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data pengirim Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });

    $('#valid_penerima').validate({
        rules: {

            alamat_penerima: {
                required: true
            },
            nama_penerima: {
                required: true,
                remote: {
                    url: "/checkpenerima",
                    type: "post",
                    data :{
                        "_token": $('#csrf').val(),
                    }
                },
            },
            email_penerima: {
                required: true
            },
            no_telp_penerima: {
                required: true
            },
            rekening_penerima: {
                required: true
            },
        },
        messages: {

            alamat_penerima: {
                required: "Silakan Isi Alamat"
            },
            nama_penerima: {
                required: "Silakan Isi Nama costumer",
                remote: "Nama Penerima Sudah Ada"
            },
            email_penerima: {
                required: "Silakan Isi email"
            },
            no_telp_penerima: {
                required: "Silakan Isi no. telp"
            },
            rekening_penerima: {
                required: "Silakan Isi Rekening"
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

            var alamat_penerima = $("#alamat_penerima").val();
            var nama_penerima = $("#nama_penerima").val();
            var email_penerima = $("#email_penerima").val();
            var no_telp_penerima = $("#no_telp_penerima").val();
            var rekening_penerima = $("#rekening_penerima").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "alamat_penerima": alamat_penerima,
                "nama_penerima": nama_penerima,
                "email_penerima": email_penerima,
                "no_telp_penerima": no_telp_penerima,
                "rekening_penerima": rekening_penerima,
            }

            $.ajax({
                type: 'POST',
                url: 'add-penerima',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data penerima Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });

    // $('#valid_biaya').validate({
    //     rules: {

    //         pekerjaan_biaya: {
    //             required: true
    //         },
    //         biaya_cost: {
    //             required: true
    //         }
    //     },
    //     messages: {

    //         pekerjaan_biaya: {
    //             required: "Silakan Isi Pekerjaan"
    //         },
    //         biaya_cost: {
    //             required: "Silakan Isi Biaya"
    //         }
    //     },
    //     highlight: function highlight(element, errorClass, validClass) {
    //         $(element).addClass("is-invalid");
    //         $(element).removeClass("is-valid");
    //     },
    //     unhighlight: function unhighlight(element, errorClass, validClass) {
    //         $(element).removeClass("is-invalid");
    //         $(element).addClass("is-valid");
    //     },
    //     errorPlacement: function errorPlacement(error, element) {
    //         error.addClass("invalid-feedback");
    //         element.closest(".validation-container").append(error);
    //     },
    //     submitHandler: function (form) {

    //         var pekerjaan_biaya = $("#pekerjaan_biaya").val();
    //         var biaya_cost = $("#biaya_cost").val();
    //         var token = $('#csrf').val();


    //         var data = {
    //             "_token": token,
    //             "pekerjaan_biaya": pekerjaan_biaya,
    //             "biaya_cost": biaya_cost
    //         }

    //         $.ajax({
    //             type: 'POST',
    //             url: 'add-biaya',
    //             data: data,
    //             success: function (response) {
    //                 swal.fire({
    //                     icon: "success",
    //                     title: "Data Biaya Berhasil Ditambah",
    //                     showConfirmButton: false,
    //                     timer: 2e3,

    //                 })
    //                     .then((result) => {
    //                         location.reload();
    //                     });
    //             },
    //         });
    //     }
    // });

    $('#valid_rekening').validate({
        rules: {

            no_rekening: {
                required: true
            },
            atas_nama: {
                required: true
            },
            nama_bank: {
                required: true
            },
        },
        messages: {

            nama_bank: {
                required: "Silakan Isi Nama Bank"
            },
            no_rekening: {
                required: "Silakan Isi No. Rekening"
            },

            atas_nama: {
                required: "Silakan Isi Nama Pemilik Rekening"
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

            var nama_bank = $("#nama_bank").val();
            var no_rekening = $("#no_rekening").val();
            var atas_nama = $("#atas_nama").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "nama_bank": nama_bank,
                "no_rekening": no_rekening,
                "atas_nama": atas_nama,
            }

            $.ajax({
                type: 'POST',
                url: '/add-rekening',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Rekening Bank Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
});

    $('#valid_type').validate({
        rules: {

            type_container: {
                required: true
            },

        },
        messages: {

            type_container: {
                required: "Silakan Masukkan Type Container"
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

            var type_container = $("#type_container").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                "type_container": type_container,
            }

            $.ajax({
                type: 'POST',
                url: 'add-type',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Type Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });

    $('#valid_container').validate({
        rules: {


            size_container: {
                required: true
            },

        },
        messages: {


            size_container: {
                required: "Silakan Isi Size"
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

            // var jenis_container = $("#jenis_container").val();
            var size_container = $("#size_container").val();
            // var type_container = $("#type_container").val();
            var token = $('#csrf').val();


            var data = {
                "_token": token,
                // "jenis_container": jenis_container,
                "size_container": size_container,
                // "type_container": type_container,
            }

            $.ajax({
                type: 'POST',
                url: 'add-container',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Container Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });

    $('#valid_stuffing').validate({
        rules: {

            kegiatan_stuffing: {
                required: true
            },

        },
        messages: {

            kegiatan_stuffing: {
                required: "Silakan Isi Kegiatan"
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

            var kegiatan_stuffing = $("#kegiatan_stuffing").val();
            var token = $('#csrf').val();



            var data = {
                "_token": token,
                "kegiatan_stuffing": kegiatan_stuffing,
            }

            $.ajax({
                type: 'POST',
                url: 'add-stuffing',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Stuffing Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });

    $('#valid_stripping').validate({
        rules: {

            kegiatan: {
                required: true
            },
            jenis_kegiatan: {
                required: true
            },

        },
        messages: {

            kegiatan: {
                required: "Silakan Isi Kegiatan"
            },
            jenis_kegiatan: {
                required: "Silakan Pilih Kegiatan"
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

            var kegiatan_stripping = $("#kegiatan").val();
            var jenis_kegiatan = $("#jenis_kegiatan:checked").val();
            var token = $('#csrf').val();



            var data = {
                "_token": token,
                "kegiatan": kegiatan_stripping,
                "jenis_kegiatan": jenis_kegiatan,
            }

            $.ajax({
                type: 'POST',
                url: 'add-stripping',
                data: data,
                success: function (response) {
                    swal.fire({
                        icon: "success",
                        title: "Data Kegiatan Berhasil Ditambah",
                        showConfirmButton: false,
                        timer: 2e3,

                    })
                        .then((result) => {
                            location.reload();
                        });
                },
            });
        }
    });



});

function editrekening(e) {
    var id = e.value;

    $.ajax({
        url: '/rekening-bank/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-dana-edit').modal('show');

            $('#nama_bank_edit').val(response.result.nama_bank);
            $('#no_rekening_edit').val(response.result.no_rekening);
            $('#atas_nama_edit').val(response.result.atas_nama);
            $('#old_id_rekening').val(response.result.id);


            $('#valid_rekening_edit').validate({
                rules: {

                    nama_bank_edit: {
                        required: true
                    },
                    atas_nama_edit: {
                        required: true
                    },
                    no_rekening_edit: {
                        required: true
                    },

                },
                messages: {

                    nama_bank_edit: {
                        required: "Silakan Isi Nama Bank"
                    },
                    no_rekening_edit: {
                        required: "Silakan Isi No. Rekening"
                    },
                    atas_nama_edit: {
                        required: "Silakan Isi Nama Rekening"
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
                    var token = $('#csrf').val();
                    var oldid = $('#old_id_rekening').val();

                    $.ajax({
                        url: '/rekening-bank/' + oldid,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            nama_bank: $('#nama_bank_edit').val(),
                            no_rekening: $('#no_rekening_edit').val(),
                            atas_nama: $('#atas_nama_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Rekening Bank Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function deleterekening(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: '/rekening-bank/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Rekening Bank Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function nama_pengirim(ini) {
    let token = $("#csrf").val();

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1",
        },
        buttonsStyling: false,
    });

    $.ajax({
            url: "/getnamapengirim",
            type: "post",
            data: {
                _token: token,
            },
            success: function (response) {
                for (let i = 0; i < response.length; i++) {
                    if (response[i] == ini.value) {

                        swal.fire({
                            title: "Nama Pengirim Mirip Dengan Data yang Sudah Ada",
                            text: "Silakan Cek List Tabel Pengirim yang Ada",
                            icon: "warning",
                            timer: 10e3,
                            showConfirmButton: true,
                        });
                    }

                }


            },
        });


}

// function onblur_nama_penerima(ini) {
//     let token = $("#csrf").val();

//     var swal = Swal.mixin({
//         customClass: {
//             confirmButton: "btn btn-label-success btn-wide mx-1",
//             denyButton: "btn btn-label-secondary btn-wide mx-1",
//             cancelButton: "btn btn-label-danger btn-wide mx-1",
//         },
//         buttonsStyling: false,
//     });

//     $.ajax({
//             url: "/getnamapenerima",
//             type: "post",
//             data: {
//                 _token: token,
//             },
//             success: function (response) {

//                 for (let i = 0; i < response.length; i++) {
//                     if (response[i] == ini.value) {

//                         swal.fire({
//                             title: "Nama Penerima Mirip Dengan Data yang Sudah Ada",
//                             text: "Silakan Cek List Tabel Penerima yang Ada",
//                             icon: "warning",
//                             timer: 10e3,
//                             showConfirmButton: true,
//                         });
//                     }

//                 }


//             },
//         });


// }

function editCompany(e) {
    var id = e.value;

    $.ajax({
        url: 'company/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-company-edit').modal('show');

            $('#nama_company_edit').val(response.result.nama_company);
            $('#old_id_company').val(response.result.id);

            $('#valid_company_edit').validate({
                rules: {

                    nama_company_edit: {
                        required: true
                    },

                },
                messages: {

                    nama_company_edit: {
                        required: "Silakan Isi Nama Company"
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
                    var token = $('#csrf').val();
                    var oldid = $('#old_id_company').val();

                    $.ajax({
                        url: 'company/' + oldid,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            nama_company: $('#nama_company_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Company Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}
function ppn_modal(e) {
    var id = e.value;

    $.ajax({
        url: '/ppn-edit/'+id,
        type: 'GET',
        success: function (response) {
            $('#modal_ppn').modal('show');

            $('#nilai_ppn').val(response.result.ppn);

            $('#valid_ppn').validate({
                rules: {

                    nama_company_edit: {
                        required: true
                    },

                },
                messages: {
                    nama_company_edit: {
                        required: "Silakan Isi Nama Company"
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
                    var token = $('#csrf').val();

                    $.ajax({
                        url: '/ppn-update',
                        type: 'PUT',
                        data: {
                            "_token": token,
                            ppn: $('#nilai_ppn').val().replace(/\,/g, "."),
                            id: id,
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Nilai PPN Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}
function editVendor(e) {
    var id = e.value;

    $.ajax({
        url: 'vendor-mobil/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-vendor-edit').modal('show');

            $('#nama_vendor_edit').val(response.result.nama_vendor);
            $('#old_id_vendor').val(response.result.id);


            $('#valid_vendor_edit').validate({
                rules: {

                    nama_vendor_edit: {
                        required: true
                    },

                },
                messages: {

                    nama_vendor_edit: {
                        required: "Silakan Isi Nama vendor"
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
                    var token = $('#csrf').val();
                    var old_id = $('#old_id_vendor').val();

                    $.ajax({
                        url: '/vendor-mobil/' + old_id,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            nama_vendor: $('#nama_vendor_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data vendor Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editDepo(e) {
    var id = e.value;

    $.ajax({
        url: 'depo/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-depo-edit').modal('show');

            $('#nama_depo_edit').val(response.result.nama_depo);
            $('#pelayaran_id_edit').val(response.result.pelayaran_id);
            $('#old_id_depo').val(response.result.id);


            $('#valid_depo_edit').validate({
                rules: {

                    nama_depo_edit: {
                        required: true
                    },

                },
                messages: {

                    nama_depo_edit: {
                        required: "Silakan Isi Nama Depo"
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
                    var token = $('#csrf').val();
                    var old = $('#old_id_depo').val();

                    $.ajax({
                        url: '/depo/' + old,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            nama_depo: $('#nama_depo_edit').val(),
                            pelayaran_id: $('#pelayaran_id_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Depo Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editpelabuhan(e) {
    var id = e.value;

    $.ajax({
        url: 'pelabuhan/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-pelabuhan-edit').modal('show');

            $('#old_id_pelabuhan').val(response.result.id);

            $('#area_code_edit').val(response.result.area_code);
            $('#nama_pelabuhan_edit').val(response.result.nama_pelabuhan);

            $('#valid_pelabuhan_edit').validate({
                rules: {

                    area_code_edit: {
                        required: true
                    },
                    nama_pelabuhan_edit: {
                        required: true
                    },

                },
                messages: {

                    area_code_edit: {
                        required: "Silakan Isi Area Code"
                    },
                    nama_pelabuhan_edit: {
                        required: "Silakan Isi Nama Depo"
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
                    var token = $('#csrf').val();
                    var old = $('#old_id_pelabuhan').val();

                    $.ajax({
                        url: '/pelabuhan/' + old,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            area_code: $('#area_code_edit').val(),
                            nama_pelabuhan: $('#nama_pelabuhan_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Pelabuhan Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editpengirim(e) {
    var id = e.value;

    $.ajax({
        url: 'pengirim/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-pengirim-edit').modal('show');
            $('#old_id_pengirim').val(response.result.id);

            $('#nama_costumer_edit').val(response.result.nama_costumer);
            $('#alamat_edit').val(response.result.alamat);
            $('#email_edit').val(response.result.email);
            $('#no_telp_edit').val(response.result.no_telp);
            $('#rekening_edit').val(response.result.rekening);

            $('#valid_pengirim_edit').validate({
                rules: {

                    nama_costumer_edit: {
                        required: true
                    },
                    alamat_edit: {
                        required: true
                    },
                    email_edit: {
                        required: true
                    },
                    no_telp_edit: {
                        required: true
                    },
                    rekening_edit: {
                        required: true
                    },

                },
                messages: {

                    nama_costumer_edit: {
                        required: "Silakan Isi Nama Costumer"
                    },
                    alamat_edit: {
                        required: "Silakan Isi Alamat"
                    },
                    email_edit: {
                        required: "Silakan Isi Email"
                    },
                    no_telp_edit: {
                        required: "Silakan Isi No. Telp"
                    },
                    rekening_edit: {
                        required: "Silakan Isi No. Rekening"
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
                    var token = $('#csrf').val();
                    var old = $('#old_id_pengirim').val();

                    $.ajax({
                        url: '/pengirim/' + old,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            nama_costumer: $('#nama_costumer_edit').val(),
                            alamat: $('#alamat_edit').val(),
                            email: $('#email_edit').val(),
                            no_telp: $('#no_telp_edit').val(),
                            rekening: $('#rekening_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Pengirim Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editpenerima(e) {
    var id = e.value;

    $.ajax({
        url: 'penerima/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-penerima-edit').modal('show');
            $('#old_id_penerima').val(response.result.id);

            $('#nama_penerima_edit').val(response.result.nama_penerima);
            $('#alamat_penerima_edit').val(response.result.alamat_penerima);
            $('#email_penerima_edit').val(response.result.email_penerima);
            $('#no_telp_penerima_edit').val(response.result.no_telp_penerima);
            $('#rekening_penerima_edit').val(response.result.rekening_penerima);

            $('#valid_penerima_edit').validate({
                rules: {

                    nama_penerima_edit: {
                        required: true
                    },
                    alamat_penerima_edit: {
                        required: true
                    },
                    email_penerima_edit: {
                        required: true
                    },
                    no_telp_penerima_edit: {
                        required: true
                    },
                    rekening_penerima_edit: {
                        required: true
                    },

                },

                messages: {

                    nama_penerima_edit: {
                        required: "Silakan Isi Nama Costumer"
                    },
                    alamat_penerima_edit: {
                        required: "Silakan Isi Alamat"
                    },
                    email_penerima_edit: {
                        required: "Silakan Isi Email"
                    },
                    no_telp_penerima_edit: {
                        required: "Silakan Isi No. Telp"
                    },
                    rekening_penerima_edit: {
                        required: "Silakan Isi No. Rekening"
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
                    var token = $('#csrf').val();
                    var old = $('#old_id_penerima').val();

                    $.ajax({
                        url: '/penerima/' + old,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            nama_penerima: $('#nama_penerima_edit').val(),
                            alamat_penerima: $('#alamat_penerima_edit').val(),
                            email_penerima: $('#email_penerima_edit').val(),
                            no_telp_penerima: $('#no_telp_penerima_edit').val(),
                            rekening_penerima: $('#rekening_penerima_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Penerima Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editbiaya(e) {
    var id = e.value;
    console.log(id);


    $.ajax({
        url: 'biaya/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-biaya-edit').modal('show');

            $('#pekerjaan_biaya_edit').val(response.result.pekerjaan_biaya);
            $('#biaya_cost_edit').val(response.result.biaya_cost);

            $('#valid_biaya_edit').validate({
                rules: {

                    pekerjaan_biaya_edit: {
                        required: true
                    },
                    biaya_cost_edit: {
                        required: true
                    },

                },
                messages: {

                    pekerjaan_biaya_edit: {
                        required: "Silakan Isi Pekerjaan"
                    },
                    biaya_cost_edit: {
                        required: "Silakan Isi Biaya"
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

                // console.log();
                submitHandler: function (form) {
                    var token = $('#csrf').val();

                    $.ajax({
                        url: 'biaya/' + id,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            pekerjaan_biaya: $('#pekerjaan_biaya_edit').val(),
                            biaya_cost: $('#biaya_cost_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Biaya Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function edittype(e) {
    var id = e.value;
    console.log(id);


    $.ajax({
        url: 'type/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-type-edit').modal('show');
            $('#old_id_type').val(response.result.id);


            $('#type_container_edit').val(response.result.type_container);

            $('#valid_type_edit').validate({
                rules: {

                    type_container_edit: {
                        required: true
                    },


                },
                messages: {

                    type_container_edit: {
                        required: "Silakan Isi Type Container"
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

                // console.log();
                submitHandler: function (form) {
                    var token = $('#csrf').val();
                    var old = $('#old_id_type').val();

                    $.ajax({
                        url: 'type/' + old,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            type_container: $('#type_container_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Type Container Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editstuff(e) {
    var id = e.value;
    console.log(id);


    $.ajax({
        url: 'stuffing/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-load-edit').modal('show');

            $('#kegiatan_stuffing_edit').val(response.result.kegiatan_stuffing);

            $('#valid_stuffing_edit').validate({
                rules: {

                    kegiatan_stuffing_edit: {
                        required: true
                    },

                },
                messages: {

                    kegiatan_stuffing_edit: {
                        required: "Silakan Isi Nama Kegiatan"
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

                // console.log();
                submitHandler: function (form) {
                    var token = $('#csrf').val();

                    $.ajax({
                        url: 'stuffing/' + id,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            kegiatan_stuffing: $('#kegiatan_stuffing_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Stuffing Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editstripp(e) {
    var id = e.value;
    console.log(id);


    $.ajax({
        url: 'stripping/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-discharge-edit').modal('show');
            $('#old_id_kegiatan').val(response.result.id);


            $('#kegiatan_edit').val(response.result.kegiatan);
            if (response.result.jenis_kegiatan == "Stripping") {
                $('.jenis_kegiatan_edit_stripping').prop("checked", true);
            }else
            {
                $('.jenis_kegiatan_edit_stripping').prop("checked", false);
                $('.jenis_kegiatan_edit_stuffing').prop("checked", true);

            }


            $('#valid_stripping_edit').validate({
                rules: {

                    kegiatan_edit: {
                        required: true
                    },

                },
                messages: {

                    kegiatan_edit: {
                        required: "Silakan Isi Nama Kegiatan"
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

                // console.log();
                submitHandler: function (form) {
                    var token = $('#csrf').val();
                    var old = $('#old_id_kegiatan').val();

                    $.ajax({
                        url: 'stripping/' + old,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            kegiatan: $('#kegiatan_edit').val(),
                            jenis_kegiatan: $('#jenis_kegiatan_edit:checked').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Kegiatan Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}

function editcontainer(e) {
    var id = e.value;
    console.log(id);


    $.ajax({
        url: 'container/' + id + '/edit',
        type: 'GET',
        success: function (response) {
            $('#modal-container-edit').modal('show');
            $('#old_id_container').val(response.result.id);


            // $('#jenis_container_edit').val(response.result.jenis_container);
            $('#size_container_edit').val(response.result.size_container);
            // $('#type_container_edit').val(response.result.type_container);

            $('#valid_container_edit').validate({
                rules: {

                    // jenis_container_edit: {
                    //     required: true
                    // },
                    size_container_edit: {
                        required: true
                    },
                    // type_container_edit: {
                    //     required: true
                    // },

                },
                messages: {

                    // jenis_container_edit: {
                    //     required: "Silakan Isi Container"
                    // },
                    size_container_edit: {
                        required: "Silakan Isi Size Container"
                    },
                    // type_container_edit: {
                    //     required: "Silakan Isi Type"
                    // },

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

                // console.log();
                submitHandler: function (form) {
                    var token = $('#csrf').val();
                    var old = $('#old_id_container').val();

                    $.ajax({
                        url: 'container/' + old,
                        type: 'PUT',
                        data: {
                            "_token": token,
                            // jenis_container: $('#jenis_container_edit').val(),
                            size_container: $('#size_container_edit').val(),
                            // type_container: $('#type_container_edit').val(),
                        },
                        success: function (response) {
                            swal.fire({
                                icon: "success",
                                title: "Data Size Container Berhasil Diedit",
                                showConfirmButton: false,
                                timer: 2e3,

                            })
                                .then((result) => {
                                    location.reload();
                                });
                        }
                    })
                }
            });

        }
    });
}





function deleteCompany(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'company/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}
function deleteVendor(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: '/vendor-mobil/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function deleteDepo(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'depo/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Depo Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function deletepelabuhan(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'pelabuhan/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Pelabuhan Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}


function deletepengirim(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'pengirim/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Pengirim Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function deletepenerima(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'penerima/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Penerima Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function deletebiaya(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'biaya/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Biaya Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });

}
function deletetype(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'type/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Type Container Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function deletecontainer(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'container/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Container Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function deletestuff(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'stuffing/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Stuffing Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}

function deletestripp(id) {
    var deleteid = id.value;

    var swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1" },
            buttonsStyling: false
    });

    swal.fire({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
    })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {

                var data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'stripping/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal.fire({
                            title: "Data Kegiatan Dihapus",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            timer: 2e3,
                            showConfirmButton: false
                        })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            } else {
                swal.fire({
                    title: "Data Tidak Dihapus",
                    text: "Data Batal Dihapus",
                    icon: "error",
                    timer: 2e3,
                    showConfirmButton: false
                });
            }
        });
}
