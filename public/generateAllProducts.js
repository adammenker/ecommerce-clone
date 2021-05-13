let allProducts = document.getElementById("hidden-all-products-array").innerHTML;
allProducts = allProducts.split("***23GA2e1SADF2***");
allProducts[0] = "," + allProducts[0];
allProducts.slice(0, -1);

let allProductsArrays = [];
for(let i = 0; i < allProducts.length - 1; i++) {
    let currentProductName = allProducts[i].slice(1);
    let currentProductImage = allProducts[i + 1];
    let currentProduct = [];
    currentProduct.push(currentProductName);
    currentProduct.push(currentProductImage);
    allProductsArrays.push(currentProduct);
    i++;
}
console.log(allProductsArrays);


function createProductWidgets(allProductsArrays) {
    let productName = '';
    let productImageSrc = '';
    let allProductsWidgets = '';
    for(let i = 0; i < allProductsArrays.length; i++) {
        productName = allProductsArrays[i][0];
        productImageSrc = allProductsArrays[i][1];
        allProductsWidgets += 
        '<div class="widget-container">' +
            `<button class="product-widget-transparent-button" type="submit" name="clickedProduct" value="${productName}">` +
                    `<img class="widget-image" src="${productImageSrc}" alt="product widget">` +
            '</button>' +
            `<p>${productName}</p>` +
        '</div>'
    }
    return allProductsWidgets;
}

let imbeddedHTML = createProductWidgets(allProductsArrays);

document.getElementById("all-products-widget-container").innerHTML = imbeddedHTML;