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