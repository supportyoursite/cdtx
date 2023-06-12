function initLoad() {

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

    function setStorage(_key, datainput){
        if(typeof datainput === 'object') {
            datainput = JSON.stringify(datainput);
        }
        
        // localStorage.setItem('qplus_lst_outsitelink', datainput)
        localStorage.setItem(_key, datainput)
    }


    function getStorage(_key){        
        var rs = localStorage.getItem(_key);
        try {
            return JSON.parse(rs);
        } catch (error) {
            return rs;
        }
    }


    // them vao list localStorage
    function qplusActionByParam() {
        let params = new URLSearchParams(location.search);
        let updateParam = (callback) => {
            var url = new URL(location.href);
            // url.searchParams.set('x', 42);
            // url.searchParams.delete('x');
            callback(url);
            history.replaceState(null, '', url)
        }

        var initstart = params.get('initstart'); 
        if(initstart) {
            // debugger;

            initStart();

            updateParam((url) => {
                url.searchParams.delete('initstart');
            })
        }


        var isclickopen = params.get('qlusact_click_flow'); 
        if(isclickopen) {
            var dqAction = function(n_time) {
                document.querySelectorAll('[data-workflow-index][jsaction]').forEach((elm) => {
                    if (elm.innerText.includes('Technical Solutions Case Update')) {
                        elm.click();
                        var _parent = elm.parentElement;
            
                        var _oneTime = setInterval(() => {
                            if (_parent.querySelectorAll('[data-isadmin]').length > 0) {
                                n_time = 4
                                clearInterval(_oneTime);
                            }
                        }, 500);
                    }
                }); 

                if(!(n_time < 4)) {
                    return false;
                }

                setTimeout(() => {
                    n_time = n_time + 1;
                    if(n_time < 4) {
                        dqAction(n_time);
                    }
                        
                }, 2000);
            }
            dqAction(0);
        }
    }

    // Libs
    var issetByKeyOnce = function(keyonce) {
        window.qlus_detail_list_case = window.qlus_detail_list_case || [];
        for (let index = 0; index < window.qlus_detail_list_case.length; index++) {
            const item = window.qlus_detail_list_case[index];
            if(item.keyonce === keyonce) {
                return false;
                break;
            }
        }
        return false;
    }
    var proccesCase = function() {
        var _lstcaseid = {};
        // window.qlus_detail_list_case.forEach((item, i) => {
        //     if(_lstcaseid[item.caseID]) {
        //         _lstcaseid[item.caseID].push(item)
        //     } else {
        //         _lstcaseid[item.caseID] = [item];
        //     }
        // })

        // Remove duplicate by key
        var _lst2 = _lst.filter((item, pos, self) => self.findIndex(v => v.key === item.key) === pos);
        
        console.log('proccesCase', window.qlus_detail_list_case);
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

    var TaskOwner = (_step, dom_body = document) => {


        if(_step === 'qpluslst-getlst') {

            // Step 2: 
            var _list_case = [];
    
            var dom_body = dom_body;
            dom_body.querySelectorAll(`[jsaction="click: qOOoce"]`).forEach((elm3) => {
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
    
    
                    var keyonce = item.caseID + item.dateReview;
                    if(issetByKeyOnce(keyonce)) {
                        window.qlus_detail_list_case.push({
                            'keyonce': keyonce,
                            'item': item
                        });        
                    }
                    
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
    
    }

    var initStart = () => {
        if(getStorage('qlus_lststorage')) {
            
        }
        var _homeurl = 'https://gauge.corp.google.com/?qlusact_click_flow=1';
        _loadurlqplus(_homeurl, 'home', '[data-workflow-index][jsaction]', (frameContentObj) => {

            console.log("QPlus - OK 1 - GET LINK");
            
            frameContentObj.querySelectorAll('[data-workflow-index][jsaction]').forEach((elm) => {
                
                var _parent = elm.parentElement;
        
                var _n_oneTime = 0
                var _oneTime = setInterval(() => {
                    if (_parent.querySelectorAll('[data-isadmin]').length > 0) {
    
                        var _i = 0;
                        var _nodup = [];

                        console.log("QPlus - OK 2 - GET LINK")

                        _parent.querySelectorAll('[data-isadmin]').forEach((elm2) => {
                            var _link = elm2.querySelector('a').getAttribute('href'),
                                _linkscan = 'https://gauge.corp.google.com' + _link + '?id=0&dateRangeField=1&timeRangeType=Last+7+days';    
                            _i++;
                        });
    
                        clearInterval(_oneTime);
                    }

                    if(_n_oneTime > 6) {
                        clearInterval(_oneTime);
                        console.log("QPlus - STOP")
                    }
                    _oneTime++;
                }, 1000);

            });
        })
    }
        
    // if(_ncout > 0) return; _ncout++;
        
        // console.log("123123", item, item.linkEvaluationDetails);
        
        
    // })

    // Search
    // var str_search = "1-1248000034254";
    // var rs_lst_search = [];
    // _list_case.forEach(function(item){
    //     if(item.caseID === str_search && item.caseIDInner === str_search) {
    //         rs_lst_search.push(item);
            
    //     }
    // })

    // rs_lst_search
    qplusActionByParam();
}

initLoad();