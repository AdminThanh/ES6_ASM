
// =========LIST CATEGORY===========
// LẤY RA DANH MỤC

const renderListProduct = async () => {
    const listElement = document.querySelector("#listCategory");
    if (listElement) {

        const data = await getData(
            "https://asmfull-6ff42-default-rtdb.firebaseio.com/categories.json"
        );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const cate = data[key];
                return `<tr>
                    <td>
                        <div class="checkbox d-inline-block">
                            <input type="checkbox" class="checkbox-input" id="checkbox2">
                            <label for="checkbox2" class="mb-0"></label>
                        </div>
                    </td>
                    <td>${cate.id}</td>
                    <td>${cate.name}</td>
                    <td>
                        <div class="d-flex align-items-center list-action">
                            <a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sửa"
                                href="page-edit-category.html?id=${key}"><i class="ri-pencil-line mr-0"></i></a>
                            <a onclick="delCategory('${key}', this)" class="hover badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Xóa" ><i class="ri-delete-bin-line mr-0"></i></a>
                        </div>
                    </td>
                </tr>`;
            })
            .join("");

        listElement.innerHTML = html;
    }

};

renderListProduct();

// =========ADD CATEGORY===========

// THÊM SP
async function createCategory(uri, data) {
    console.log(data)
    const res = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return res;
}
var btnAddCategory = document.querySelector("#btnAddCategory");
const idCate = document.querySelector("#idCate");
const nameCate = document.querySelector("#nameCate");
if (btnAddCategory) {

    btnAddCategory.onclick = async (e) => {
        console.log(idCate.value)
        console.log(nameCate)
        e.preventDefault();
        const res = await createCategory(
            "https://asmfull-6ff42-default-rtdb.firebaseio.com/categories.json",
            {
                id: idCate.value,
                name: nameCate.value,
            }
        );
        if (res.status === 200) {
            swal("Thành công!", "Sản phẩm đã được thêm!", "success");
            document.getElementById('dataForm').reset()
        } else {
            swal("Thất bại!", "Đã xảy ra lỗi!", "error");

        }
    };
}


// =======EDIT CATE=================
// Hiển thị 1 danh mục
let params = new URLSearchParams(location.search);
let key = params.get("id");
if (key) {
    getCategoryItem();
}
function getCategoryItem() {
    const url = `https://asmfull-6ff42-default-rtdb.firebaseio.com/categories/${key}.json`;
    fetch(url).then(res => res.json())
        .then(CategoryItem => {
            document.querySelector("#nameCate").value = CategoryItem.name;
            document.querySelector("#idCate").value = CategoryItem.id;
        })
}

// sửa cate
async function EditCategory(uri, data) {
    const res = await fetch(uri, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return res;
}

var btnEditCategory = document.querySelector("#btnEditCategory");
if (btnEditCategory) {
    btnEditCategory.onclick = async (e) => {
        e.preventDefault();
        const nameCate = document.querySelector("#nameCate");
        const idCate = document.querySelector("#idCate");
        const res = await EditCategory(
            `https://asmfull-6ff42-default-rtdb.firebaseio.com/categories/${key}.json`,
            {
                id: idCate.value,
                name: nameCate.value,
            }
        );
        if (res.status === 200) {
            swal("Thành công!", "Danh mục đã được sửa!", "success");
        } else {
            swal("Thất bại!", "Đã xảy ra lỗi!", "error");

        }
    };
}
