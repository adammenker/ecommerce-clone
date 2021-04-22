
let productText = document.getElementById("test").innerHTML

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
    for(let i = 0; i < productArr.length; i++) {
        tableBody += 
            '<tr>' +
                `<th scope="row">${i + 1}</th>` +
                `<td>${'Mark'}</td>` +
                `<td>${'Otto'}</td>` +
                `<td>${'$mdo'}</td>` +
            '</tr>'
    }
}

productHTML = createTableRows(productArray);

document.getElementById("product-table-body").innerHTML = productHTML;