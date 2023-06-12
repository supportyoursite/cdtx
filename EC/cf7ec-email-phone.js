https://jsfiddle.net/dongmx/yfeu5pat/latest

document.addEventListener( 'wpcf7mailsent', function( event ) {
  var inputs = event.detail.inputs;

  var inpushObj = {
    "event": 'form_submission',
  };
  
  var lst_emailname = [
    'email',
    'your-email',
  ];
  var emailObject = inputs.find(function(item){
    return lst_emailname.includes(item.name);
  });



  var lst_phonename = [
    'tel-phone',
    'your-tel',
    'your-phone',
    'phone-number',
  ];
  var phoneObject = inputs.find(function(item){
    return lst_phonename.includes(item.name);
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