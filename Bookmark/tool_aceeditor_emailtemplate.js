javascript:(function () {        
        
    function d_load_script(url, callback) {            var script = document.createElement("script");            script.type = "text/javascript";            if (script.readyState) {                script.onreadystatechange = function () {                    if (script.readyState == "loaded" || script.readyState == "complete") {                        script.onreadystatechange = null;                        callback();                    }                };            } else {                script.onload = function () {                    callback();                };            }            const staticUrlPolicy = trustedTypes.createPolicy(                "foo-js-static",                {createScriptURL: () => url});                                    script.src = staticUrlPolicy.createScriptURL("");;            document.getElementsByTagName("head")[0].appendChild(script);        }        var _timenow = Date.now();        
    
    d_load_script("https://cdnjs.cloudflare.com/ajax/libs/ace/1.18.0/ace.min.js", function () { 
        var ace = ace || false;
        if(ace) {
            if(!document.querySelector('#editor_email.ace_editor')) {
                const dom_editor = document.createElement("div");
                dom_editor.id = 'editor_email';
                dom_editor.className = 'editor_email';
                dom_editor.style.display = 'block';
                dom_editor.style.height = '600px';
                document.querySelector('material-input.case-summary-input').appendChild(dom_editor);

                var editor = ace.edit("editor_email");
                editor.setTheme("ace/theme/monokai");
                editor.session.setMode("ace/mode/html");

                editor.session.on('change', function(delta) {
                    
                    editor.getValue(); 
                    var _ebc = document.querySelector('.is-top .write-cards-wrapper:not([style*="none"]) .editor #email-body-content');

                    _ebc.innerHTML = editor.getValue();
                    replaceAllHtmlElement(_ebc, window.dataCase);

                });
            }
        }
    }); 
    })()