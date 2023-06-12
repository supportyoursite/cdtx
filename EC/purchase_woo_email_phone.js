<?php 
add_action('woocommerce_thankyou', 'gtm_send_purchaseinfo', 10, 1);
function gtm_send_purchaseinfo($order_id)
{
  $order = wc_get_order($order_id);
  $order_data = $order->get_data();
  $currency = 'VND';
  if(method_exists($order, 'get_currency')) {
    $currency = $order->get_currency();
  }
  

  $email = $order_data['billing']['email'];
  $phone = $order_data['billing']['phone'];
  

    echo '<script>
      var transaction_id = "' . $order_id . '";
      var revenue = parseFloat("' . $order->get_total() . '");
      var email = "'. $email .'";
      var phone = "'. $phone .'";
      var currency = "'. $currency .'";
      // conversion
      window.dataLayer = window.dataLayer || [];

      if(phone) {
        dataLayer.push({
          "event": "purchase_woo",
          "value": revenue,
          "currency": currency,
          "transaction_id": transaction_id,
          "email": email,
          "phone": phone,
        });
      }
      
  </script>';
}


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


--- DEBUG

      dataLayer.push({
        "event": "purchase_woo",
        "value": revenue,
        "currency": "VND",
        "transaction_id": '121241',
        "email": "testgtm@gmail.com",
        "phone": "0987654321",
      });