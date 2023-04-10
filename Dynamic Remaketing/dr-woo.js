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


// Create variable
dr_event_type
dr_items
dr_value
// Create Custom Event
dynamic_remarketing





// HTML Custom
function _DR_TEMPLATE_WOO() {
    var _tempStorage = sessionStorage || localStorage;
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
        var is_product_page = checkMultiClass(["single-product", "single","woocommerce", "woocommerce-page"], document.body);
        var is_cart_page = checkMultiClass(["woocommerce-cart", "woocommerce-page"], document.body);
        var is_begincheckout_page = checkMultiClass(["woocommerce-checkout", "woocommerce-page"], document.body);
        var is_order_thankyou_page = checkMultiClass(["woocommerce-order-received", "woocommerce-checkout", "woocommerce-page"], document.body);
    
    // by url or element special
        // var is_cart_page = location.href.includes("/gio-hang/");
        // var is_begincheckout_page = location.href.includes("/thanh-toan/");
        // var is_order_thankyou_page = location.href.includes("/thanh-toan/order-received/");
    
    // console.log(
    //     is_product_page,
    //     is_cart_page,
    //     is_begincheckout_page,
    //     is_order_thankyou_page
    // );
    
    
    // DR
    var _dr_items = [];
    var _item = {};
    var google_business_vertical = 'retail';
    var _isdebug = false;
    
    // Product detail page
    if(is_product_page) {
        var _splitarr = document.querySelector('[href*="/wp-json/wp/v2/product"]').href.split('/');
        var id_product = _splitarr[_splitarr.length - 1];
    
        _item = {"id": id_product, "google_business_vertical": google_business_vertical };
        _dr_items.push(_item);
        
    
    
        // LUU Y CLASS
        var _price_elm = document.querySelector('.product.type-product .woocommerce-Price-amount');
        var _value = 0;
        if(_price_elm) {
            _value = parseFloat(_price_elm.innerText.replace(/[^\d]+/g, ''));
        } else {
            if(_isdebug) {
                console.log("debug", "price elm - product detail not fount");
            }
        }
    
    
        dataLayer.push({
            'dr_event_type': 'view_item',
            'dr_items': _dr_items,
            'dr_value': _value,
            'event': 'dynamic_remarketing'
        });
    
        
        // add to cart click at product detail page
    
            // LUU Y CLASS
            jQuery(document).on("click", '[name="add-to-cart"]', function(){
                _dr_items = []; 
    
                _item = {"id": id_product, "google_business_vertical": google_business_vertical };
                _dr_items.push(_item);
                
                dataLayer.push({
                    'dr_event_type': 'add_to_cart',
                    'dr_items': _dr_items,
                    'dr_value': _value,
                    'event': 'dynamic_remarketing'
                });
                
                addProductStorage(id_product);
                addValueProductStorage(_value, 1);
    
                if(_isdebug) {
                    console.log("add_to_cart", dataLayer);
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
            jQuery(".cart_item").each(function(index){
                id_product = jQuery(this).find('[data-product_id]').attr('data-product_id');
                _value += parseFloat(jQuery(this).find('.product-subtotal').text());
                
                // For DR
                _item = {"id": id_product, "google_business_vertical": google_business_vertical };
                _dr_items.push(_item);
        
                // For Storage Purchase
                _lst_prod.push(id_product);
            });
        
            if(_dr_items.length > 0) {
                dataLayer.push({
                    'dr_event_type': 'add_to_cart',
                    'dr_items': _dr_items,
                    'dr_value': _value,
                    'event': 'dynamic_remarketing'
                });
        
                addValueProductStorage(_value, 2);
        
                if(_isdebug) {
                    console.log("add_to_cart cart page", dataLayer);
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
                    _item = {"id": id_product, "google_business_vertical": google_business_vertical };
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
                if(_isdebug) {
                    console.log("purchase", dataLayer);
                    console.log("purchase", "dr_itemslst remove");
                }
            }
    
        }
    }
    
    
}

// Start;
_DR_TEMPLATE_WOO();