// getProductInfo
// Mini
javascript:var _product={},is_product_page=!1;document.querySelectorAll('[type="application/ld+json"]').forEach((function(e){var t=e.innerText;if(t){t=t.replaceAll(/(?:\r\n|\r|\n)/g," ");var r=JSON.parse(t);if(r["@type"]&&(console.log(r),"Product"===r["@type"])){var o=document.querySelector(".price_config").getAttribute("data-price"),c=r.productID;_product.id=c,_product.name=r.name,_product.description=document.querySelector('meta[name="description"]').content.replaceAll(/(?:\r\n|\r|\n)/g," "),_product.link=location.href,_product.condition="new",_product.price=o+" VND",_product.in_stock="in_stock",_product.image=location.origin+r.image.large,_product.item_group_id=c}}}));var _lalert=Object.keys(_product).map((function(e){return _product[e]})).join("&#9;");console.log(_lalert);var _textarea='<textarea onclick="this.focus();this.select()" readonly="readonly" style=" font-family: monospace; width: 100%; height: 146px; ">'+_lalert+"</textarea>";document.querySelector("#product_detail").insertAdjacentHTML("beforebegin",_textarea);

// get
var _product = {};
var is_product_page = false;
document.querySelectorAll('[type="application/ld+json"]').forEach(function(item){
    var _inner_json = item.innerText;
    if(_inner_json) {
        _inner_json = _inner_json.replaceAll(/(?:\r\n|\r|\n)/g, " ");
        var _inner_obj = JSON.parse(_inner_json);
        if(_inner_obj['@type']) {
            console.log(_inner_obj)
            if(_inner_obj['@type'] === 'Product') {
                var _value = document.querySelector('.price_config').getAttribute('data-price');
                var _id_product = _inner_obj.productID;
                _product.id = _id_product;
                _product.name = _inner_obj.name;
                _product.description = document.querySelector('meta[name="description"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");  
                _product.link = location.href;
                _product.condition = "new";
                _product.price = _value + " VND";
                _product.in_stock = "in_stock";
                _product.image = location.origin + _inner_obj.image.large;
                _product.item_group_id = _id_product;
                
            }
        }
    }
});

var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;");
console.log(_lalert);
var _textarea = '<textarea onclick="this.focus();this.select()" readonly="readonly" style=" font-family: monospace; width: 100%; height: 146px; ">' + _lalert + '</textarea>';
document.querySelector('#product_detail').insertAdjacentHTML('beforebegin', _textarea);
