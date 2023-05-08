https://adwords.corp.google.com/aw/internal/search?ocid=0&__awid=269-475-6195
// css
[data-ads_wait1m]:after {
    content: attr(data-ads_wait1m);
    position: absolute;
    background: #ffffffe0;
    width: 100%;
    height: 100%;
    z-index: 99999999;
    font-size: 30px;
    font-family: monospace;
    text-shadow: 2px 3px 3px #ccc;
    text-align: left;
    display: flex;
    line-height: 1.3;
    padding-top: 10%;
    padding-left: 28px;
    color: #333;
}

// javsacript
var queryString = window.location.search;
console.log(queryString);
var urlParams = new URLSearchParams(queryString);
var __awid = urlParams.get('__awid')
if(__awid) {
    var _arr = [
        'Make things simple...',
        'Like a street light illuminating your heart...',
        'Drink water today',
        'Exercise to improve health',
        'Earth is round...',
        'If tomorrow was the end, what would you do today? ...',
        'I got lost in the forest today, but I found the way out...',
        'You are one of the most amazing people in the world ...',
    ];

    const random = Math.floor(Math.random() * _arr.length);
    document.body.setAttribute('data-ads_wait1m',"wait a minute!!! " + _arr[random]);
    setTimeout(() => {
        document.body.removeAttribute('data-ads_wait1m');
    }, 10000);

    var _inputsearch = document.querySelector('menu-suggest-input input.search-box');
    _inputsearch.value = __awid;
    _inputsearch.dispatchEvent(new Event('input'));
    _inputsearch.dispatchEvent(new Event('keypress'));
    _inputsearch.dispatchEvent(new KeyboardEvent("keypress", {keyCode: 13,which: 13,}));
}
