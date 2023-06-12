function d_load_script(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function () {
      callback();
    };
  }
  const staticUrlPolicy = trustedTypes.createPolicy("foo-js-static", {
    createScriptURL: function() {
        url
    },
  });
  script.src = staticUrlPolicy.createScriptURL("");
  document.getElementsByTagName("head")[0].appendChild(script);
}
var _timenow = Date.now();

d_load_script("https://cdtx.lyl.vn/_eec-dominos.js", function () {});
