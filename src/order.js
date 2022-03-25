// Lấy ra đơn hàng
const renderListProduct = async () => {
    const listElement = document.querySelector("#listOrder");
    const data = await getData(
        "https://asmfull-6ff42-default-rtdb.firebaseio.com/orders.json"
    );
    const html = Object.keys(data)
        .map((key) => {
            if (data[key] === null) return "";
            console.log(data[key])
            order = data[key];
            return `<tr>
                        <td>
                            <div class="checkbox d-inline-block">
                                <input type="checkbox" class="checkbox-input" id="checkbox2">
                                <label for="checkbox2" class="mb-0"></label>
                            </div>
                        </td>
                        <td>${order.customer_name}</td>
                        <td>${order.customer_phone_number}</td>
                        <td id="description">${order.customer_address}</td>
                        <td>${order.created_date}</td>
                        <td>${order.status}</td>
                        <td>
                            <div class="d-flex align-items-center list-action">
                                <a class="badge badge-info mr-2" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Xem" href="page-view-order.html?id=${key}"><i
                                        class="ri-eye-line mr-0"></i></a>
                                <a class="badge bg-success mr-2" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Sửa"
                                    href="page-edit-order.html?id=${key}"><i
                                        class="ri-pencil-line mr-0"></i></a>
                            </div>
                        </td>
                    </tr>`;
        })
        .join("");

    listElement.innerHTML = html;
};

renderListProduct();