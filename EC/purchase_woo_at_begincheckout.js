formdata.billing_email
formdata.billing_phone

<script>
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



            dataLayer.push(inpushObj)
        });
    })
}
window.addEventListener('beforeunload', function () {
  var _priceelm = document.querySelector('.order-total span.woocommerce-Price-amount.amount')
  var _price = 0;
  if(_priceelm) {
      _price = parseFloat(_priceelm.innerText.replace(/[^\d]+/g, ''));
  }
  

  dataLayer.push({
    event: "beforeunload",
    value: _price
  })
});

</script> 