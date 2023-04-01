
// == CALENDAR


function _TrustScript(_string) {
    const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', { createHTML: () => _string });
    return staticHtmlPolicyv2.createHTML('');
}


function observeOnce(callback, targetNode = document.body, config = { attributes: true, childList: true, subtree: true }) {
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}

// observeOnce((elm) => {
//     console.log(123123)
// }, document.querySelector('action-bar .action-buttons [buttondecorator]'));


// Calendar
// [jscontroller="UHpdjc"]

var _title_diff = '';
var _title = '';
observeOnce((elm) => {
    var _headelm = document.querySelector('#rAECCd');
    if(_headelm) {
        var _title = _headelm.innerText;
        // 
        if(document.querySelector('[jscontroller="dIQ6id"]')) {
            if(!document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info')) {

                // Display after Title
                    // Ads ID, Ocid
                    // Customer: Name, phone, website, 
                    // task, Attribution Model,
                    // Request, AM name (Is GCC color red)
                    // Note, 

                var _elmappend = document.querySelectorAll('[jscontroller="dIQ6id"] .nBzcnc.OcVpRe')[0];
                var _contenthtml = `<div class="_casecalendar_info">
                <a href="#" target="_blank" class="_casecalendar_info-50per" data-title="Case ID:" >7-5404000034216</a>
                
                <span class="_casecalendar_info-50per" data-title="Ads ID & Adv name:" >
                    <a href="#" target="_blank" >710-439-4086</a>
                    <br>
                    Nguyễn Thanh Tùng
                </span>
                
                <span class="_casecalendar_info-50per" data-title="Phone:" >+84 94 127 37 77</span>
                <span class="_casecalendar_info-50per" data-title="Website:" >www.dong.com</span>

                <span class="_casecalendar_info-50per" data-title="Request:" >Request</span>
                <span class="_casecalendar_info-50per is-gcc" data-title="AM:" >Lisa Rita</span>

                <span class="_casecalendar_info-50per" data-title="Task:" >Ads Conversion Tracking, Ads Remarketing,Analytics Setup</span>
                <span class="_casecalendar_info-50per" data-title="Attribution Model:" >Data Driven Attribution (DDA)
                </span>

                <span class="_casecalendar_info-100per" data-title="Note:"></span>
                </div>`;
                    _contenthtml = _TrustScript(_contenthtml);
                _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
            }
        } 
    }
    
    
}, document.body);



