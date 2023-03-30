function decodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

    
function ConvertSheetTable2JsonObject(table) {
    // var table = document.querySelector('[id="1451083050"] table tbody');
    // table.querySelector('thead').remove()
    var header = [];
    var rows = [];
    var _innerHTML = '';

    for (var i = 0; i < table.rows[0].cells.length; i++) {
        header.push(table.rows[0].cells[i].innerText);
    }

    for (var i = 1; i < table.rows.length; i++) {
        var row = {};

        // exclude column 0
        for (var j = 1; j < table.rows[i].cells.length; j++) {
            _innerText =  table.rows[i].cells[j].innerText;
            
            // get Result
            row[header[j]] = _innerText;
        }
        rows.push(row);
    }

    return rows;
}

// Giao doan 1: chuyen doi Sheet table -> json
var _sheetobj = [];
var _objtemp = {};
var _id, _text, _rsConvert; 

document.querySelectorAll('#sheet-menu li').forEach((item) => {
    _objtemp = {};
    _objtemp.id = item.getAttribute('id').replace('sheet-button-', '');
    _objtemp.text = item.innerText;
    _objtemp.sheettab = ConvertSheetTable2JsonObject(document.querySelector('[id="' + _objtemp.id + '"] table tbody'));

    _sheetobj.push(_objtemp);
});



// Giai doan 2: Xu ly file json
// Demo for each
_sheetobj.forEach((itemsheettab) => {
    itemsheettab.sheettab.forEach((item) => {


        // Email Template Custom
        var _html = item["Email Templates Custom"];
        if(_html) {
            if(_html.trim()) {
                var _html = _html;
                var htmlDecode = decodeHTMLEntities(_html);
                console.log(htmlDecode)
                // HTML decode
                document.body.insertAdjacentHTML('beforeEnd', htmlDecode);
            }
        }
    })
})


// Compare ldap
var _ldap = document.querySelector('profile-icon img.photo').src.split('/');
_ldap = _ldap[_ldap.length - 1].split('?')[0];
var _userassigneer = document.querySelector('[debug-id="assignee"]').innerText.replace(/[^a-z]/g,'');

console.log(_ldap === _userassigneer);






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
        // if(_title != "" && _title != _title_diff) {
    
            
        //     console.log("Calendar", _title);
        //     var _contenthtml = `<div class="_casecalendar_info">ZZZZZZZZZZZZZZZZ</div>`;
        //     _contenthtml = _TrustScript(_contenthtml);
        //     var _elmappend = document.querySelector('[jscontroller="dIQ6id"] [jscontroller="UHpdjc"]');
        //     if(_elmappend) {
        //         console.log(123123123)
        //         setInterval(() => {
        //             if(!document.querySelector('._casecalendar_info')) {
        //                 _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
        //             }
        //         }, 500)
        //     }
        //     // once
        //     _title_diff = _title;
        // }
        if(!document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info')) {
            var _contenthtml = `<div class="_casecalendar_info">ZZZZZZZZZZZZZZZZ</div>`;
                _contenthtml = _TrustScript(_contenthtml);
            _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
        }
    }
    
    
}, document.body);


// -----
// Lo trinh` 

// Dung observeOnce - caseid
// Dung observeOnce - status assigneer

// 1. Phat hien va so sanh ldap 
    // 1.2. Luu ldap vao storage
    // Test: Neu' trung ldap va` khac "Assigneer" status
        // 1.2.3: 
