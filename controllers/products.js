const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


exports.insertAutofillScript = (req, res, next) => {
    db.query('SELECT name FROM products', async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 
        
        // console.log(productNames);
        if(result.length == 0) {
            return next();
        } else {
            let productNames = [];
            for(let i = 0; i < result.length; i++) {
                productNames.push(result[i].name);
            }
            console.log(productNames);
            // below is the autofill script

            let hbsScriptText = 
            `<script>
                console.log('afsd');
                "use strict";


                let autocomplete = (inp, arr) => {
                    /*the autocomplete function takes two arguments,
                    the text field element and an array of possible autocompleted values:*/
                    let currentFocus;
                    /*execute a function when someone writes in the text field:*/
                    inp.addEventListener("input", function (e) {
                        let a, //OUTER html: variable for listed content with html-content
                            b, // INNER html: filled with array-Data and html
                            i,
                            val = this.value;

                        /*close any already open lists of autocompleted values*/
                        closeAllLists();

                        if (!val) {
                            return false;
                        }

                        currentFocus = -1;

                        /*create a DIV element that will contain the items (values):*/
                        a = document.createElement("DIV");

                        a.setAttribute("id", this.id + "autocomplete-list");
                        a.setAttribute("class", "autocomplete-items list-group text-left");

                        /*append the DIV element as a child of the autocomplete container:*/
                        this.parentNode.appendChild(a);

                        /*for each item in the array...*/
                        for (i = 0; i < arr.length; i++) {
                            /*check if the item starts with the same letters as the text field value:*/
                            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                                /*create a DIV element for each matching element:*/
                                b = document.createElement("DIV");
                                b.setAttribute("class", "list-group-item list-group-item-action");
                                /*make the matching letters bold:*/
                                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                                b.innerHTML += arr[i].substr(val.length);
                                /*insert a input field that will hold the current array item's value:*/
                                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                                /*execute a function when someone clicks on the item value (DIV element):*/
                                b.addEventListener("click", function (e) {
                                    /*insert the value for the autocomplete text field:*/
                                    inp.value = this.getElementsByTagName("input")[0].value;
                                    /*close the list of autocompleted values,
                                        (or any other open lists of autocompleted values:*/
                                    closeAllLists();
                                });
                                a.appendChild(b);
                            }
                        }
                    });

                    /*execute a function presses a key on the keyboard:*/
                    inp.addEventListener("keydown", function (e) {
                        var x = document.getElementById(this.id + "autocomplete-list");
                        if (x) x = x.getElementsByTagName("div");
                        if (e.keyCode == 40) {
                            /*If the arrow DOWN key is pressed,
                                increase the currentFocus variable:*/
                            currentFocus++;
                            /*and and make the current item more visible:*/
                            addActive(x);
                        } else if (e.keyCode == 38) {
                            //up
                            /*If the arrow UP key is pressed,
                                decrease the currentFocus variable:*/
                            currentFocus--;
                            /*and and make the current item more visible:*/
                            addActive(x);
                        } else if (e.keyCode == 13) {
                            /*If the ENTER key is pressed, prevent the form from being submitted,*/
                            e.preventDefault();
                            if (currentFocus > -1) {
                                /*and simulate a click on the "active" item:*/
                                if (x) x[currentFocus].click();
                            }
                        }
                    });

                    let addActive = (x) => {
                        /*a function to classify an item as "active":*/
                        if (!x) return false;
                        /*start by removing the "active" class on all items:*/
                        removeActive(x);
                        if (currentFocus >= x.length) currentFocus = 0;
                        if (currentFocus < 0) currentFocus = x.length - 1;
                        /*add class "autocomplete-active":*/
                        x[currentFocus].classList.add("active");
                    }

                    let removeActive = (x) => {
                        /*a function to remove the "active" class from all autocomplete items:*/
                        for (let i = 0; i < x.length; i++) {
                            x[i].classList.remove("active");
                        }
                    }

                    let closeAllLists = (elmnt) => {
                        /*close all autocomplete lists in the document,
                        except the one passed as an argument:*/
                        var x = document.getElementsByClassName("autocomplete-items");
                        for (var i = 0; i < x.length; i++) {
                            if (elmnt != x[i] && elmnt != inp) {
                                x[i].parentNode.removeChild(x[i]);
                            }
                        }
                    }

                    /*execute a function when someone clicks in the document:*/
                    document.addEventListener("click", function (e) {
                        closeAllLists(e.target);
                    });

                };


                /* An array containing all the product names */
                ${productNames}

                /*initiate the autocomplete function on the "myInput" element, and pass along the products array as possible autocomplete values:*/
                autocomplete(document.getElementById("userInput"), products);
            </script>`
            console.log(hbsScriptText);
            req.productNames = productNames;
            req.autofillScript = hbsScriptText;
        } 
        return next();
    });
}


