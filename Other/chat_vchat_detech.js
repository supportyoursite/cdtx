<script>
    window.addEventListener('message', function(event) {
        var _host = event.origin;
        var _data = event.data;
        window.dataLayer = window.dataLayer || {}
        if(_host && _data) {
            if(_host.includes('core.vchat.vn')) {
                var _name = _data.name;
                var _title = _data.title;
                
                if(_name && _title) {
                    window.dataLayer.push({
                        "event": "vChat_listen",
                        "vchat_name": _name,
                        "vchat_title": _title,
                    })
                }
            }
        }
    });
</script>