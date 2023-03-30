function _xHrComplete(_callback) {
    var open = window.XMLHttpRequest.prototype.open,
        send = window.XMLHttpRequest.prototype.send,
        onReadyStateChange,
        formData,
        once_dl = 0;
        ;

    function openReplacement(method, url, async, user, password) {
        var syncMode = async !== false ? 'async' : 'sync';
        return open.apply(this, arguments);
    }

    function sendReplacement(data) {
        formData = data;

        if(this.onreadystatechange) {
            this._onreadystatechange = this.onreadystatechange;
        }
        this.onreadystatechange = onReadyStateChangeReplacement;

        return send.apply(this, arguments);
    }

    function onReadyStateChangeReplacement() {
        if(this.status == 200 && this.readyState == 4) {
            _callback(formData);
            once_dl++;
        }
        if(this._onreadystatechange) {
            return this._onreadystatechange.apply(this, arguments);
        }
    }

    window.XMLHttpRequest.prototype.open = openReplacement;
    window.XMLHttpRequest.prototype.send = sendReplacement;

}

_xHrComplete(function(formData){
    var _phone = formData.get('sdt');
    if(_phone) {
        dataLayer.push({
            "event": "forminfo_submit",
            "phone": _phone 
        })
    }
    var _phone2 = formData.get('dienthoai');
    if(_phone2) {
        dataLayer.push({
            "event": "forminfo_submit",
            "phone": _phone2 
        })
    }
})