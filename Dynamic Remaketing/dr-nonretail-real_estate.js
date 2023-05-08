
/*
// Create variable
dr_event_type
dr_items

// Create Custom Event
dynamic_remarketing
*/


var id_product = '';
var GOOGLE_BUSINESS_VERTICAL = 'real_estate';
document.body.classList.forEach(_name => {
    if(_name.includes('postid-')) {
        id_product = _name.replace(/[^\d]+/g, "");

        _item = {"id": id_product, "google_business_vertical": GOOGLE_BUSINESS_VERTICAL };
        _dr_items.push(_item);

        dataLayer.push({
            'dr_event_type': 'view_item',
            'dr_items': _dr_items,
            'event': 'dynamic_remarketing'
        });
    }
})