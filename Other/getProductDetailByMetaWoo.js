// Adv
javascript:function getProduct() { var _product = {}; var is_product_page = false; document.body.classList.forEach(_name => { if(_name.includes('postid-')) { is_product_page = _name.replace(/[^\d]+/g, ""); } }); if(is_product_page) { _product.id = is_product_page; _product.name = document.querySelector('h1.product-title').innerText; _product.link = location.href; _product.image = document.querySelector('meta[property="og:image"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " "); var _description = document.querySelector('meta[property="og:description"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " "); _description = _description.replaceAll('[...]', ''); _description = _description.trim(); _product.description = _description; var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;"); var _textarea = '<textarea onclick="this.focus();this.select()" readonly="readonly" style=" width: 100%; height: 146px; font-family: monospace;">' + _lalert + '</textarea>'; document.querySelector('main').insertAdjacentHTML('beforebegin', _textarea); } } getProduct();



// OK
function getProduct() {
    var _product = {};
    var is_product_page = false;
    
    document.body.classList.forEach(_name => {
        if(_name.includes('postid-')) {
            is_product_page = _name.replace(/[^\d]+/g, "");
        }
    });

    if(is_product_page) {
        _product.id = is_product_page;
        _product.name = document.querySelector('h1.product-title').innerText;
        
        _product.link = location.href;
        _product.image = document.querySelector('meta[property="og:image"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");
        
        
        var _description = document.querySelector('meta[property="og:description"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");
            _description = _description.replaceAll('[...]', '');
            _description = _description.trim();

        _product.description = _description;
        
        var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;");
        
        var _textarea = '<textarea onclick="this.focus();this.select()" readonly="readonly" style=" width: 100%; height: 146px; font-family: monospace;">' + _lalert + '</textarea>';
        document.querySelector('main').insertAdjacentHTML('beforebegin', _textarea);
    }
}

getProduct();
