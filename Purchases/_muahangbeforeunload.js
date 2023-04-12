https://jsfiddle.net/dongmx/pmcayt4r/latest



jQuery(window).on('beforeunload', function () {
    var _idorder = function () {
        var _date_key = [
            new Date().getFullYear(),
            ("0" + new Date().getMonth()).slice(-2),
            ("0" + new Date().getDate()).slice(-2),
            ("0" + new Date().getHours()).slice(-2),
            ("0" + new Date().getMinutes()).slice(-2),
        ];
    
        return _date_key.join("") + Math.floor(Math.random() * 99999);
    };
    
    var _price = +document.querySelector(".money_tong").innerText.replace(/[^\d-]+/g, "");
    
    var _currency = "VND";
    
    var _datatemp = {
        'event': 'dathang',
        'value': _price,
        'transaction_id': _idorder(),
        'currency': _currency,
    };

    dataLayer.push(_datatemp);
});


    // dathang
    // value
    // transaction_id
    // currency



