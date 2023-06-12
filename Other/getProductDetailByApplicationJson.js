// ADV tongkhomayxaydung.vn
javascript:function capitalizeFirstLetter(string) { string = string.toLowerCase(); return string.charAt(0).toUpperCase() + string.slice(1); } var _product = {}; var is_product_page = false; document.querySelectorAll('[type="application/ld+json"]').forEach(function(item){ var _inner_json = item.innerText; if(_inner_json) { _inner_json = _inner_json.replaceAll(/(?:\r\n|\r|\n)/g, " "); var _inner_obj = JSON.parse(_inner_json); if(_inner_obj['@type']) { if(_inner_obj['@type'] === 'Product') { console.log(_inner_obj); var _value = _inner_obj['offers'][0].price; var _id_product = _inner_obj['sku']; _product.id = _id_product; _product.name = capitalizeFirstLetter(_inner_obj.name); _product.description = ''; if(_description = document.querySelector('meta[name="description"]')) { _product.description = _description.content.replaceAll(/(?:\r\n|\r|\n)/g, " "); } if(document.querySelector('meta[property="og:description" ]')) { _product.description = document.querySelector('meta[property="og:description" ]').content.replaceAll(/(?:\r\n|\r|\n)/g, " "); } _product.link = location.href; _product.condition = "new"; _product.price = _value + " VND"; _product.in_stock = "in_stock"; _product.image = _inner_obj.image; _product.item_group_id = _id_product; } } } }); var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;"); var _textarea = '<textarea onclick="this.focus();this.select()" readonly="readonly" style="font-family: monospace; width: 100%; height: 146px; ">' + _lalert + '</textarea>'; document.querySelector('body').insertAdjacentHTML('beforebegin', _textarea);


// OK
function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}


var _product = {};
var is_product_page = false;
document.querySelectorAll('[type="application/ld+json"]').forEach(function(item){
    var _inner_json = item.innerText;
    if(_inner_json) {
        _inner_json = _inner_json.replaceAll(/(?:\r\n|\r|\n)/g, " ");
        var _inner_obj = JSON.parse(_inner_json);
        if(_inner_obj['@type']) {
            if(_inner_obj['@type'] === 'Product') {
                console.log(_inner_obj);
                var _value = _inner_obj['offers'][0].price;
                var _id_product = _inner_obj['sku'];
                _product.id = _id_product;
                _product.name = capitalizeFirstLetter(_inner_obj.name);
                _product.description = '';

                if(_description = document.querySelector('meta[name="description"]')) {
                    _product.description = _description.content.replaceAll(/(?:\r\n|\r|\n)/g, " ");  
                }

                if(document.querySelector('meta[property="og:description" ]')) {
                    _product.description = document.querySelector('meta[property="og:description" ]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");  
                }

                
                _product.link = location.href;
                _product.condition = "new";
                _product.price = _value + " VND";
                _product.in_stock = "in_stock";
                _product.image = _inner_obj.image;
                _product.item_group_id = _id_product;
                
            }
        }
    }
});


var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;");
var _textarea = '<textarea onclick="this.focus();this.select()" readonly="readonly" style="font-family: monospace; width: 100%; height: 146px; ">' + _lalert + '</textarea>';
document.querySelector('body').insertAdjacentHTML('beforebegin', _textarea);
