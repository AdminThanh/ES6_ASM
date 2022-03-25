// =======LIST PRODUCT ===========
const renderListProduct = async () => {
    const listElement = document.querySelector("#listProduct");
    if (listElement) {
        const data = await getData(
            "https://asmfull-6ff42-default-rtdb.firebaseio.com/products.json"
        );
        const html = Object.keys(data).reverse()
            .map((key) => {
                if (data[key] === null) return "";
                const product = data[key];
                return `<tr>
                                <td>
                                    <div class="checkbox d-inline-block">
                                        <input type="checkbox" class="checkbox-input" id="checkbox2">
                                        <label for="checkbox2" class="mb-0"></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="${product.image}"
                                            class="img-fluid rounded avatar-50 mr-3" alt="image">
                                        <div>${product.name}</div>
                                    </div>
                                </td>
                                <td id="description">${truncate(product.detail)}</td>
                                <td>${product.price}</td>
                                <td>${product.categorieId}</td>
                                <td>
                                    <div class="d-flex align-items-center list-action">
                                        <a class="badge bg-success mr-2" data-toggle="tooltip"
                                            data-placement="top" title="" data-original-title="Sửa" href="page-edit-product.html?id=${key}"><i
                                                class="ri-pencil-line mr-0"></i></a>
                                        <a onclick="deleteProduct('${key}', this)" class="deleteProduct badge bg-warning mr-2" data-toggle="tooltip"
                                            data-placement="top" title="" data-original-title="Xóa"><i
                                                class="ri-delete-bin-line mr-0"></i></a>
                                    </div>
                                </td>
                            </tr>`;
            })
            .join("");
        listElement.innerHTML = html;
    }

};

renderListProduct();



//=========ADD PRODUCT=====
// HIển thi cate
const renderListCate = async () => {
    const categorieId = document.querySelector("#categorieId");
    if (categorieId) {
        const data = await getData(
            "https://asmfull-6ff42-default-rtdb.firebaseio.com/categories.json"
        );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const cate = data[key];
                return `<option value="${cate.id}">${cate.name}</option>`;
            })
            .join("");

        categorieId.innerHTML = html;
    }
};

renderListCate();


// Thêm sp
async function createProduct(uri, data) {
    const res = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return res;
}

const addElement = document.querySelector("#btnAddProduct");
const categorieId = document.querySelector("#categorieId");
const idProduct = document.querySelector("#idProduct");
const nameProduct = document.querySelector("#nameProduct");
const priceProduct = document.querySelector("#priceProduct");
const imageProduct = document.querySelector("#imageProduct");
const detailProduct = document.querySelector("#detailProduct");
if (addElement) {
    addElement.onclick = async (e) => {
        e.preventDefault();
        const res = await createProduct(
            "https://asmfull-6ff42-default-rtdb.firebaseio.com/products.json",
            {
                categorieId: categorieId.value,
                id: idProduct.value,
                name: nameProduct.value,
                price: priceProduct.value,
                image: imageProduct.value,
                detail: detailProduct.value,
                import_date: new Date().toISOString().slice(0, 10),
            }
        );

        if (res.status === 200) {
            swal("Thành công!", "Sản phẩm đã được thêm!", "success");
            document.getElementById('fromdata').reset()
        } else {
            swal("Thất bại!", "Đã xảy ra lỗi!", "error");

        }
    };
}


// ====EDIT PRODUCT=========
// HIển thi cate
const renderListCateEdit = async () => {
    const categorieId = document.querySelector("#categorieId");
    if (categorieId) {
        const data = await getData(
            "https://asmfull-6ff42-default-rtdb.firebaseio.com/categories.json"
        );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const cate = data[key];
                return `<option value="${cate.id}">${cate.name}</option>`;
            })
            .join("");

        categorieId.innerHTML = html;
    }

};

renderListCateEdit();

// Hiển thị 1 sp
let params = new URLSearchParams(location.search);
let key = params.get("id");
function getProductItem() {
    const url = `https://asmfull-6ff42-default-rtdb.firebaseio.com/products/${key}.json`;
    fetch(url).then(res => res.json())
        .then(ProductItem => {
            document.querySelector("#nameProduct").value = ProductItem.name;
            document.querySelector("#idProduct").value = ProductItem.id;
            document.querySelector("#priceProduct").value = ProductItem.price;
            document.querySelector("#imageProduct").value = ProductItem.image;
            document.querySelector("#detailProduct").value = ProductItem.detail;
            // document.querySelector("#categorieId").value = ProductItem.id;
        })
}
if (key) {
    getProductItem();
}

// Sửa
async function editProduct(uri, data) {
    const res = await fetch(uri, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return res;
}
var btnEditProduct = document.querySelector("#btnEditProduct");
const categorieIdEdit = document.querySelector("#categorieId");
const idProductEdit = document.querySelector("#idProduct");
const nameProductEdit = document.querySelector("#nameProduct");
const priceProductEdit = document.querySelector("#priceProduct");
const imageProductEdit = document.querySelector("#imageProduct");
const detailProductEdit = document.querySelector("#detailProduct");
if (btnEditProduct) {
    btnEditProduct.onclick = async (e) => {
        e.preventDefault();

        const res = await editProduct(
            `https://asmfull-6ff42-default-rtdb.firebaseio.com/products/${key}.json`,
            {
                categorieId: categorieIdEdit.value,
                id: idProductEdit.value,
                name: nameProductEdit.value,
                price: priceProductEdit.value,
                image: imageProductEdit.value,
                detail: detailProductEdit.value,
                import_date: new Date().toISOString().slice(0, 10),
            }
        );

        if (res.status === 200) {
            swal("Thành công!", "Sản phẩm đã được sửa!", "success");
        } else {
            swal("Thất bại!", "Đã xảy ra lỗi!", "error");

        }
    };
}
