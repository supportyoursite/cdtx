var _forms = document.querySelectorAll('form');

if(_forms.length) {
    _forms.forEach(function(elm) {
        elm.addEventListener("submit", function(e){
            var data_form = new FormData(e.target);
            var inpushObj = {
                "event": 'form_submitonsite',
            };



            var formDataObj = {};
            data_form.forEach((value, key) => (formDataObj[key] = value));

            inpushObj.formdata = formDataObj;
            

            var phoneObject = inputs.find(function(item){
                return item.name == 'phone'; //name of phone input
            });

            if(phoneObject) {
                inpushObj.phone = phoneObject.value;
            }



            dataLayer.push(inpushObj)
        });
    })
}
