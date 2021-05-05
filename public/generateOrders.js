let ordersText = document.getElementById("orders-string").innerHTML;

ordersText = ordersText.split("\\");

for(let i = 0; i < ordersText.length; i++) {
    if(i == 0) {
        // remove ending comma
        ordersText[i] = ordersText[i].slice(0, -1);
    } else {
        // remove starting and ending comma
        ordersText[i] = ordersText[i].slice(1);
        ordersText[i] = ordersText[i].slice(0, -1);
    }
}
// remove empty string at the end
ordersArray = ordersText.slice(0, -1);

function createTableRows(orderArr) {
    let tableBody = '';
    let orderName = '';
    let orderCategory = '';
    let orderPrice = '';
    let currentOrder = ''
    for(let i = 0; i < orderArr.length; i++) {
        currentOrder = orderArr[i].split(",");
        orderID = currentOrder[0];
        orderName = (currentOrder[1]).replace("**2Z$*4TZQ$**3", ",");
        orderCategory = currentOrder[2];
        orderPrice = currentOrder[3];
        tableBody += 
            '<tr>' +
                `<th scope="row">${orderID}</th>` +
                `<td>${orderName}</td>` +
                `<td>${orderCategory}</td>` +
                `<td>${"$" + orderPrice}</td>` +
            '</tr>'
    }
    return tableBody;
}

orderHTML = createTableRows(orderArray);
document.getElementById("order-table-body").innerHTML = orderHTML;
document.getElementById("order-string").style.display = "none";
