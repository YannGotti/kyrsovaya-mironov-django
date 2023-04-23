
function AddDivProduct(data, product_list){
    let photo = data.photos[0];

    

    let product = data.product[0];
    let id = product.pk;
    let fields = product.fields;

    product_list.innerHTML +=
    `
    <div class="row d-flex justify-content-center mt-3 shadow p-1 animate__animated animate__fadeIn" style="border-radius: 10px;">
        <div class="col-3">
            <a href="#"><img src="/media/product_photos/` + photo + `" width="100%" alt=""></a>
        </div>

        <div class="col-6">
            <div class="row">
                <div class="col-12">
                    <a href="#" class="text-a wrap text-dark">` + fields.title + `</a>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-6">
                    <h3 class="text-h3">В наличии: ` + fields.count + `</h3>
                </div>
                <div class="col-6">
                    <h3 class="text-h3">Артикул: <a href="#">` + fields.articul + `</a></h3>
                </div>
            </div>
        </div>

        <div class="col-3">
            <div class="row d-flex justify-content-start mt-2">
                <div class="col-12">
                    <h3 class="text-h1 text-dark text-center">` + fields.price + `р</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-12 d-flex justify-content-center mt-3">
                    <button type="button" class="btn btn-dark text-button">Изменить</button>
                </div>
            </div>
        </div>
    </div>
    `

}

function AddDivListType(){
    let listTypes = document.getElementById('listTypes');

    for (const type of TYPES_LIST) {

    listTypes.innerHTML +=
    `<li><a class="dropdown-item text-h3" onclick="insertTypeForInput('` + type + `')" href="#">` + type + `</a></li>`

    }
}

function AddDivFilterTypes(){
    let filterTypes = document.getElementById('filterTypes');

    for (const type of TYPES_LIST) {

    filterTypes.innerHTML +=
    `<li><a class="dropdown-item text-button" onclick="getFilterProducts('` + type + `')" href="#">` + type + `</a></li>`

    }
}

function checkDisableProductsDiv(count){
    let productsDiv = document.getElementById('productsDiv');

    if (count == 0){
        productsDiv.style.display = "none";
        return;   
    }
    
    productsDiv.style.display = "block";
}