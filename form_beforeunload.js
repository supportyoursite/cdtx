// jQuery

// 1. click and beforeunload, without submit form listen
var _once_dl = 0;
jQuery(document).on("click", '[class*="zzzzz"], [class*="zzzzz"] *', function () {
    var _formparent = jQuery(this).closest("form");

    jQuery(window).on('beforeunload', function () {
        if (_once_dl === 0) {
            dataLayer.push({
                event: "forminfo_submit"
            });

            _once_dl++;
        }
    });

});


// This Form for submit event
var _once_dl = 0;
jQuery(document).on("click", '[class*="zzzzz"], [class*="zzzzz"] *', function () {
    var _formparent = jQuery(this).closest("form");
    jQuery(window).on('beforeunload', function () {
        if (_once_dl === 0) {
            dataLayer.push({
                event: "forminfo_submit"
            });

            _once_dl++;
        }
    });
});


// EC form
var _once_dl = 0;
jQuery(document).on("click", '[class*="zzzzz"], [class*="zzzzz"] *', function () {
    var _formparent = jQuery(this).closest("form");

    // Required email for form
    if (_formparent.find('[type="email"]').length) {
        var _email = _formparent.find('[type="email"]').val();
        if (_email.indexOf('@') >= 0) {
            jQuery(window).on('beforeunload', function () {
                if (_once_dl === 0) {
                    dataLayer.push({
                        event: "forminfo_submit",
                        email: _email,
                    });

                    _once_dl++;
                }
            });
        }

    }
});

