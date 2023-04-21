
// 7:45 === 7:75
// 60 = 100
// 30 = 50

// Đã có trong libs.js
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
// position * 24 giờ / chiều cao của tổng
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

    var IS_DEBUG = localStorage.getItem('dongtest');
    for (let i1 = 0; i1 < _cols.length; i1++) {
        const element = _cols[i1];
        // Nếu trong cột ngày có tồn tại kim thời gian thực => cột của ngày hiện tại
        if(element.querySelector('.H3tRZe')) {
            var _col = element;
            var _pos_events = _col.querySelectorAll("[data-eventid]"); 
            
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
                            var _minute = convertPostion2Minute(_timecasecurrent - _pos_realtime_elm_time);
                            if(IS_DEBUG) { console.log("time minute left: ", convertPostion2Minute(_timecasecurrent - _pos_realtime_elm_time)); }
                            
                            if(_minute < 6) {
                                notificationCaseChrome(_get_caseid)
                            }
                            
                        }
                    }
                }
            }
            

            // Tìm thấy nhau thì dừng lại và bỏ qua mọi thứ xung quanh;
            break;
        }
        
    }
}

// run
setInterval(() => {
    calendarGetInfoRealtime();
}, 1000 * 60)