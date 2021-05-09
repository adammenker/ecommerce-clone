
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
                `<td>
                    <form action="/cart" method="POST" autocomplete="off" name="remove-item-product-id" value="${productID}">
                        <button class="btn btn-outline-secondary" type="submit" onclick="removeItemRow(${productID})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </form>
                </td>` +
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


function removeItemRow(productID) {
    productID = parseInt(productID);
    for(let i = 0; i < document.getElementById("cart-table").rows.length; i++) {
        let itemNo = parseInt(document.getElementById("cart-table").rows[i].cells[0].innerHTML);
        if(itemNo == productID){
            document.getElementById("cart-table").rows[i].remove()
        }
    }
}