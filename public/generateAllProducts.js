let allProducts = document.getElementById("hidden-all-products-array").innerHTML;
allProducts = allProducts.split("\\");
console.log("* " + allProducts);

let allProductsArrays = [];
for(let i = 0; i < allProducts.length; i++) {
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
    for(let i = 0; i < productArr.length; i++) {
        currentProduct = productArr[i].split(",");
        productID = currentProduct[0];
        productName = (currentProduct[1]).replace("**2Z$*4TZQ$**3", ",");
        productCategory = currentProduct[2];
        productPrice = (parseFloat(currentProduct[3]).toFixed(2)).toString();
        productPrice = 
        tableBody += 
            '<tr>' +
                `<th scope="row">${productID}</th>` +
                `<td>${productName}</td>` +
                `<td>${productCategory}</td>` +
                `<td>${"$" + productPrice}</td>` +
                `<td>
                    <form action="/cart" method="post" autocomplete="off">
                        <button class="btn btn-outline-secondary" type="submit" name="removeItemProductId" value="${productID}">
                            Remove
                        </button>
                    </form>
                </td>` +
            '</tr>'
    }
    return tableBody;
}