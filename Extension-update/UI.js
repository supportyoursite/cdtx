// set TrustScript chrome
function _trustScript (_string) {
    const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', {createHTML: () => _string}); 
    return staticHtmlPolicyv2.createHTML('');
}

function _barlist() {
    var _cardetail = document.body;
    var _item = ``;
    var _caseiddemo = [
        '8-9533000033625',
        '9-9069000033669',
        '7-6737000033311',
        '2-0436000033835',
        '2-7177000033836',
        '1-8562000033564',
        '5-2672000033457',
        '3-9192000034262',
        '5-3325000034109',
    ];
    var _caseid = '';
    for (let index = 0; index < _caseiddemo.length; index++) {
        _caseid = _caseiddemo[index];
        _item += `<a href="/#/case/${_caseid}" class="caselistbar_item" data-caseid="${_caseid}">
            <span class="caselistbar_caseid">${_caseid}</span>
            <span class="caselistbar_dateqplus">2${index}>/03/2023</span>
            <span class="caselistbar_webdomain">dongmai.deptrai</span>
            <span class="caselistbar_advname">Dong ${index}</span>
        </a>`;
    }
    var _htmlinner = `<caselistbar>${_item}</caselistbar>`;

    _htmlinner = _trustScript(_htmlinner);
    if(!_cardetail.querySelector('caselistbar')) {
        _cardetail.querySelector('card-deck').insertAdjacentHTML("beforeBegin", _htmlinner);
    } else {
        _cardetail.querySelector('caselistbar').remove();
        _cardetail.querySelector('card-deck').insertAdjacentHTML("beforeBegin", _htmlinner);
    }
}

_barlist();