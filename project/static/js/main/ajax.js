

function InitMainPage(){

    AddDivListType();

    try{
        selectProducts();
    }
    catch{
        return;
    }
    AddDivFilterTypes();
    setCookieFilterType("all");
}

InitMainPage();

function getCountProducts(type = "all"){
    let count;

    $.ajax({
        url: '/api/v.1/getCountProducts/?type=' + type,
        method: 'get',
        async: false,
        success: function(data){
            count = data;
        },
        error: function (jqXHR, exception) {
            return;
        }
    });

    return count;
}

function selectProducts(type = "all"){

    checkDisableProductsDiv(getCountProducts());

    $.ajax({
        url: '/api/v.1/selectTasks/?type='+ type,
        method: 'get',
        success: function(data){
            let product_list = document.getElementById('product_list');
            product_list.innerHTML = ``;

            for (const product of data) {
                AddDivProduct(product, product_list);
            }

            setCurrentCountProduct("Всего товара - " + data.length);
        },
        error: function (jqXHR, exception) {
            return;
        }
    });
}

function createProduct(){
    let form = document.getElementById('form_create_product');
    let file_loader = document.getElementById('file_loader');


    if (form.title.value.length == 0 || form.title.value.length > 100){
        CallToastPanel('Имя товара не может быть пустым или больше 100 символов!');
        return;
    }

    if (form.description.value.length == 0){
        CallToastPanel('Описание товара не может быть пустым!');
        return;
    }

    let price = parseFloat(form.price.value);

    if (!price){
        CallToastPanel('Цена не является числом!');
        return;
    }

    if (form.type.value.length == 0 || form.type.value.length > 50){
        CallToastPanel('Тип товара не может быть пустым или больше 50!');
        return;
    }

    let count = parseFloat(form.count.value);

    if (!count){
        CallToastPanel('Количество товаров не является числом!');
        return;
    }

    if (form.articul.value.length == 0 || form.articul.value.length > 100){
        CallToastPanel('Артикул товара не может быть пустым или больше 100 символов!');
        return;
    }

    if(!file_loader.files[0]){
        CallToastPanel('Файл с фото товара не прикреплен!');
        return;
    }


    let formData = new FormData();
    formData.append('title', form.title.value);
    formData.append('description', form.description.value);
    formData.append('price', form.price.value);
    formData.append('type', form.type.value);
    formData.append('count', form.count.value);
    formData.append('articul', form.articul.value);
    formData.append('file', file_loader.files[0]);

    let csrftoken = getCookie('csrftoken');


    $.ajax({
        url: 'api/v.1/createProduct/',
        method: 'post',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success: function(data){
            let product_list = document.getElementById('product_list');

            if (readCookie() == "all" || readCookie() == form.type.value){
                AddDivProduct(data[0], product_list);
            }
            else{
                getFilterProducts(form.type.value);
            }
            checkDisableProductsDiv(getCountProducts());
            CallToastPanel('Продукт добавлен!');
        },
        error: function (jqXHR, exception) {
            return;
        }
    });
}


function editProduct(id, json){
    let form = document.getElementById('form_edit_product');
    if (form.title.value.length == 0 || form.title.value.length > 100){
        CallToastPanel('Имя товара не может быть пустым или больше 100 символов!');
        return;
    }

    if (form.description.value.length == 0){
        CallToastPanel('Описание товара не может быть пустым!');
        return;
    }

    let price = parseFloat(form.price.value);


    if (!price){
        CallToastPanel('Цена не является числом!');
        return;
    }

    price = form.price.value;
    
    if (form.type.value.length == 0 || form.type.value.length > 50){
        CallToastPanel('Тип товара не может быть пустым или больше 50!');
        return;
    }

    let count = parseFloat(form.count.value);

    if (!count){
        CallToastPanel('Количество товаров не является числом!');
        return;
    }

    if (form.articul.value.length == 0 || form.articul.value.length > 100){
        CallToastPanel('Артикул товара не может быть пустым или больше 100 символов!');
        return;
    }




    let formData = new FormData();
    formData.append('id', id);
    formData.append('title', form.title.value);
    formData.append('description', form.description.value);
    formData.append('price', price);
    formData.append('type', form.type.value);
    formData.append('count', form.count.value);
    formData.append('articul', form.articul.value);
    formData.append('parametrs', json);

    let csrftoken = getCookie('csrftoken');


    $.ajax({
        url: '/api/v.1/editProduct/',
        method: 'post',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success: function(data){
            CallToastPanel('Продукт обновлен!');
        },
        error: function (jqXHR, exception) {
            return;
        }
    });
}


function setCurrentCountProduct(message){
    let count_product = document.getElementById('count_product');
    count_product.textContent = message;
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function CallToastPanel(message){
    const toastLiveExample = document.getElementById('liveToast');
            let toast_content = document.getElementById('toast_content');
            toast_content.innerText = message;
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
}
