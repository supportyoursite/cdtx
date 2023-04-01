function GoogleSheetOnline(_htmlelm, _callback) {
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
                _innerText = table.rows[i].cells[j].innerText;

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

    _htmlelm.querySelectorAll('#sheet-menu li').forEach((item) => {
        _objtemp = {};
        _objtemp.id = item.getAttribute('id').replace('sheet-button-', '');
        _objtemp.text = item.innerText;
        _objtemp.sheettab = ConvertSheetTable2JsonObject(_htmlelm.querySelector('[id="' + _objtemp.id + '"] table tbody'));

        _sheetobj[_objtemp.text] = _objtemp;
    });

    _callback(_sheetobj);


}

// https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRMxOxerJ3zWV07uTOdTQCaa13ODbTfZVj5SB7-4Q6QlFhFTU8uXA-wsywXAUUqzHtOiGQdGgCYfRmk/pubhtml#
fetch("https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRMxOxerJ3zWV07uTOdTQCaa13ODbTfZVj5SB7-4Q6QlFhFTU8uXA-wsywXAUUqzHtOiGQdGgCYfRmk/pubhtml")
    .then((response) => response.text())
    .then((data) => {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        

        console.log(tempDiv);
        GoogleSheetOnline(tempDiv, (_sheetobj) => {
            console.log(_sheetobj)
        })

    });
