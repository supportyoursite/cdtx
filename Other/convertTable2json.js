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

    _sheetobj[_objtemp.text].push(_objtemp);
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
                // console.log(htmlDecode)
                // HTML decode
                document.body.insertAdjacentHTML('beforeEnd', htmlDecode);
            }
        }
    })
})










// -----
// Lo trinh` 

// Dung observeOnce - caseid
// Dung observeOnce - status assigneer

// 1. Phat hien va so sanh ldap 
    // 1.2. Luu ldap vao storage
    // Test: Neu' trung ldap va` khac "Assigneer" status
        // 1.2.3: 
