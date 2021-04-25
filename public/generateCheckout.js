let subtotal = document.getElementById("hidden-price").innerHTML.toString();

function calculateTax(subtotal){
    return subtotal * .08;
}

function calculateFinalTotal(tax, subtotal, shipping) { 
    return tax + subtotal + shipping;
}
let shipping = 5
let taxes = calculateTax(subtotal).toFixed(2);
let finalTotal = calculateFinalTotal(taxes, subtotal, shipping);

if(document.getElementById("subtotal-price-header")) {
    document.getElementById("subtotal-price-header").innerHTML = `Subtotal: $${subtotal}`;
    document.getElementById("taxes-price-header").innerHTML = `Taxes: $${taxes}`;
    document.getElementById("shipping-price-header").innerHTML = `Shipping: $${shipping}`;
    document.getElementById("total-price-header").innerHTML = `Total: $${finalTotal}`;
}

document.getElementById("hidden-price").setAttribute("opacity", 0);