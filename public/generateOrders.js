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
console.log(ordersArray);

function createTableRows(orderArr) {
    let tableBody = '';
    for(let i = orderArr.length - 1; i != -1; i--) {
        currentOrder = orderArr[i].split(",");
        order_number = currentOrder[0];
        tracking_number = currentOrder[1];
        order_date = currentOrder[2];
        ship_method = currentOrder[3];
        number_of_products = currentOrder[4];
        price = currentOrder[5];
        tableBody += 
            '<tr>' +
                `<th scope="row">${order_number}</th>` +
                `<td>${tracking_number}</td>` +
                `<td>${order_date}</td>` +
                `<td>${ship_method}</td>` +
                `<td>${number_of_products}</td>` +
                `<td>${"$" + price}</td>` +
            '</tr>'
    }
    return tableBody;
}

orderHTML = createTableRows(ordersArray);
document.getElementById("order-table-body").innerHTML = orderHTML;
document.getElementById("orders-string").style.display = "none";
