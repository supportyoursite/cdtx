function _innitEC() {
    function observeOnce(callback, targetNode = document.body, config = { attributes: true, childList: true, subtree: true }) {
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
    
    function convertToSlug(Text) {
        return Text.toLowerCase()
                   .replace(/[^\w ]+/g, '')
                   .replace(/ +/g, '_');
    }
    
    observeOnce(function(){
        var _is_view_item = false;
        var _currency = 'VND';
    
        window.urlchange = window.urlchange || '';
        window.compare_change = window.compare_change || false;
        window.cartchange = window.cartchange || false;


        if(window.urlchange !== location.pathname) {
            
            window.urlchange = location.pathname;
        }
        
        
        // view item
        var _parent = document.querySelector('#productDetailModal');
        if(_parent) {
            var _btn_addtocart_pricelem = _parent.querySelector('.btn-coke');
            if(_btn_addtocart_pricelem) {
                var _item_id = convertToSlug(_parent.querySelector('h2').innerText.trim());
                var _item_name = _parent.querySelector('h2').innerText.trim();
                var _quantity = 1;
                if(_parent.querySelector('input[aria-describedby="inp-order-count"]')) {
                    _quantity = _parent.querySelector('input[aria-describedby="inp-order-count"]').value;
                }
                var _price = _btn_addtocart_pricelem.innerText.trim();
                _price = parseFloat(_price.replace(/[^\d]+/g, ''));

                var _compare_change = _item_id + _price;

                if(window.compare_change !== _compare_change) {
                    window.compare_change = _compare_change;



                    var _items = [];
                    var _item = {};
                    _item = {
                        item_id: _item_id,
                        item_name: _item_name,
                        affiliation: "",
                        coupon: "",
                        discount: 0,
                        index: 0,
                        item_brand: "",
                        item_category: "",
                        item_category2: "",
                        item_category3: "",
                        item_category4: "",
                        item_category5: "",
                        item_list_id: "",
                        item_list_name: "",
                        item_variant: "",
                        location_id: "",
                        price: _price,
                        quantity: parseFloat(_quantity)
                    };
                    _items.push(_item);


                    dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
                    dataLayer.push({
                        event: "view_item",
                        ecommerce: {
                            currency: _currency,
                            value: _ttprice,
                            items: _items
                        }
                    });
                }
            }
        }


        // CART PAGE
        if(location.pathname.includes('/cart')) {
            // add to cart
            var iscarts = document.querySelectorAll('main ul .cart-item');
            if(iscarts.length > 0) {
                var _btn_addtocart_pricelem = document.querySelector('main .btn-coke');
                if(_btn_addtocart_pricelem) {
                    var _ttprice = _btn_addtocart_pricelem.innerText.trim();
                    _ttprice = parseFloat(_ttprice.replace(/[^\d]+/g, ''));
                    
                    if(_ttprice > 0) {
                        var _cartchange = 'totalcart' + _ttprice;
    
                        var _items = [];
                        var _item = {};
                        if(window.cartchange !== _cartchange) {
                            // -- save once
                            window.cartchange = _cartchange;
                            
                            // Start
                            

                            // st-1
                            iscarts.forEach(function(elm){
                                var _item_id = convertToSlug(elm.querySelector('.product p').innerText.trim());
                                var _item_name = elm.querySelector('.product p').innerText.trim();
                                var _quantity = elm.querySelector('input[aria-describedby="inp-order-count"]').value;
    
                                var _price = 0;
                                elm.querySelectorAll('span').forEach(function(elm2){
                                    if(elm2.innerText.includes('₫')){
                                        _price = elm2.innerText.trim();
                                        _price = parseFloat(_price.replace(/[^\d]+/g, ''));
                                    }
                                })
                                 
    
                                _item = {
                                    item_id: _item_id,
                                    item_name: _item_name,
                                    affiliation: "",
                                    coupon: "",
                                    discount: 0,
                                    index: 0,
                                    item_brand: "",
                                    item_category: "",
                                    item_category2: "",
                                    item_category3: "",
                                    item_category4: "",
                                    item_category5: "",
                                    item_list_id: "",
                                    item_list_name: "",
                                    item_variant: "",
                                    location_id: "",
                                    price: _price,
                                    quantity: parseFloat(_quantity)
                                };
                                _items.push(_item);

                            });
                            

                            // st-3
                            // Datalayer
                            dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
                            dataLayer.push({
                                event: "add_to_cart",
                                ecommerce: {
                                    currency: _currency,
                                    value: _ttprice,
                                    items: _items
                                }
                            });
                        }
                    }
                }
            }
        }

    });
    
}

_innitEC();
