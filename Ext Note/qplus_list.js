function initLoad(_step) {

    // _TrustScript
    function _TrustScript(_string) {
        const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', { createHTML: () => _string });
        return staticHtmlPolicyv2.createHTML('');
    }

    // them vao list localStorage
    var _updateQplusCaseIDTimeReview = function(strKey) {
        strKey = strKey.toString();
        var _lstitem = localStorage.getItem('dr_itemslst') || false;
        var _lstarr = _lstitem ? _lstitem.split("//") : [];
        if(!_lstarr.includes(strKey)) {
            _lstarr.push(strKey);
        
            var _rs = _lstarr.join("//");
            localStorage.setItem("dr_itemslst", _rs);
        }
    }

    // Libs
    var proccesCase = function() {
        var _lstcaseid = {};
        window.qlus_detail_list_case.forEach((item, i) => {
            if(_lstcaseid[item.caseID]) {
                _lstcaseid[item.caseID].push(item)
            } else {
                _lstcaseid[item.caseID] = [item];
            }
        })
        
        console.log('proccesCase', proccesCase);
    }

    // Libs
    var _loadurlqplus = function (url_file, _index, elm_query, _callback) {
        var frameID = '_detail_' + _index;
        var _str_iframe = '<iframe src="' + url_file + '" id="' + frameID + '" style="width: 1600px; height: 768px; transform: scale(.3); position: absolute; left: 0; top: 0; opacity: 1; pointer-events: none;"></iframe>';
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


                        // 1 Stop
                        clearInterval(myTime);
                        frameObj.remove();

                        // 2 Load callback
                        if (parseInt(_number) > 0) {
                            // LOAD UI
                            console.log("callback")

                            _callback(frameContentObj)
                        }
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


    if(_step === 'qpluslst-getlst') {

        // Step 2: 
        var _list_case = [];


        document.querySelectorAll(`[jsaction="click: qOOoce"]`).forEach((elm3) => {
        // frameContentObj.querySelectorAll(`[jsaction="click: qOOoce"]`).forEach((elm3) => {
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


                // Link detail
                _elmTask.linkEvaluationDetails = 'https://gauge.corp.google.com' + _parentElm.querySelector('.XaulGe .FkE4Ef').getAttribute('href');

                var _regex = /[0-9]{1}[-][0-9]{13}/g;
                _string = _regex.exec(_elmTask.caseID);
                if (_string[0]) {
                    _elmTask.caseID = _string[0];

                    // Review case Time
                    if (_dateReviewElm) {
                        _dateReview_string = _dateReviewElm.innerText.replace("Reviewed at", "");
                        _elmTask.dateReview = _dateReview_string;
                    } 

                    
                    // Push
                    _list_case.push(_elmTask);
                }
            }
        });

        window.qlus_list_case = _list_case;
        
        initLoad('qpluslst-getdetail')
    }



    if(_step === 'qpluslst-getdetail') {
        // Step 3
        // Loop get detail
        var _ncout = 0;
        var _n_step_done = 1;
        var _list_case = window.qlus_list_case;
        window.qlus_detail_list_case = window.qlus_detail_list_case || [];
        

        var _tempLstCase = {};
        var _tempLstCaseArr = [];
        var dquiLoadCase = (_index) => {
            var item = _list_case[_index];
            _loadurlqplus(item.linkEvaluationDetails, _index, '.uzMjAe', (frameContentObj) => {
                console.log("CDTX", _n_step_done + "/" + _list_case.length, _list_case[_index]); 
                _n_step_done++;

                // Case ID
                if(frameContentObj.querySelector('[href*="/#/case/"]')) {
                    _list_case[_index].caseIDInner = frameContentObj.querySelector('[href*="/#/case/"]').innerText;
                }

                frameContentObj.querySelectorAll('.uzMjAe').forEach((_elminframe) => {
                    
                    // // Sub-Status
                    if (_elminframe.innerText.includes('Sub-Status')) {
                        console.log("Sub-Status", _elminframe.querySelector('.FEZIwd').innerText);
                        _list_case[_index].statusCase = _elminframe.querySelector('.FEZIwd').innerText;
                    }

                    // // Follow up date
                    if (_elminframe.innerText.includes('Follow up date')) {
                        var _dateformat = _elminframe.querySelector('.FEZIwd').innerText;

                        if (/^\d\d\/\d\d\/\d\d\d\d$/.test(_dateformat)) {

                            _list_case[_index].followUpCase = _dateformat;

                        }
                    }

                });

                window.qlus_detail_list_case[_index] = item;

                _index++;
                console.log(_index);

                // Stop by manual
                if(_index > 2) {
                    proccesCase()
                    return false;
                }


                if(_index < _list_case.length) {
                    dquiLoadCase(_index);
                } else {
                    proccesCase();
                    return false;
                }

            });


        }
        
        dquiLoadCase(0);
    }


    if(_step === 'qpluslst-process-detail') {
        
    }
        
    // if(_ncout > 0) return; _ncout++;
        
        // console.log("123123", item, item.linkEvaluationDetails);
        
        
    // })

    // Search
    var str_search = "1-1248000034254";
    var rs_lst_search = [];
    _list_case.forEach(function(item){
        if(item.caseID === str_search && item.caseIDInner === str_search) {
            rs_lst_search.push(item);
            
        }
    })

    rs_lst_search
}

initLoad('qpluslst-getlst');