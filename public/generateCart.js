
let productText = document.getElementById("product-string").innerHTML

productText = productText.split("\\");

for(let i = 0; i < productText.length; i++) {
    if(i == 0) {
        // remove ending comma
        productText[i] = productText[i].slice(0, -1);
    } else {
        // remove starting and ending comma
        productText[i] = productText[i].slice(1);
        productText[i] = productText[i].slice(0, -1);
    }
}
// remove empty string at the end
productArray = productText.slice(0, -1);


function createTableRows(productArr) {
    let tableBody = '';
    let productName = '';
    let productCategory = '';
    let productPrice = '';
    let currentProduct = ''
    for(let i = 0; i < productArr.length; i++) {
        currentProduct = productArr[i].split(",");
        productID = currentProduct[0];
        productName = (currentProduct[1]).replace("**2Z$*4TZQ$**3", ",");
        productCategory = currentProduct[2];
        productPrice = currentProduct[3];
        tableBody += 
            '<tr>' +
                `<th scope="row">${productID}</th>` +
                `<td>${productName}</td>` +
                `<td>${productCategory}</td>` +
                `<td>${"$" + productPrice}</td>` +
            '</tr>'
    }
    return tableBody;
}

productHTML = createTableRows(productArray);
document.getElementById("product-table-body").innerHTML = productHTML;
document.getElementById("product-string").style.opacity = "0";


function setTotals() {
    let subtotal = 0; 
    for(let i = 0; i < productArray.length; i++) {
        currentProduct = productArray[i].split(",");
        subtotal += parseFloat(currentProduct[3]);
    }
    return subtotal.toFixed(2);
}

let subtotal = setTotals();
let quantity = productArray.length;

document.getElementById("quantity-label").innerHTML = `Quantity: ${quantity}`;
document.getElementById("subtotal-label").innerHTML = `Subtotal: $${subtotal}`;

document.getElementById("checkout-button").setAttribute("value", `$${subtotal},${quantity}`);

function calculateTax(subtotal){
    return subtotal * .08;
}

function calculateFinalTotal(tax, subtotal, shipping) { 
    return tax + subtotal + shipping;
}
let shipping = 5
let taxes = calculateTax(subtotal);
let finalTotal = calculateFinalTotal(taxes, subtotal, shipping);

if(document.getElementById("subtotal-price-header")) {
    document.getElementById("subtotal-price-header").innerHTML = `Subtotal: $${subtotal}`;
    document.getElementById("taxes-price-header").innerHTML = `Taxes: $${taxes}`;
    document.getElementById("shipping-price-header").innerHTML = `Shipping: $${shipping}`;
    document.getElementById("total-price-header").innerHTML = `Total: $${finalTotal}`;
}
