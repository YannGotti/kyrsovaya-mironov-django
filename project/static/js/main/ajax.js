

function InitMainPage(){
    selectAllProducts();
}

InitMainPage();

function selectAllProducts(){
    $.ajax({
        url: '/api/v.1/selectTasks/all/',
        method: 'get',
        success: function(data){

            for (const product of data) {
                AddDivProduct(product);
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
            console.log(data[0]);
            AddDivProduct(data[0]);
            CallToastPanel('Продукт добавлен!');
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
