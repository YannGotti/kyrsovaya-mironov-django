
function AddDivProduct(data){
    let photo = data.photos[0];

    

    let product = data.product[0];
    let id = product.pk;
    let fields = product.fields;

    let product_list = document.getElementById('product_list');

    product_list.innerHTML +=
    `
    <div class="row d-flex justify-content-center mt-3 shadow p-1" style="border-radius: 10px;">
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