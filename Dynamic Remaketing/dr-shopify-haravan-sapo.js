
// Create variable
dr_event_type
dr_items
// Create Custom Event
dynamic_remarketing




<script>
    function DR_VIEW_ADD() {
        var _tempStorage = sessionStorage || localStorage;
        var addProductStorage = function(id_product) {
            id_product = id_product.toString();
            var _lstitem = _tempStorage.getItem('dr_itemslst') || "";
            var _lstarr = _lstitem ? _lstitem.split("//") : [];
            if(!_lstarr.includes(id_product)) {
                _lstarr.push(id_product);
            
                var _rs = _lstarr.join("//");
                _tempStorage.setItem("dr_itemslst", _rs);
            }
        }
        
        
        // BEGIN
        
        var _dr_items = [];
        var _item = {};
        var _platform = {};
        var google_business_vertical = 'retail';
        
        //  HaravanAnalytics || ShopifyAnalytics || BizwebAnalytics
        if(typeof HaravanAnalytics === 'object') {
            _platform = HaravanAnalytics;
        }
        
        if(typeof ShopifyAnalytics === 'object') {
            _platform = ShopifyAnalytics;
        }
        
        if(typeof BizwebAnalytics === 'object') {
            _platform = BizwebAnalytics;
        }
        
        
        
        try {
            
            var id_product = _platform.meta.product.id;
            if(id_product) {
                _dr_items = [];
                _item = {"id": id_product, "google_business_vertical": google_business_vertical};
                _dr_items.push(_item);
        
                dataLayer.push({
                    'dr_event_type': 'view_item',
                    'dr_items': _dr_items,
                    'event': 'dynamic_remarketing'
                });
        
                
                // add to cart, button #buy-now
                jQuery(document).on("click", "#buy-now, #add-to-cart, button.add-to-cart", function() {
                    _dr_items = [];

                    _item = {"id": id_product, "google_business_vertical": google_business_vertical};
                    _dr_items.push(_item);
                    dataLayer.push({
                        'dr_event_type': 'add_to_cart',
                        'dr_items': _dr_items,
                        'event': 'dynamic_remarketing'
                    });
        
                    addProductStorage(id_product);
                    
                
                })
            }
            
            
        
        } catch (error) {
            console.log("ERRO")
        }
    }

    DR_VIEW_ADD();
</script>

// Thank you page

<script>
function DR_PRUCHASE() {
    var _tempStorage = sessionStorage || localStorage;
    
    var _dr_itemslst = _tempStorage.getItem('dr_itemslst');

    var _dr_items = [];

    var google_business_vertical = 'retail';

    if(_dr_itemslst) {
        var _lstarr = _dr_itemslst.split('//');
        
        if(_lstarr.length > 0) {  
            _lstarr.forEach(function(id_product) {
                _item = {"id": id_product, "google_business_vertical": google_business_vertical };
                _dr_items.push(_item);
            });

            dataLayer.push({
                'dr_event_type': 'purchase',
                'dr_items': _dr_items,
                'event': 'dynamic_remarketing'
            });

            _tempStorage.removeItem('dr_itemslst');
        }
    }
}
DR_PRUCHASE();
</script>
