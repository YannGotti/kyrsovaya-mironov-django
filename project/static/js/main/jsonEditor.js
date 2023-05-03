
function createJsonParser(id, params){

    id_product = parseInt(id);
    json_params = JSON.parse(params);

    var container = document.getElementById("jsoneditor");
    var options = {
        modes: ['tree', 'code', 'view'],
        expandAll: true,
        onChange: function() { 
        },
        onError: function (e) {
            CallToastPanel('Ошибка синтаксиса JSON!');
        }
    };
    var editor = new JSONEditor(container, options);
    
    var json = [{
        "Название": "Компьютер",
        "Производитель": "Некая компания",
        "Модель": "Модель X",
        "Система охлаждения": "Активная",
        "Центральный процессор": "Intel Core i5-9400",
        "Частота процессора": "2.9 ГГц",
        "Количество ядер процессора": 6,
        "Объем оперативной памяти": "8 ГБ",
        "Тип оперативной памяти": "DDR4",
        "Частота оперативной памяти": "2666 МГц",
        "Объем жесткого диска": "1 ТБ",
        "Тип жесткого диска": "HDD",
        "Размер дисплея": "не применимо",
        "Разрешение дисплея": "не применимо",
        "Тип графического адаптера": "NVIDIA GeForce GTX 1050",
        "Видеопамять": "2 ГБ",
        "Операционная система": "Windows 10",
        "Порты ввода-вывода": ["USB 2.0", "USB 3.0", "HDMI", "Ethernet"],
        "Блок питания": "400 Вт",
        "Габариты": {"Ширина": "200 мм", "Высота": "400 мм", "Глубина": "350 мм"},
        "Вес": "5 кг"
    }];

    if (json_params != JSON.parse(0)){
        editor.set(json_params);
    }
    else{
        editor.set(json);
    }
    
    
    $("#submit-button").click(function(){
        try {
            var updatedJson = editor.get();
            const myJSON = JSON.stringify(updatedJson);
            editProduct(id_product, myJSON);
        } catch (error) {
            CallToastPanel('Ошибка синтаксиса JSON!');
        }
        
        
    });
}


