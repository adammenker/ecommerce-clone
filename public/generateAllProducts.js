let allProducts = document.getElementById("hidden-all-products-array").innerHTML;
console.log(allProducts);
allProducts = allProducts.split("\\");
console.log("* " + allProducts);

let allProductsArrays = [];
for(let i = 0; i < allProducts; i++) {
    let currentProductName = allProducts[i];
    let currentProductImage = allProducts[i + 1];
    let currentProduct = [];
    currentProduct.push(currentProductName);
    currentProduct.push(currentProductImage);
    allProductsArrays.push(currentProduct);
    i++;
}
console.log(allProductsArrays);