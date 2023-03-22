`
.dongdeptrai {
    display: flex;
    flex-direction: column
}
.dongdeptrai > div {
    padding: 10px;
    font-size: 12px;
    border-left: 7px solid #ccc;
}

.dongdeptrai > div [data-title] {
    display: block;
}

.dongdeptrai > div [data-title]:before {
    content: attr(data-title) " ";
}


.dongdeptrai [data-status*="NI - "][data-fldate="Warning"] {
    order: 1;
    opacity: 0.8;
    background: #FF5722;
    color: #fff;    
}

.dongdeptrai [data-status*="IN - "] {
    order: 2;
    opacity: 0.1;
    background: #000;
    color: #fff;
}

.dongdeptrai [data-status*="DC - "] {
    order: 3;
    opacity: 0.1;
    background: #333;
    color: #fff;
}

.dongdeptrai [data-status*="SO - "] {
    order: 4;
    opacity: 0.3;
    background: green;
    color: #fff;
}
`

function QplusOverview() {

    
    function _TrustScript(_string) {
        const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', { createHTML: () => _string });
        return staticHtmlPolicyv2.createHTML('');
    }
    

    // dd/mm/yyyy -> yyyy-mm-dd
    function _changeFormatDate(_stringDate) {
        var _rs = _stringDate.split("/");
        return `${_rs[2]}-${_rs[1]}-${_rs[0]}`;
    }
    
    function _convertDateCustom(_str_input) {
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
    
        return _format;
    }
    
    var _loadurlqplus = function (url_file, frameID, elm_query, _callback) {
        var _str_iframe = '<iframe src="' + url_file + '" id="' + frameID + '" style="width: 1600px; height: 768px; transform: scale(.3); position: absolute; left: 0; top: 0; opacity: 0; pointer-events: none;"></iframe>';
        _str_iframe = _TrustScript(_str_iframe);
        document.body.insertAdjacentHTML("beforeEnd", _str_iframe);
    
    
        var _temp_memory = sessionStorage || localStorage;
        var _number = 0;
        var _date_key = [
            new Date().getFullYear(),
            ("0" + new Date().getMonth()).slice(-2),
            ("0" + new Date().getDate()).slice(-2),
            ("0" + new Date().getHours()).slice(-2),
            ("0" + new Date().getMinutes()).slice(-2),
        ];
    
        // Frame
        const iframe = document.getElementById(frameID);
        const handleLoad = () => {
            var nTime = 0;
            var myTime = setInterval(function () {
                // console.log("ID: "+ frameID);
                var frameObj = document.getElementById(frameID);
                if (frameObj) {
                    var frameContent = frameObj.contentWindow.document.documentElement.outerHTML || frameObj.contentWindow.document.body.innerHTML;
                    var frameContentObj = frameObj.contentWindow.document.documentElement || frameObj.contentWindow.document.body;
    
                    var _elms_id_sumary = frameContentObj.querySelectorAll(elm_query);
    
                    var _isfinish = false;
                    if (_elms_id_sumary.length) {
                        _isfinish = true;
                    }
    
    
                    if (_isfinish) {
                        console.log("finish frame id: " + frameID)
    
                        _number = _elms_id_sumary.length;
    
                        if (parseInt(_number) > 0) {
                            // LOAD UI
                            console.log("callback")
    
                            _callback(frameContentObj)
                        }
    
                        // Stop
                        clearInterval(myTime);
                        frameObj.remove();
                    }
                    // } else {
                    //     console.log("tao lai frame ID: " + frameID)
    
                    //     var _str_iframe = '<iframe src="' + url_file + '" id="' + frameID + '" style="width: 1600px; height: 768px; transform: scale(.3); position: absolute; left: 0; top: 0; opacity: 0; pointer-events: none;"></iframe>';
                    //     _str_iframe = _TrustScript(_str_iframe);
                    //     document.body.insertAdjacentHTML("beforeEnd",_str_iframe);
                }
    
    
                // 10s
                if (nTime > 20) {
                    console.log("stop 10s");
                    frameObj.remove();
                    clearInterval(myTime);
                }
                nTime++;
            }, 2000);
    
    
        };
    
        iframe.addEventListener('load', handleLoad, true);
    
    }
    
    // _loadurlqplus('https://gauge.corp.google.com/', 'c1', '[data-workflow-index][jsaction]', function(frameContentObj){
    //     console.log("html", frameContentObj);
    //     document.querySelectorAll('[data-workflow-index][jsaction]').forEach((elm) => {
    //         if(elm.innerText.includes('Technical Solutions Case Update')) {
    //             elm.click();
    
    //             setTimeout(() => {
    
    //             }, )
    //         }      
    //     })
    // });
    var _loadStyle = (_keyCaseID) => {
    
        var _itemstr = '';

        var _status_by_fldate = '';
        if(_keyCaseID.followUpCase) {
            var _date_now = [
                new Date().getFullYear(),
                ("0" + (new Date().getMonth() + 1)).slice(-2),
                ("0" + new Date().getDate()).slice(-2),
            ]

            var _date_now_all = parseInt(_date_now.join(''));
            var _fldatenext = parseInt(_changeFormatDate(_keyCaseID.followUpCase).replace(/-/g, ""));

            _status_by_fldate = "OK";
            if((_fldatenext - _date_now_all) < 2) {
            _status_by_fldate = "Warning"
            }
            
            
            if((_fldatenext - _date_now_all) < 0) {
            _status_by_fldate = "ERROR"
            }
            
            console.log(_status_by_fldate);            
        }
        _itemstr += `<div data-status="${_keyCaseID.statusCase}" data-fldate="${_status_by_fldate}" >
            <span data-title="ID:">${_keyCaseID.caseID}</span>
            <span data-title="Status:">${_keyCaseID.statusCase}</span>
            <span data-title="Create:">${_keyCaseID.dateReview}</span>
            ${_keyCaseID.followUpCase ? `<span data-title="FL: ">` + _keyCaseID.followUpCase + `</span>` : `` }
        </div>`;
    
        var _html = `<div class="godt5c i3L5Pb dongdeptrai"></div>`;
        _html = _TrustScript(_html);
    
        if(!document.querySelector('.D9Jevb .dongdeptrai')) {
            document.querySelector('.D9Jevb').insertAdjacentHTML("afterBegin", _html);
        } 
        
        _itemstr = _TrustScript(_itemstr);
        document.querySelector('.dongdeptrai').insertAdjacentHTML("beforeEnd", _itemstr);
        
    }
    
    var _callBackProccess = (frameContentObj, _nodup) => {
        // console.log("html", frameContentObj);

        var _nodup_chk = function (_value) {
                var _is_hasdup = false;
                _nodup.forEach((_item) => {
                    if (_item.includes(_value)) {
                        _is_hasdup = true
                    }
                });

                if (!_is_hasdup) {
                    _nodup.push(_value);
                    return true;
                }

                return false;
            };

        frameContentObj.querySelectorAll(`[jsaction="click: qOOoce"]`).forEach((elm3) => {
            if (elm3.innerText.includes('View Evaluation Details')) {


                var _parentElm = elm3.parentElement;
                var _dateReviewElm = _parentElm.querySelector('.mh4JWc'),
                    _dateReview_string = '',
                    _elmTask = {
                        caseID: '',
                        caseIDInner: '',
                        dateReview: '',
                        linkEvaluationDetails: '',
                        statusCase: '',
                        followUpCase: '',
                    };

                // CaseID
                _elmTask.caseID = _parentElm.querySelector('.YIWTkd').innerText;


                if (_nodup_chk(_elmTask.caseID)) {
                    console.log(_elmTask.caseID, _nodup_chk(_elmTask.caseID))
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
                    }

                    // Before load frame

                    // Load frame
                    _loadurlqplus(_elmTask.linkEvaluationDetails, 'c' + _elmTask.caseID, '.uzMjAe',  (frameContentObj) => {
                        console.log("Start: " + _elmTask.caseID);

                        // Case ID
                        if(frameContentObj.querySelector('[href*="/#/case/"]')) {
                            _elmTask.caseIDInner = frameContentObj.querySelector('[href*="/#/case/"]').innerText;
                        }

                        frameContentObj.querySelectorAll('.uzMjAe').forEach((_elminframe) => {
                            
                            // // Sub-Status
                            if (_elminframe.innerText.includes('Sub-Status')) {
                                console.log("Sub-Status", _elminframe.querySelector('.FEZIwd').innerText);
                                _elmTask.statusCase = _elminframe.querySelector('.FEZIwd').innerText;
                            }

                            // // Follow up date
                            if (_elminframe.innerText.includes('Follow up date')) {
                                var _dateformat = _elminframe.querySelector('.FEZIwd').innerText;

                                if (/^\d\d\/\d\d\/\d\d\d\d$/.test(_dateformat)) {

                                    _elmTask.followUpCase = _dateformat;

                                }
                            }

                        });

                        console.log("HERE", _elmTask);

                        _loadStyle(_elmTask);

                    });






                }

            }
        })
    }
    
    var _keyCaseID = [];
    var myTime1 = setInterval(function () {
    
        if(document.querySelector('.dongdeptrai')) {
            document.querySelector('.dongdeptrai').remove();
        } 
    
        document.querySelectorAll('[data-workflow-index][jsaction]').forEach((elm) => {
            if (elm.innerText.includes('Technical Solutions Case Update')) {
                elm.click();
                var _parent = elm.parentElement;
    
                var _oneTime = setInterval(() => {
                    if (_parent.querySelectorAll('[data-isadmin]').length > 0) {
    
                        var _i = 0;
                        var _nodup = [];
                        _parent.querySelectorAll('[data-isadmin]').forEach((elm2) => {
                            var _link = elm2.querySelector('a').getAttribute('href'),
                                _linkscan = 'https://gauge.corp.google.com' + _link + '?id=0&dateRangeField=1&timeRangeType=Last+7+days';
                            _loadurlqplus(_linkscan, 'c' + _i, '[jsaction="click: qOOoce"]', () => {
                                _callBackProccess(frameContentObj, _nodup);
                                
                                console.log("st1")
                                _linkscan = 'https://gauge.corp.google.com' + _link + '?id=0&dateRangeField=1&timeRangeType=Last+14+days';
                                _loadurlqplus(_linkscan, 'c' + _i, '[jsaction="click: qOOoce"]', () => {
                                    console.log("st2")
                                    _callBackProccess(frameContentObj, _nodup);
                                });
                            });


    
                            _i++;
                        });
    
                        clearInterval(_oneTime);
                    }
    
    
                }, 1000);
    
                clearInterval(myTime1)
            }
        });
    
    }, 1000);
        
}
QplusOverview();

