
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
// *** TEST ***
console.log(productArray);


function createTableRows(productArr) {
    let tableBody = '';
    let productName = '';
    let productCategory = '';
    let productPrice = '';
    let currentProduct = ''
    for(let i = 0; i < productArr.length; i++) {
        currentProduct = productArr.split(",");
        productName = currentProduct[0];
        productCategory = currentProduct[1];
        productPrice = currentProduct[2];
        tableBody += 
            '<tr>' +
                `<th scope="row">${'# ' + i}</th>` +
                `<td>${productName}</td>` +
                `<td>${productCategory}</td>` +
                `<td>${"$" + productPrice}</td>` +
            '</tr>'
    }
    return tableBody;
}

productHTML = createTableRows(productArray);

document.getElementById("product-table-body").innerHTML = productHTML;

// document.getElementById("product-string").style.opacity = "0";