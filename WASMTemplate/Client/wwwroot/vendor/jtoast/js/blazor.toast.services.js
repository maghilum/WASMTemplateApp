function JToast(icon, heading, text) {
    $.toast.options = {
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: 5000,
        loader: false,
        stack: 5,
        position: 'bottom-center',
        bgColor: false,
        textColor: false,
        textAlign: 'left'
    };

    $.toast({
        heading: heading,
        text: text,
        icon: icon
    });
}