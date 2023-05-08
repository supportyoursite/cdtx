// https://jsfiddle.net/dongmx/thzj4dac/

add_action('woocommerce_thankyou', 'gtm_send_purchaseinfo', 10, 1);
function gtm_send_purchaseinfo($order_id)
{
  $order = wc_get_order($order_id);
  $order_data = $order->get_data();

  $email = $order_data['billing']['email'];
  

    echo '<script>
      var transaction_id = "' . $order_id . '";
      var revenue = parseFloat("' . $order->get_total() . '");
      var email = "'. $email .'";

      // conversion
      window.dataLayer = window.dataLayer || [];

      dataLayer.push({
        "event": "purchase_woo",
        "value": revenue,
        "currency": "VND",
        "transaction_id": transaction_id,
        "email": email
      });
  </script>';
}