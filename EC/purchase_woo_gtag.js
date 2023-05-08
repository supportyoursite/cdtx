
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-ZZZZZZZZZZZZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-ZZZZZZZZZZZZ');
</script>


add_action('woocommerce_thankyou', 'gtag_woocommerce_conversion', 10, 1);
function gtag_woocommerce_conversion($order_id) {
  
  $order = wc_get_order($order_id);
  $order_data = $order->get_data();

  $email = $order_data['billing']['email'];
  $phone = $order_data['billing']['phone'];

  echo '<script>
    window.addEventListener("load", function (event) {
      // var transaction_id = document.querySelector("#transaction-id").innerText;
      // var revenue = document.querySelector("#revenue").innerText;
      // var email = document.querySelector("#email").innerText;

      var transaction_id = "' . $order_id . '";
      var revenue = parseFloat("' . $order->get_total() . '");
      var email = "'. $email .'";
      var phone = "'. $phone .'";

      gtag("set", "user_data", {
        email: email,
        phone: phone,
      });

      // conversion
      gtag("event", "purchase", {
        "send_to": "AW-ZZZZZZZZZZZZ/DbmmCMXbiY0YELTh7NgB",
        "value": revenue,
        "currency": "VND",
        "transaction_id": transaction_id
      });
    });
  </script>';
}