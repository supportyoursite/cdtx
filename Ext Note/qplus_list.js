//
// url demo: https://gauge.corp.google.com/reports/afffa910-23c5-440e-8896-7e794cc3b450/989136c7-87f6-46f6-b8bc-448940f7c5ec/6d45b3c6-c6b1-41f1-b9be-e83579353634?id=0&dateRangeField=1&timeRangeType=Last+7+days&startTime=Mar+16%2C++2023&endTime=Mar+22%2C++2023

function _convertDateCustom(_str_input, style=1) {
    // Mar 6, 2023, 3:14 PM GMT+8

    _str_input = _str_input.trim();
    _str_input = _str_input.replace("  ", " ");
    var _str_input_arr = _str_input.split(" ");
    var _listshortmonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var _m = _listshortmonth.findIndex((_month) => {
        return _month === _str_input_arr[0];
    });

    var _d = parseInt(_str_input_arr[1]);

    var _y = parseInt(_str_input_arr[2]);

    var _time = _str_input_arr[3];

    var _sangorchieu = _str_input_arr[4];

    var _format =
        ("0" + _d).slice(-2) + "/" +
        ("0" + (_m + 1)).slice(-2) + "/" +
        _y + " " +
        _time + " " +
        _sangorchieu + " " +
        _str_input_arr[5];

    if(style === 2) {
        _format =
        _y +
        ("0" + (_m + 1)).slice(-2) +
        ("0" + _d).slice(-2) + 
        _time
    }

    return _format;
}


var _listcase = [];
document.querySelectorAll(`[jsaction="click: qOOoce"]`).forEach((elm3) => {
    if (elm3.innerText.includes('View Evaluation Details')) {


        var _parentElm = elm3.parentElement;
        var _dateReviewElm = _parentElm.querySelector('.mh4JWc'),
            _dateReview_string = '',
            _elmTask = {
                caseID: '',
                caseIDInner: '',
                dateReview: '',
                dateReviewCompare: '',
                linkEvaluationDetails: '',
                statusCase: '',
                followUpCase: '',
            };

        // CaseID
        _elmTask.caseID = _parentElm.querySelector('.YIWTkd').innerText;


        // Link detail
        _elmTask.linkEvaluationDetails = 'https://gauge.corp.google.com' + _parentElm.querySelector('.XaulGe .FkE4Ef').getAttribute('href');

        var _regex = /[0-9]{1}[-][0-9]{13}/g;
        _string = _regex.exec(_elmTask.caseID);
        if (_string[0]) {
            _elmTask.caseID = _string[0];
        }

        // Review case Time
        if (_dateReviewElm) {
            _dateReview_string = _dateReviewElm.innerText.replace("Reviewed at", "");
            _elmTask.dateReview = _convertDateCustom(_dateReview_string);
            _elmTask.dateReviewCompare = _convertDateCustom(_dateReview_string, 2);
        }
        _listcase.push(_elmTask);
    }
});

console.log(_listcase)