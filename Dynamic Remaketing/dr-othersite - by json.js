// DOC
    // Create feed: https://support.google.com/google-ads/answer/6053288?hl=vi
    // Info setup vs GMC: https://support.google.com/tagmanager/answer/6106009?hl=vi
    // List Tutorial: https://support.google.com/google-ads/answer/7305793

// Mo Ta
/*
    - Only for Worpdress && Woocommerce
    - Base on BODY CLASS -> location page:
        + product single page
        + add-to-cart button
        + cart page
        + checkout page
*/

// https://inankhanh.com/gio-hang/
// https://inankhanh.com/thanh-toan/order-received/7648/?key=wc_order_EQ8ZITbyTuxNy
// Thông tin chuyển khoản chưa rõ ràng, adv cần bổ sung


// Hoi ae ve` qua trinh chuan bi case
// confirm DR need price field?

/*
// Create variable
dr_event_type
dr_items
dr_value
// Create Custom Event
dynamic_remarketing
*/




// HTML Custom
function _DR_TEMPLATE() {
    var _tempStorage = sessionStorage || localStorage;
    var GOOGLE_BUSINESS_VERTICAL = 'retail';
    var CURRENCY = 'VND';
    var IS_DEBUG = document.querySelector('.__TAG_ASSISTANT_BADGE') || false;

    var addProductStorage = function(id_product) {
        id_product = id_product.toString();
        var _lstitem = _tempStorage.getItem('dr_itemslst') || false;
        var _lstarr = _lstitem ? _lstitem.split("//") : [];
        if(!_lstarr.includes(id_product)) {
            _lstarr.push(id_product);
        
            var _rs = _lstarr.join("//");
            _tempStorage.setItem("dr_itemslst", _rs);
        }
    }
    
    var addValueProductStorage = function(_value, _type) {
        var _value_storage = _tempStorage.getItem('dr_value_st') || 0;
    
        var _value_number = 0;
    
        // Add
        if(_type === 1) {
            _value_number = parseFloat(_value_storage) + parseFloat(_value);
        }
    
        // Overwrite
        if(_type === 2) {
            _value_number = parseFloat(_value);
        }
    
        _tempStorage.setItem("dr_value_st", _value_number);
        
    }
    
    // For cart page
    var renewListProductStorageByArrList = function(lst_prod) {
        var _rs = [];
    
        lst_prod.forEach(function(item) {
            _rs.push(item);
        });
        
        _tempStorage.setItem("dr_itemslst", _rs.join("//"));
    }
    
    var checkMultiClass = function(listClass, elm) {
        if(typeof listClass === "object"){
            var n_class = listClass.length;
            var n_ishave = 0;
            listClass.forEach(function(item) {
                if(elm.classList.contains(item)) {
                    n_ishave++;
                }
            })
            if(n_ishave === n_class) {
                return true;
            }
        }
        return false;
    }
    
    
    // ===============
    // READY !!!
    // ===============
    
    // by class body
        var is_product_page = false;
        document.querySelectorAll('[type="application/ld+json"]').forEach(function(item){
            var _inner_json = item.innerText;
            if(_inner_json) {
                _inner_json = _inner_json.replaceAll(/(?:\r\n|\r|\n)/g, " ");
                var _inner_obj = JSON.parse(_inner_json)
                if(_inner_obj['@type']) {
                    if(_inner_obj['@type'] === 'Product') {
                        is_product_page = true
                    }
                }
            }
        });

        
        // var is_order_thankyou_page = checkMultiClass(["woocommerce-order-received", "woocommerce-checkout", "woocommerce-page"], document.body);
    
    // by url or element special
        var is_cart_page = location.href.includes("maychieuminhtan.com/addcart/");
        var is_order_thankyou_page = location.href.includes("maychieuminhtan.com/cart-success/");
    
    
    
    // DR
    var _dr_items = [];
    var _item = {};
    
    if(IS_DEBUG) {
        console.log(
            is_product_page,
            is_cart_page,
            is_order_thankyou_page
        );
    }


    // Product detail page
    if(is_product_page) {
        var id_product = document.querySelector('[name="id_value"]').value;
    
        _item = {"id": id_product, "google_business_vertical": GOOGLE_BUSINESS_VERTICAL };
        _dr_items.push(_item);
        
    
    
        // LUU Y CLASS
        var _price_elm = document.querySelector('.giakm');
        var _value = 0;
        if(_price_elm) {
            _value = parseFloat(_price_elm.innerText.replace(/[^\d]+/g, ''));
        } else {
            if(IS_DEBUG) {
                console.log("dr", "price elm - product detail not fount", dataLayer);
            }
        }
        

        if(IS_DEBUG) { console.log("dr", "view_item"); }
        dataLayer.push({
            'dr_event_type': 'view_item',
            'dr_items': _dr_items,
            'dr_value': _value,
            'event': 'dynamic_remarketing'
        });
    
        
        // add to cart click at product detail page
    
            // LUU Y CLASS
            jQuery(document).on("click", '.btn-buynow', function(){
                _dr_items = []; 
    
                _item = {"id": id_product, "google_business_vertical": GOOGLE_BUSINESS_VERTICAL };
                _dr_items.push(_item);
                
                dataLayer.push({
                    'dr_event_type': 'add_to_cart',
                    'dr_items': _dr_items,
                    'dr_value': _value,
                    'event': 'dynamic_remarketing'
                });
                
                addProductStorage(id_product);
                addValueProductStorage(_value, 1);
    
                if(IS_DEBUG) {
                    console.log("dr", "add_to_cart click", dataLayer);
                }
            });
    }
    
    // Cart page
    if(is_cart_page) {
        
        var id_product = '';
        var _value = 0;
        var _lst_prod = [];
        _dr_items = [];
        
        var _is_update_cart = function() {
            jQuery("#giohang_row .item-cart").each(function(index){
                id_product = jQuery(this).find('.remove-cart').attr('ref');
                                
                // For DR
                _item = {"id": id_product, "google_business_vertical": GOOGLE_BUSINESS_VERTICAL };
                _dr_items.push(_item);
                
        
                addProductStorage(id_product);

                // For Storage Purchase
                _lst_prod.push(id_product);
            });

            _value = parseFloat(document.querySelector('.total-payment').innerText.replace(/[^\d]+/g, ''));
        
            if(_dr_items.length > 0) {
                dataLayer.push({
                    'dr_event_type': 'add_to_cart',
                    'dr_items': _dr_items,
                    'dr_value': _value,
                    'event': 'dynamic_remarketing'
                });
        
                addValueProductStorage(_value, 2);
        
                if(IS_DEBUG) {
                    console.log("dr", "add_to_cart cart page", dataLayer);
                }
            }
        }
    
    
        // Update before unload
        jQuery(window).on('beforeunload', function () {
            _is_update_cart();
        });
    
    
        if(_lst_prod.length > 0) {
            renewListProductStorageByArrList(_lst_prod);
        }
    }
    
    
    
    // order - thank you page
    if(is_order_thankyou_page) {
        var dr_itemslst = _tempStorage.getItem('dr_itemslst');
        var dr_value_st = parseFloat(_tempStorage.getItem('dr_value_st') || 0);
        
        _dr_items = [];

        if(dr_itemslst) {
            var _lstarr = dr_itemslst.split('//');
            
            if(_lstarr.length > 0) {  
                _lstarr.forEach(function(id_product) {
                    _item = {"id": id_product, "google_business_vertical": GOOGLE_BUSINESS_VERTICAL };
                    _dr_items.push(_item);
                });
    
    
                dataLayer.push({
                    'dr_event_type': 'purchase',
                    'dr_items': _dr_items,
                    'dr_value': dr_value_st,
                    'event': 'dynamic_remarketing'
                });
    
                _tempStorage.removeItem('dr_itemslst');
                _tempStorage.removeItem('dr_value_st');
    
                // Debug
                if(IS_DEBUG) {
                    console.log("purchase", dataLayer);
                    console.log("purchase", "dr_itemslst remove");
                }
            }
    
        }
    }
    
    
}

// Start;
_DR_TEMPLATE();