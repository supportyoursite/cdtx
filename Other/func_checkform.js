function() {
    try {
        var _name = jQuery('.form_tuvan #contact_name');
        var _sdt = jQuery('.form_tuvan #contact_tel');
        
        if(_name.val() && _sdt.val()){
            return "OK";
        }
    } catch (error) {
        return ""
    }
}