"use strict";
$(function () {
    var swal = Swal.mixin({
        customClass:
        {
            confirmButton: "btn btn-label-success btn-wide mx-1",
            denyButton: "btn btn-label-secondary btn-wide mx-1",
            cancelButton: "btn btn-label-danger btn-wide mx-1"
        },
        buttonsStyling: false
    });
    var toast = Swal.mixin({
        toast: true,
        position: "top-end", showConfirmButton: false,
        timer: 3e3,
        timerProgressBar: true,
        didOpen: function didOpen(toast) {
            toast.addEventListener("mouseenter", Swal.stopTimer); toast.addEventListener("mouseleave", Swal.resumeTimer)
        }
    });
    $("#swal-1").on("click", function () {
        swal.fire("Any fool can use a computer")
    });

    $("#swal-2").on("click", function () { swal.fire("The Internet?", "That thing is still around?", "question") }); $("#swal-3").on("click", function () { swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong!", footer: '<a href="">Why do I have this issue?</a>' }) });
    $("#swal-4").on("click", function () { swal.fire({ title: "<strong>HTML <u>example</u></strong>", icon: "info", html: "You can use <b>bold text</b>, " + '<a href="//sweetalert2.github.io">links</a> ' + "and other HTML tags", showCloseButton: true, showCancelButton: true, focusConfirm: false, confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!', confirmButtonAriaLabel: "Thumbs up, great!", cancelButtonText: '<i class="fa fa-thumbs-down"></i>', cancelButtonAriaLabel: "Thumbs down" }) }); $("#swal-5").on("click", function () {
        swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true, showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: "Don't save" }).then(function (result) { if (result.isConfirmed) { swal.fire("Saved!", "", "success") } else if (result.isDenied) { swal.fire("Changes are not saved", "", "info") } }) });
    $("#swal-6").on("click", function () {
        swal.fire(
            {
                position: "top-end",
                icon: "success",
                title: "Your work has been saved", showConfirmButton: false, timer: 1500
            })
    });
    $("#swal-7").on("click", function () { swal.fire({ title: "Are you sure?", text: "You won't be able to revert this!", icon: "warning", showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", confirmButtonText: "Yes, delete it!" }).then(function (result) { if (result.isConfirmed) { swal.fire("Deleted!", "Your file has been deleted.", "success") } }) }); $("#swal-8").on("click", function () { swal.fire({ title: "Sweet!", text: "Modal with a custom image.", imageUrl: "https://unsplash.it/400/200", imageWidth: 400, imageHeight: 200, imageAlt: "Custom image" }) }); $("#swal-9").on("click", function () { var timerInterval; swal.fire({ title: "Auto close alert!", html: "I will close in <b></b> milliseconds.", timer: 2e3, timerProgressBar: true, didOpen: function didOpen() { swal.showLoading(); var b = swal.getHtmlContainer().querySelector("b"); timerInterval = setInterval(function () { b.textContent = swal.getTimerLeft() }, 100) }, willClose: function willClose() { clearInterval(timerInterval) } }).then(function (result) { if (result.dismiss === swal.DismissReason.timer) { ("I was closed by the timer") } }) });
    $("#swal-10").on("click", function () { swal.fire({ title: "Submit your Github username", input: "text", inputAttributes: { autocapitalize: "off" }, showCancelButton: true, confirmButtonText: "Look up", showLoaderOnConfirm: true, preConfirm: function preConfirm(login) { return fetch("//api.github.com/users/".concat(login)).then(function (response) { if (!response.ok) { throw new Error(response.statusText) } return response.json() })["catch"](function (error) { swal.showValidationMessage("Request failed: ".concat(error)) }) }, allowOutsideClick: function allowOutsideClick() { return !swal.isLoading() } }).then(function (result) { if (result.isConfirmed) { swal.fire({ title: "".concat(result.value.login, "'s avatar"), imageUrl: result.value.avatar_url }) } }) });
    $("#swal-11").on("click", function () {
        toast.fire({
            icon: "success",
            title: "Signed in successfully"
        })
    })
});
