// Before send
function gtm_formec() {
    var _allinput = document.querySelectorAll('.address-form-wrapper input');

    var n_have_data = 0 ;
    _allinput.forEach(function(item) {
        console.log(item.value);
        if(item.value.trim()) {
            n_have_data++;
        } 
    });

    // console.log(n_have_data, _allinput.length)
    if(n_have_data === _allinput.length) {
        var _email = document.querySelector('[name="address[email]"]');
        if(_email.value.includes('@')) {
            var _price = document.querySelector('.total-text.raw-total-text').replace(/[^\d-]+/g, "");
            var _price = document.querySelector('.total-text.raw-total-text').replace(/[^\d-]+/g, "");
            dataLayer.push({
                'event': 'ec_purchasesubmit',
                'email': _email.value,
            })
        }
    }
}

gtm_formec();


// https://loiphat.com.vn/checkout/355a3d51ed2addf716190926e0578622/success
function gtm_formec() {
    
}

gtm_formec(

// Thay the so lieu 
var _madonhang = "IDMADONHANG";
var _price = 123456;
var _currency = "VND";

dataLayer.push({
    "event": "muahang_thanhcong",
    "madonhang": _madonhang,
    "price": _price,
    "currency": _currency,
})