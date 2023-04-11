https://jsfiddle.net/dongmx/yfeu5pat/latest

document.addEventListener( 'wpcf7mailsent', function( event ) {
  var inputs = event.detail.inputs;

  var inpushObj = {
    "event": 'form_submission',
  };
  
  var emailObject = inputs.find(function(item){
    return item.name == 'email'; //name of phone input
  });


  var phoneObject = inputs.find(function(item){
    return item.name == 'tel-phone'; //name of phone input
  });

  if(phoneObject){
    inpushObj.phone = phoneObject.value;
  }
  
  if(emailObject){
    inpushObj.email = emailObject.value;
  }

  dataLayer.push(inpushObj);
  
}); 

/* Regex phone
===== LEFT
0(\d+)
\840(\d+)
\(\+84\)0(\d+)\s(\d+)\s(\d+)
\(\+84\)(\d+)
\+840(\d+)
\+84(\d+)
(\+0)\s([()])\d+([()])\s\d+-\d+

==== RIGHT
84$1
84$1
84$1$2$3
84$1
84$1
84$1
84$1