<script>
var _tempStorage = sessionStorage || localStorage;
if (location.href.includes("/payment-processing")) {
    // transaction_id
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

    var _price = +document.querySelector(".total-line .total-line-price").innerText.replace(/[^\d-]+/g, "");

    var _currency = "VND";

    var _arr = [_idorder(), _price, _currency];

    _tempStorage.setItem("_purchase", _arr.join("|-|"));
}

if (location.href.includes("/order-success")) {
    // If products list > 1
    var _trproductlength = document.querySelectorAll(".table-cart tr").length || 1;

    
    if (_tempStorage.getItem("_purchase") && _trproductlength > 1) {
        var _getpurchase = _tempStorage.getItem("_purchase");
        var _arrpurchase = _getpurchase.split("|-|");

        dataLayer.push({
            event: "purchase_conv",
            transaction_id: _arrpurchase[0],
            value: +_arrpurchase[1],
            currency: _arrpurchase[2],
        });

        _tempStorage.removeItem("_purchase");
    }
}
</script>
