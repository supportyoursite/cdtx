function _apiSend4Site(_callback_beforesend) {
    function _xHrComplete(_callback) {
        try {
            var s_ajaxListener = new Object();
            s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
            s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
            s_ajaxListener.callback = function () {
                // this.method :the ajax method used
                // this.url    :the url of the requested script (including query string, if any) (urlencoded) 
                // this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)
                
                var object = {};
                if(typeof this.data == 'object') {
                    this.data.forEach(function (value, key) {
                    if(typeof key != 'number') {
                        object[key] = value;
                    }
                        
                    });
                } else {
                    object = this.data;
                }

                var size = Object.keys(object).length;
            
            if(size > 250) {
                object = "overload_data";
                }
            
                var _data_response = {
                    "location": window.location,
                    "urlrequest": this.url,
                    "method": this.method,
                    "formDataInput": object,
                }
                
                // For JSON            
                try {
                    if(typeof object === 'string') {
                        if(object.includes('{') && object.includes('}')) {
                            object = JSON.parse(object);
                            _data_response.formDataInput = object;
                        }
                    }
                } catch (error) {
                    
                }

                // For paramater
                try {
                    if(typeof object === 'string') {
                        if(object.includes('=')) {
                            var params = new URLSearchParams(object);
                            var entries = params.entries();
                            var listdata = Object.fromEntries(entries);
                            
                            // List
                            Object.keys(listdata).forEach(function(_key) {
                                _value = listdata[_key];

                                // params
                                if(_value.includes('=')) {
                                    var params = new URLSearchParams(_value);
                                    var entries = params.entries();
                                    var conversion = Object.fromEntries(entries);
                                    listdata[_key] = conversion;
                                }

                                // JSON
                                if(_value.includes('{') && _value.includes('}')) {
                                    var conversion = JSON.parse(_value);
                                    listdata[_key] = conversion;
                                }
                            });
                        
                            _data_response.formDataInput = listdata;
                            
                        }
                    }
                } catch (error) {
                    
                }
                

                _callback(_data_response);
            }




            XMLHttpRequest.prototype.open = function (a, b) {
                if (!a) var a = '';
                if (!b) var b = '';
                s_ajaxListener.tempOpen.apply(this, arguments);
                s_ajaxListener.method = a;
                s_ajaxListener.url = b;
                if (a.toLowerCase() == 'get') {
                    s_ajaxListener.data = b.split('?');
                    s_ajaxListener.data = s_ajaxListener.data[1];
                }

            }



            XMLHttpRequest.prototype.send = function (a, b) {
                if (!a) var a='';
                if (!b) var b='';
                s_ajaxListener.tempSend.apply(this, arguments);
                if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
                s_ajaxListener.callback();
            }

            
        } catch (error) {
            console.log("ERROR xHR", e);
        }
        
        
        

        // ========
        // FETCH
        // ========
        try {

            (function (ns, fetch) {
                var _key_start = 0;
                if (typeof fetch !== 'function') return;
                ns.fetch = function () {
                    _key_start++;
                    var _out = [];
                    _out[0] = fetch.apply(this, arguments);
        
                    var _formData = [];
        
        
                    if (arguments[1]) {
                        if (arguments[1].body) {
                            _formData = arguments[1].body;
                            _out[1] = _formData;
                        }
                    }
        
        
                    // get response
                    // side-effect
                    _out[0].then(function (_ref) {
                        var _responses_data = {
                            "ok": _ref.ok,
                            "url": _ref.url,
                            "status": _ref.status,
                            "redirected": _ref.redirected,
                        };
        
                        // formData
                        // _responses_data.formDataInput
                        if (_out[1]) {
                            var object = {};
                            _out[1].forEach(function (value, key) {
                                object[key] = value;
                            });
        
                            _responses_data.formDataInput = object;
                        }
        
                        return _callback(_responses_data);
                    });
                    return _out[0];
        
                };
            })(window, window.fetch);
        } catch (e) {
            console.log("ERROR fetch", e);
        }
    }


    

    _xHrComplete(function (_response) {
        if (_response) {
            var _object_dl = {
                "event": "apiSend",
                "attributes": _response 
            };


            _object_dl = _callback_beforesend(_object_dl);
            
            dataLayer.push(
                _object_dl
            );
        }
    })
}


_apiSend4Site(function(_object_dl){
    // GET EMAIL
    jQuery(document).on('click', '[name="sendbutton"]', function () {
        var _form = jQuery(this).closest('form');
        _email = _form.find('[data-field_type="email"]').val()
    });

    return _object_dl;
})