// click and beforeunload
var _once = 0;
jQuery(document).on("click", '[name="form[guingay]"], [name="form[guingay]"] *', function(){
    var _formparent = jQuery(this).closest("form");
    if(_once == 0) {
        _once++;
         jQuery(window).on('beforeunload', function(){
             console.log("ACtION")
              dataLayer.push({
                    event: "123123"
              })
        });
    }    
});