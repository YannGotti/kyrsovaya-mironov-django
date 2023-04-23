
function insertTypeForInput(type){
    let inputTypes = document.getElementById('inputTypes');
    inputTypes.value = type;
}

function getFilterProducts(type){
    let filterButton = document.getElementById('filterButton');

    if (type == "all") filterButton.textContent = "Все товары";
    else filterButton.textContent = type;

    setCookieFilterType(type);
    selectProducts(type);
}

function setCookieFilterType(type){
    document.cookie = encodeURIComponent("filterType") + "=" + encodeURIComponent(type) + ";path=/;";
}

function readCookie(name = "filterType") {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

