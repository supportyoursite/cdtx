javascript:
function getProduct() {
    var _product = {};
    var is_product_page = false;
    
    function capitalizeFirstLetter(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    var _id_product = document.querySelector('[name="add-to-cart"]').value;
    _product.id = _id_product;
    _product.name = capitalizeFirstLetter(document.querySelector('h1.product_title').innerText);
    // _product.description = document.querySelector('meta[name="description"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");  
    _product.description = document.querySelector('.woocommerce-Tabs-panel--description p').innerText.replaceAll(/(?:\r\n|\r|\n)/g, " ");
    _product.link = location.href;
    _product.condition = "new";
    _product.price = document.querySelector('.summary .price .woocommerce-Price-amount').innerText.replace(/[^\d-]+/g, "") + " VND";
    _product.in_stock = "in_stock";
    _product.image = document.querySelector('[data-thumb]:nth-child(2) img').getAttribute('src');
    _product.item_group_id = _id_product;
    
    
    
    var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;");
    
    var _textarea = '<textarea onclick="this.focus();this.select()" readonly="readonly" style=" width: 100%; height: 146px; font-family: monospace;">' + _lalert + '</textarea>';
    document.querySelector('main').insertAdjacentHTML('beforebegin', _textarea);
    
}
getProduct();
    