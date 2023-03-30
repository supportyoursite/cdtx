// jQuery

// 1. click and beforeunload, without submit form listen
var _once = 0;
jQuery(document).on("click", '[name="form[guingay]"], [name="form[guingay]"] *', function(){
    var _formparent = jQuery(this).closest("form");
    if(_once == 0) {
				// _formparent.on("submit", function(){

          _once++;
           jQuery(window).on('beforeunload', function(){
               console.log("ACtION")
                dataLayer.push({
                      event: "123123"
                })
          });

        // }
    }
});


// This Form for submit event
var _once = 0;
jQuery(document).on("click", '[value="wpforms-submit"], [value="wpforms-submit"] *', function(){
    var _formparent = jQuery(this).closest("form");
    if(_once == 0) {
     _formparent.on("submit", function(){
        
        _once++;
         jQuery(window).on('beforeunload', function(){
              dataLayer.push({
                    event: "123123"
              })
        });
     });
    }    
});


    // EC form
    var _once = 0;
    var _once_dl = 0;
    jQuery(document).on("click", '[value="wpforms-submit"], [value="wpforms-submit"] *', function(){
        var _formparent = jQuery(this).closest("form");
        if(_once == 0) {
        _formparent.on("submit", function(){
            _once++;

            // Required email for form
            if(_formparent.find('[type="email"]').length) {
                var _email = _formparent.find('[type="email"]').val();
                if(_email.indexOf('@') >= 0) {
                    jQuery(window).on('beforeunload', function(){
                        if(_once_dl === 0) {
                            _once_dl++;
                            dataLayer.push({
                                event: "wpformsubmit"
                            });
                            console.log(13123132);                              
                        }
                    });
                }
                
            } 
            
        });
        }    
    });

