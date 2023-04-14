function ConfirmMsg(title, text, icon,
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel') {
    return new Promise(resolve => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: cancelButtonText == ''? false : true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            allowOutsideClick: false,
            allowEscapeKey: true,
            focusCancel: true
        }).then((result) => {
            resolve(result.isConfirmed);
        });
    });
}

function AlertMsg(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        allowOutsideClick: false,
        allowEscapeKey: false
    });
}

function SwalShowLoading(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        allowOutsideClick: false,
        allowEscapeKey: false
    })
    Swal.showLoading();
    Swal.disableButtons();
}

function SwalHideLoading(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        allowOutsideClick: false,
        allowEscapeKey: false
    })
    Swal.hideLoading();
    Swal.enableButtons();
}

function SwalClose() {
    Swal.close();
}