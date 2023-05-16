
// 7:45 === 7:75
// 60 = 100
// 30 = 50


function timeLeftGoogleCalendar() {

    // _TrustScript
    if(typeof _TrustScript !== 'function') {
        function _TrustScript(_string) {
            const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', { createHTML: () => _string });
            return staticHtmlPolicyv2.createHTML('');
        }
    }




    // Stop if ready
    var drawerMiniMonthNavigatorElm = document.querySelector('#drawerMiniMonthNavigator');
    // if(drawerMiniMonthNavigatorElm) return false;
    
    var calendar_tablist = document.querySelector(`[role="tablist"]`);
    var btn_reminder = () => {
        return calendar_tablist.querySelector('.panel_info-btnrunremide');
    };
    if(btn_reminder()) return false;
    
    debugger;
    
    if(calendar_tablist) {
        if(!btn_reminder()) {
            var btn_reminder_html = `
            <style>
                .panel_info-btnrunremide.active .panel_info-btnrunremide-inner {
                    box-shadow: inset 0 0 10px #2196F3;
                }
            </style>
            <div id="gsc-gab-999" class="panel_info-btnrunremide DWWcKd-OomVLb-LgbsSe" data-guest-app-id="999" role="tab" aria-label="remide" aria-selected="false" style="user-select: none;" > <div class="panel_info-btnrunremide-inner DWWcKd-OomVLb-LgbsSe-Bz112c-haAclf" style='background-image: url("https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png"); user-select: none;' ></div> </div>`;
            calendar_tablist.insertAdjacentHTML('afterBegin', _TrustScript(btn_reminder_html));
            
        }

    }

    // === SETUP
    var IS_DEBUG = localStorage.getItem('dongtest');


    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        return `${hours > 0 ? `${hours}h`: ""}${minutes > 0 ? ` ${minutes}m` : ""}`;
    }
    


    function templateShow(_data) {
        if(IS_DEBUG) {
            console.log(_data);    
        }

        if(drawerMiniMonthNavigatorElm) {
            var _contentsub = '', _contentsub_item = '';
            _data.forEach(item => {
                _contentsub_item += `<p><a href="https://cases.connect.corp.google.com/#/case/${item.caseid}" target="_blank"  style=" color: #2196F3; " >${item.caseid}</a>: <span class="hour">${toHoursAndMinutes(item.timeleft)}</span> left</p>`
            });

            _contentsub = `<span class="panel_info-casesoverview"><span>${_data.length}</span> case</span>
            <div class="panel_info-inner" >
                ${_contentsub_item}
            </div>`;

            var _tempHtml = `
            <style>
                .panel_info {
                    position: fixed;
                    bottom: 5px;
                    right: 10px;
                    z-index: 9999;
                    background: white;
                    opacity: 0.7;
                    /* pointer-events: none; */
                    border-radius: 10px;
                    box-shadow: 0 0 10px #ccc;
                    padding: 12px;
                    border: 1px solid #666;
                }
                
                .panel_info span.hour {
                    font-size: 142%;
                    font-weight: bold;
                    display: inline-block;
                }
                
                .panel_info p {
                    margin: 0;
                }

                .panel_info-casesoverview {
                    height: 40px;
                    width: 40px;
                    display: flex;
                    position: absolute;
                    background-color: #fff;
                    border: 1px solid #666;
                    border-radius: 50%;
                    color: #000;
                    justify-content: center;
                    align-items: center;
                    left: -20px;
                    top: -30px;
                    font-weight: bold;
                    flex-direction: column;
                    font-size: 71%;
                    line-height: 1;
                    left: 50%;
                    transform: translateX(-50%);
                }
                
                .panel_info-casesoverview > span {
                    font-size: 200%;
                }
            </style>
            <div class="panel_info" >
                ${_contentsub}
            </div>`;
            
            if(!document.querySelector('.panel_info')) {
                drawerMiniMonthNavigatorElm.insertAdjacentHTML("afterEnd", _TrustScript(_tempHtml))
            } else {
                document.querySelector('.panel_info').innerHTML = _TrustScript(_contentsub);
            }
        }
    }

    // Đã có trong libs.js
    if(typeof getOnlyCaseId !== 'function') {
        function getOnlyCaseId(_string) {
            try {
                var _regex = /[0-9]{1}[-][0-9]{13}/g;
                _string = _regex.exec(_string);
                if (_string[0]) {
                    return _string[0];
                }
                return false;
            } catch (error) {
                return false;
                console.error(error);
            }
            return false;
        }
    }

    // getMeetID
    // lấy meetID
    function getMeetID(_string) {
        try {
            var _regex = /[0-9a-z]{3}[-][0-9a-z]{4}[-][0-9a-z]{3}/g;
            _string = _regex.exec(_string);
            if (_string[0]) {
                return _string[0];
            }
            return false;
        } catch (error) {
            return false;
            console.error(error);
        }
        return false;
    }

    // convertPostion2Time
    // chuyển position thành định dạng thời gian
    function convertPostion2Time(_time_position) {
        
        var _convert = (_time_position % 1) * 60 / 100;
        
            _convert = _convert.toFixed(2) * 100;
            _convert = Math.round(_convert);
        var _timecasecurrent = parseInt(_time_position) + ":" + _convert;
        
        return _timecasecurrent;
    }


    // convertPostion2Minute
    // chuyển position thành dạng phút
    function convertPostion2Minute(_time_position) {
        
        var _convert = _time_position * 60 / 100;
        
            _convert = _convert * 100;
            _convert = Math.round(_convert);
        var _timecasecurrent = _convert;
        
        return _timecasecurrent;
    }

    // Chuyển postion thành thời gian số
    // time current: position * 24 giờ / chiều cao của tổng
    function convertPostion(_elm, _col) {
        
        var _pos_event_top = _elm.offsetTop;
        var _time_position = _pos_event_top * 24 / _col.offsetHeight;
        
        
        return _time_position;
    }

    function notificationCaseChrome(_caseid) {
        const options = {
            body: `${_caseid}`,
            dir: 'ltr',
        };
        const notification = new Notification('Notification', options);

        notification.onclick = function () {
            var _caseurl = 'https://cases.connect.corp.google.com/#/case/' + _caseid
            window.open(_caseurl);
        };
    }

    function calendarGetInfoRealtime() {
        var _cols = document.querySelectorAll('[role="presentation"] [role="row"] [data-principal-ids]');

        for (let i1 = 0; i1 < _cols.length; i1++) {
            const element = _cols[i1];
            // Nếu trong cột ngày có tồn tại kim thời gian thực => cột của ngày hiện tại
            if(element.querySelector('.H3tRZe')) {
                var _col = element;
                var _pos_events = _col.querySelectorAll("[data-eventid]"); 
                
                var _data = [];
                for (var index = 0; index < _pos_events.length; index++) {
                    var _elm = _pos_events[index];
                    
                    // Lấy case ID trong title
                    var _get_title = _elm.querySelector('.FAxxKc');
                    var _get_caseid = ''
                    if(_get_title) {
                    var _get_caseid = getOnlyCaseId(_get_title.innerText);
                    
                    }
                
                    // Lấy vị trí thanh realtime point
                    var _pos_realtime_elm = _col.querySelector('.H3tRZe');
                    var _pos_realtime_elm_time = 0;
                    if(_pos_realtime_elm) {
                    _pos_realtime_elm_time = convertPostion(_pos_realtime_elm, _col);
                    }
                
                
                    // 1. Nếu tồn tại Case ID
                    if(_get_caseid) {
                        var _timecasecurrent = convertPostion(_elm, _col);

                        // 1. Nếu tồn tại Google Meet ID  
                        var _jslog = _elm.getAttribute('jslog');
                        if(getMeetID(_jslog)) {
                            if(IS_DEBUG) {
                                console.log(convertPostion2Time(_pos_realtime_elm_time), convertPostion2Time(_timecasecurrent), _pos_realtime_elm_time, _timecasecurrent, _get_caseid,  getMeetID(_jslog));    
                            }
                            if(_timecasecurrent - _pos_realtime_elm_time > 0) {
                                var _minute_timeleft = convertPostion2Minute(_timecasecurrent - _pos_realtime_elm_time);
                                if(IS_DEBUG) { console.log("time minute left: ", _minute_timeleft); }
                                
                                var _temp_info = {
                                    'timeleft': _minute_timeleft,
                                    'caseid': _get_caseid,
                                };
                                _data.push(_temp_info);
                                if(_minute_timeleft < 6) {
                                    notificationCaseChrome(_get_caseid)
                                }
                                
                            }
                        }
                    }
                }


                templateShow(_data);
                

                // Tìm thấy nhau thì dừng lại và bỏ qua mọi thứ xung quanh;
                break;
            }
            
        }
    }


    // Run Once
    var _oncerun = 0;
    var _run = () => {
        if(_oncerun > 0) return false;
        _oncerun++;
        debugger
        calendarGetInfoRealtime();
        setInterval(() => {
            calendarGetInfoRealtime();
        }, 1000 * 60)
    }
    
    if(localStorage.getItem('show_calendarview')) {
        _run();
        btn_reminder().classList.add("active");
    }

    // click
    btn_reminder().addEventListener('click', function(e) {
        _run();

        if(e.target.classList.contains('active')) {
            localStorage.removeItem('show_calendarview');
        } else {
            localStorage.setItem('show_calendarview', 1);
        }

        e.target.classList.toggle('active')
    });
}

timeLeftGoogleCalendar();

debugger