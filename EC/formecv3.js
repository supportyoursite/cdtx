jQuery(document).on('click', '[name="submit"]', function () {
    var _form = jQuery(this).closest('form');
    _email = _form.find('[name="email"]').val();
    if(_email.includes('@')) {
        dataLayer({
            "event": "submit_ec",
            "email": _email
        })
    }
});