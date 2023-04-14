function initSideBarToggle() {
    setTimeout(function () {
        var sidebarToggleActivate = setInterval(function () {
            if ($("#sidebar").length) {
                clearInterval(sidebarToggleActivate);
                console.log("Sidebar initialized...");

                $("#sidebarCollapse").on('click', function () {
                    $("#sidebar").toggleClass('active');
                });
            }
        }, 100);

        //initDropdownToggles();
    }, 100);
}

function initBootrapAppMenu() {
    setTimeout(function () {
        //$("#sidebar li a.active").parent("li").parent("ul").parent("li").children("a").attr("aria-expanded", "true").parent("li").parent("ul").parent("li").children("a").attr("aria-expanded", "true");
        //$("#sidebar li a.active").parent("li").parent("ul:not(.components)").addClass("show").parent("li").parent("ul:not(.components)").addClass("show");

        var hasCollapsable = true;
        var el = $("#sidebar li a.active");
        var count = 5;
        while (hasCollapsable && count >= 0) {
            if (el.parent("li").parent("ul")) {
                el.parent("li").parent("ul").parent("li").children("a").attr("aria-expanded", "true");
                el.parent("li").parent("ul:not(.components)").addClass("show");

                el = el.parent("li").parent("ul").parent("li").children("a");
            }
            else {
                hasCollapsable = false;
            }
            count -= 1;
        }
    }, 200);
}

function initCollapse() {
    $(".menu-collapse").click(function () {
        var target = $(this).attr("href");
        if (target == undefined)
            target = $(this).data("target");
        if ($(target).is(":visible")) {
            $(this).attr("aria-expanded", "false");
            $(target).slideUp("fast", function () {
                $(target).removeClass("show");
            });
        }
        else {
            $(this).attr("aria-expanded", "true");
            $(target).slideDown("fast", function () {
                $(target).addClass("show");
            });
        }
    });
}

function initDropdownToggles() {
    $(".dropdown-toggle").unbind("click").on("click", function (e) {
        e.preventDefault();
    });
}

function OpenModal(elem, static = true, focus = true) {
    var myModal = new bootstrap.Modal(document.getElementById(elem.replace('#', '')), { backdrop: static? "static" : true, focus: focus });
    myModal.show(elem);
}

function CloseModal(elem) {
    $(elem).modal('hide');
}

function ClearModals() {
    $('.modal').modal('hide');
}

function DisableFieldset(elem) {
    $(elem).attr("disabled", "");
}

function EnableFieldset(elem) {
    $(elem).removeAttr("disabled");
}

function ShowToast(elem) {
    var toastElem = document.getElementById(elem);
    var toast = new bootstrap.Toast(toastElem, { delay: 5000 });
    toast.show()
}

function CloseToast(elem) {
    var toastElem = document.getElementById(elem);
    var toast = new bootstrap.Toast(toastElem, { delay: 5000 });
    toast.hide()
}

function PreventUnload(msg) {
    window.onbeforeunload = function () {
        return msg;
    }
}

function UnPreventUnload() {
    window.onbeforeunload = undefined;
}

function LocationReplace(url) {
    location.replace(url);
}

function ShowLogin() {
    setTimeout(function () {
        $('.login')
            .css("display", "flex")
            .hide()
            .fadeIn();
    }, 300);
}

function ProfileLoadError(image) {  
    var errorUrl = "img/no_image.png";
    image.src = errorUrl
}

function FitText(elem, minFontSize, maxFontSize) {
    setTimeout(function () {
        $(elem).fitText(1, { minFontSize: minFontSize, maxFontSize: maxFontSize });
    }, 200);
}

function SetCheckbox(elem, status) {
    if (status)
        $(elem).prop('checked', true);
    else
        $(elem).prop('checked', false);
}

function ScrollToView(elem) {
    if ($(elem)) {
        $(elem)[0].scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
}