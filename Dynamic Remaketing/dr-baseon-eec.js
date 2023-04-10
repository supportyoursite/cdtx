// GTM Demo Dynamic
    // By on EEC GA4
    // https://tagmanager.google.com/#/container/accounts/6057864509/containers/108372509/workspaces/2/tags
    // Event Regex: (^view_item$)|(^add_to_cart$)|(^purchase$)
    // Shopbase
    // Purchase, add to cart nhieu` lan` co' OK?

// dr_items
function(){
    var _ecommerce = {{ecommerce}};
    try {
        if(_ecommerce.items) {
            var _dr_items = [];
            var _item = {};
            _ecommerce.items.forEach(function(item) {
                _item = {"id": item.item_id, "google_business_vertical": "retail" };
                _dr_items.push(_item);
            });
            return _dr_items;
        }

    } catch (error) {
        return "NG";          
    }
  
}

// dr_value
function(){
    var _ecommerce = {{ecommerce}};
    try {
        if(_ecommerce.items) {
            var _dr_items = [];
            var _value = 0;
            _ecommerce.items.forEach(function(item) {
                _value += parseFloat(item.price);
            });
            return _value;
        }

    } catch (error) {
        return "NG";          
    }
}