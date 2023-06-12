
/*
// Create variable
dr_event_type
dr_items

// Create Custom Event
dynamic_remarketing
*/


// single-product woocommerce", "woocommerce-page
var id_product = '';
var dr_items = [];
var GOOGLE_BUSINESS_VERTICAL = 'custom';

if(
    document.body.classList.contains('single-product') &&
    document.body.classList.contains('woocommerce-page') &&
    document.body.classList.contains('woocommerce')
) {
    document.body.classList.forEach(_name => {
        if(_name.includes('postid-')) {
            id_product = _name.replace(/[^\d]+/g, "");
            dr_items = []
            
            _item = {"id": id_product, "google_business_vertical": GOOGLE_BUSINESS_VERTICAL };
            dr_items.push(_item);
    
            dataLayer.push({
                'dr_event_type': 'view_item',
                'dr_items': dr_items,
                'event': 'dynamic_remarketing'
            });
        }
    })
}
