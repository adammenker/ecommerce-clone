
let productText = document.getElementById("test").innerHTML

productText = productText.split("\\");

for(let i = 0; i < productText.length; i++) {
    if(i == 0) {
        productText[i] = productText[i].slice(0, -1);
    } else {
        productText[i] = productText[i].slice(0, -1);
    }
}

console.log(productText);

//document.getElementById("test2").innerHTML = "yeyeyw"