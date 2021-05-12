let allProducts = document.getElementById("hidden-all-products-array").innerHTML;
console.log(allProducts);
allProducts = allProducts.split("\\");
console.log("* " + allProducts);

let allProductsArrays = [];
for(let i = 0; i < allProducts.length; i++) {
    console.log(allProducts[i]);
    console.log(allProducts[i + 1]);
    let currentProductName = allProducts[i];
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
            '<div>' +
                `<img src="${productImageSrc}" alt="product widget">` +
                `<p>${productName}</p>` +
            '</div>'
    }
    return allProductsWidgets;
}

let imbeddedHTML = createProductWidgets(allProductsArrays);
console.log(imbeddedHTML);

document.getElementById("all-products-widget-container").innerHTML = imbeddedHTML;