var _product = {};
var is_product_page = false;
document.querySelectorAll('[type="application/ld+json"]').forEach(function(item){
    var _inner_json = item.innerText;
    if(_inner_json) {
        _inner_json = _inner_json.replaceAll(/(?:\r\n|\r|\n)/g, " ");
        var _inner_obj = JSON.parse(_inner_json);
        if(_inner_obj['@type']) {
            if(_inner_obj['@type'] === 'Product') {
                var _value = parseFloat(document.querySelector('.giakm').innerText.replace(/[^\d]+/g, ''));
                var _id_product = document.querySelector('.info_product_detail [data-table="product"][data-id]').getAttribute('data-id');
                _product.id = _id_product;
                _product.name = _inner_obj.name;
                _product.description = document.querySelector('meta[name="description"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");  
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
document.querySelector('.productdetail-name').insertAdjacentHTML('beforebegin', _textarea);
