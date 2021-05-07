
let productText = document.getElementById("product-string").innerHTML;

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
document.getElementById("product-string").style.display = "none";


function setSubtotals() {
    let subtotal = 0; 
    for(let i = 0; i < productArray.length; i++) {
        currentProduct = productArray[i].split(",");
        subtotal += parseFloat(currentProduct[3]);
    }
    return subtotal.toFixed(2);
}

let subtotal = setSubtotals();
let quantity = productArray.length;

function calculateTax(subtotal){
    return subtotal * .08;
}

function calculateFinalTotal(tax, subtotal, shipping) { 
    return parseFloat(tax) + parseFloat(subtotal) + parseFloat(shipping);
}
let shipping = 5;
let taxes = calculateTax(subtotal).toFixed(2);
let finalTotal = calculateFinalTotal(taxes, subtotal, shipping).toFixed(2);

document.getElementById("checkout-button").setAttribute("value", `$${finalTotal},${quantity}`);

document.getElementById("subtotal-label").innerHTML = `Subtotal: $${subtotal}`;
document.getElementById("taxes-label").innerHTML = `Taxes: $${taxes}`;
document.getElementById("shipping-label").innerHTML = `Shipping: $${shipping}`;
document.getElementById("total-label").innerHTML = `Total: $${finalTotal}`;