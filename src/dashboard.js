function formatVND(price) {
    return String(price).replace(/(.)(?=(\d{3})+$)/g, '$1.') + " VNĐ";
}
// đếm danh mục
function getDanhMuc() {
    var url = `https://asmfull-6ff42-default-rtdb.firebaseio.com/categories.json`;
    const danhmuc = document.querySelector("#danhmuc");
    if (danhmuc) {
        fetch(url).then(data => data.json())
            .then(orders => {
                danhmuc.innerHTML = Object.keys(orders).length;
            });
    }
}
getDanhMuc()

// đếm sản phẩm
function getSanPham() {
    var url = `https://asmfull-6ff42-default-rtdb.firebaseio.com/products.json`;
    const sanpham = document.querySelector("#sanpham")
    if (sanpham) {
        fetch(url).then(data => data.json())
            .then(orders => {
                sanpham.innerHTML = Object.keys(orders).length;
            });
    }

}
getSanPham()


// đơn hàng
function getDonHang() {
    var url = `https://asmfull-6ff42-default-rtdb.firebaseio.com/orders.json`;
    const donhang = document.querySelector("#donhang")
    if (donhang) {
        fetch(url).then(data => data.json())
            .then(orders => {
                donhang.innerHTML = Object.keys(orders).length;
            });
    }

}
getDonHang()

// doanh thu
function getDoanhthu() {
    var url = `https://asmfull-6ff42-default-rtdb.firebaseio.com/order_details.json`;
    const doanhthu = document.querySelector("#doanhthu");
    if (doanhthu) {
        fetch(url).then(data => data.json())
            .then(orders => {
                var doanhthuNum = 0;
                orders.forEach(order => {
                    doanhthuNum += order.unit_price;
                });
                doanhthu.innerHTML = formatVND(doanhthuNum);
            });
    }
}
getDoanhthu()




// danh sách đơn hàng
function getOrder() {
    var urlOrders = `https://asmfull-6ff42-default-rtdb.firebaseio.com/orders.json`;
    const DSdonhang = document.querySelector("#DSdonhang")
    if (DSdonhang) {
        fetch(urlOrders).then(data => data.json())
            .then(orders => {
                const orderList = orders.map(order => {
                    return (`<tr>
                                <td>
                                    <div class="checkbox d-inline-block">
                                        <input type="checkbox" class="checkbox-input" id="checkbox2">
                                        <label for="checkbox2" class="mb-0"></label>
                                    </div>
                                </td>
                                <td>${order.customer_name}</td>
                                <td>${order.customer_phone_number}</td>
                                <td>${order.customer_address}</td>
                                <td>${order.customer_email}</td>
                                <td>2022-12-01</td>
                                <td>
                                    <div class="badge badge-warning">${order.status}</div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center list-action">
                                        <a class="badge badge-info mr-2" data-toggle="tooltip"
                                            data-placement="top" title="" data-original-title="View"
                                            href="page-list-order.html"><i class="ri-eye-line mr-0"></i></a>
                                    </div>
                                </td>
                            </tr>`);
                })
                DSdonhang.innerHTML = orderList.join("");
            });
    }
}
getOrder();