var _n = 0;
var _lst_left = ['0(\\d+)',
'\\840(\\d+)',
'\\(\\+84\\)0(\\d+)\\s(\\d+)\\s(\\d+)',
'\\(\\+84\\)(\\d+)',
'\\+840(\\d+)',
'\\+84(\\d+)',
'(\\+0)\\s([()])\\d+([()])\\s\\d+-\\d+',];

var _lst_right = ['84$1',
'84$1',
'84$1$2$3',
'84$1',
'84$1',
'84$1',
'84$1',];
document.querySelectorAll('vt-simple-table .vt-simple-table-md [data-ng-repeat*="row"] > div:nth-child(1) input').forEach((item) => {
    item.value = _lst_left[_n];
    _n++;

    item.dispatchEvent(new Event('input'));
    item.dispatchEvent(new Event('enter'));
    item.dispatchEvent(new Event('change'));
    
});

_n = 0;
document.querySelectorAll('vt-simple-table .vt-simple-table-md [data-ng-repeat*="row"] > div:nth-child(2) input').forEach((item) => {
    item.value = _lst_right[_n];
    _n++;
    
    item.dispatchEvent(new Event('input'));
    item.dispatchEvent(new Event('enter'));
    item.dispatchEvent(new Event('change'));
});

