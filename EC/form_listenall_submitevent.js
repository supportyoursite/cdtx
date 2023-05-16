var _forms = document.querySelectorAll('form');

if(_forms.length) {
    _forms.forEach(function(elm) {
        elm.addEventListener("submit", function(e){
            var data_form = new FormData(e.target);
            var inpushObj = {
                "event": 'form_submitonsite',
            };



            var formDataObj = {};
            data_form.forEach(function(value, key) { (formDataObj[key] = value)});

            inpushObj.formdata = formDataObj;

            localStorage.setItem("_ntel", formDataObj.billing_phone);

            dataLayer.push(inpushObj)
        });
    })
}
