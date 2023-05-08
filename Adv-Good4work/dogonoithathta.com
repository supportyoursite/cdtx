- Thông báo các case hỗ trợ 
- Cài CT cho hotline, zalo, thêm vào giỏ hàng và nút mess
- Shopping Onboarding
- Cài GA4
- Cài EC cho nút mua ngay


Hướng dẫn Adv 
B1:
    Cai` GA4
    Guide install Gads conversion
    Hotline, Zalo, Messenger, Them vao gio hang 
    EC Mua ngay (Dat hang nhanh) Form

    Tạo xong gửi thông tin cho agent
    Gửi thông tin cho Agent:
B2:
    Cài GMC
    Huong dan Adv lay thong tin san pham với đoạn javascript ở dứoi

Bước 3
    Cài GTM


https://tagmanager.google.com/#/container/accounts/6057864509/containers/115174232/workspaces/2/tags


https://gearloose.corp.google.com/#/merchants/569325679/overview


GMC support
https://docs.google.com/spreadsheets/d/1do-0QmP3CGY8aqQI8ngqbQN2FUeGomGuqGZMLSy3GC4/edit#gid=1690507718
Code get product


https://jsfiddle.net/bymkfc46/


G-N9DY42ERZG
10791841737
Nhãn chuyển đổi
Bạn sẽ tìm thấy nhãn chuyển đổi cho những hành động chuyển đổi bạn đã tạo ở bên dưới
Hotline
yGQrCM6GopoYEMnf-Zko
Zalo
QDNCCNGGopoYEMnf-Zko
Thêm vào giỏ hàng
DAJ6CNSGopoYEMnf-Zko
Messenger
TcxTCNeGopoYEMnf-Zko
Mua ngay
tUT_CPiGopoYEMnf-Zko
Các bước tiếp theo
Hãy đảm bảo bạn thêm thẻ Trình liên kết chuyển đổi và định cấu hình thẻ này để kích hoạt trên tất cả các trang web của bạn.
Nếu sử dụng trang AMP, bạn sẽ cần một vùng chứa riêng. Ngoài ra, hãy thêm thông tin này v


javascript:function getProduct() {
    var _product = {};
    var is_product_page = false;
try {
    
    var _object = JSON.parse(document.querySelector('[name="product_meta"]').value);
    console.log(_object);
    
    
    var _id_product = _object.id;
    _product.id = _id_product;
    _product.name = _object.name;
    _product.description = document.querySelector('meta[name="description"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");  
    _product.link = location.href;
    _product.condition = "new";
    _product.price = _object.price + " VND";
    _product.in_stock = "in_stock";
    _product.image = document.querySelector('meta[property="og:image"]').content.replaceAll(/(?:\r\n|\r|\n)/g, "");
    _product.item_group_id = _id_product;
    _product.phanloaisanpham = document.querySelector('.s-breadcrumb-1 li:last-child').innerText;
    
    
    var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;");


} catch (error) {

    
    var _id = document.querySelector('[onclick*="booking"]').getAttribute('onclick').split(`"id":"`)[1];
        _id = _id.split(`"`)[0];


    var _price = document.querySelector('[onclick*="booking"]').getAttribute('onclick').split(`"price":"`)[1];
        _price = _price.split(`"`)[0];
    
    var _id_product = _id;
    _product.id = _id_product;
    _product.name = document.querySelector('h1.title').innerHTML;
    _product.description = document.querySelector('meta[name="description"]').content.replaceAll(/(?:\r\n|\r|\n)/g, " ");  
    _product.link = location.href;
    _product.condition = "new";
    _product.price = _price + " VND";
    _product.in_stock = "in_stock";
    _product.image = document.querySelector('meta[property="og:image"]').content.replaceAll(/(?:\r\n|\r|\n)/g, "");
    _product.item_group_id = _id_product;
    _product.phanloaisanpham = document.querySelector('.s-breadcrumb-1 li:last-child').innerText;
    
    
    var _lalert = Object.keys(_product).map(function(k){return _product[k]}).join("&#9;");

    
}
    
    var _textarea = '<textarea onclick="this.focus();this.select()" readonly="readonly" style=" width: 100%; height: 146px; font-family: monospace;">' + _lalert + '</textarea>';
    document.querySelector('.ht-page').insertAdjacentHTML('beforebegin', _textarea);

    
}
getProduct();