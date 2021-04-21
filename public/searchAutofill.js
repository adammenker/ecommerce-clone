"use strict";

        const mysql = require("mysql");
        
        const db = mysql.createPool({
            host: "us-cdbr-east-03.cleardb.com",
            user: "b04903d33dd1c0",
            password: "d17038e0",
            database: "heroku_ce5d691c17f624d"
        });
        

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



        db.query('INSERT INTO products SET ?', {color: 'silver', name: 'shovel', category: 'garden', description: 'This is a shovel', 
                                                units_in_stock: 1, price: 12, length: "24 in.", width: "8 in.", height: "4 in", weight: "6 lbs."}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User Registered'
                });
            }
        });
        
        db.query('SELECT name FROM products', async (error, results) => {
            console.log(results);
            // if(results.length == 0 || !(await bcrypt.compare(password, results[0].password))){
            //     res.status(401).render('login', {
            //         message: 'Email or password is incorrect'
            //     });
            // }else {
            //     const id = results[0].userID;
            //     console.log(results);
            //     // replace string with process.env.JWT_SECRET
            //     const token = jwt.sign({id}, "TEMPprocess.env.JWT_SECRET", {
            //         expiresIn: "90d"// replace number with process.env.JWT_EXPIRES_IN
            //     });

            //     // console.log(`token: ${token}`);

            //     // insert process.env.JWT_COOKIE_EXPIRES where "1" is in multiplication
            //     const cookieOptions = {
            //         expires: new Date(
            //             Date.now + 1 * 24 * 60 * 60 * 1000
            //         ), 
            //         httpOnly: true
            //     }

            //     res.cookie('jwt', token, cookieOptions);
            //     res.status(200).redirect("/");
            // } 
        });
    




        /* An array containing all the product names */
        let products = [
            "Afghanistan",
            "Albania",
            "Algeria",
            "Andorra",
            "Angola",
            "Anguilla",
            "Antigua & Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bermuda",
            "Bhutan",
            "Bolivia",
            "Bosnia & Herzegovina",
            "Botswana",
            "Brazil",
            "British Virgin Islands",
            "Brunei",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cape Verde",
            "Cayman Islands",
            "Central Arfrican Republic",
            "Chad",
            "Chile",
            "China",
            "Colombia",
            "Congo",
            "Cook Islands",
            "Costa Rica",
            "Cote D Ivoire",
            "Croatia",
            "Cuba",
            "Curacao",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Ethiopia",
            "Falkland Islands",
            "Faroe Islands",
            "Fiji",
            "Finland",
            "France",
            "French Polynesia",
            "French West Indies",
            "Gabon",
            "Gambia",
            "Georgia",
            "Germany",
            "Ghana",
            "Gibraltar",
            "Greece",
            "Greenland",
            "Grenada",
            "Guam",
            "Guatemala",
            "Guernsey",
            "Guinea",
            "Guinea Bissau",
            "Guyana",
            "Haiti",
            "Honduras",
            "Hong Kong",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran",
            "Iraq",
            "Ireland",
            "Isle of Man",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jersey",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kiribati",
            "Kosovo",
            "Kuwait",
            "Kyrgyzstan",
            "Laos",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macau",
            "Macedonia",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands",
            "Mauritania",
            "Mauritius",
            "Mexico",
            "Micronesia",
            "Moldova",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Montserrat",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauro",
            "Nepal",
            "Netherlands",
            "Netherlands Antilles",
            "New Caledonia",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "North Korea",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Palestine",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines",
            "Poland",
            "Portugal",
            "Puerto Rico",
            "Qatar",
            "Reunion",
            "Romania",
            "Russia",
            "Rwanda",
            "Saint Pierre & Miquelon",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "South Korea",
            "South Sudan",
            "Spain",
            "Sri Lanka",
            "St Kitts & Nevis",
            "St Lucia",
            "St Vincent",
            "Sudan",
            "Suriname",
            "Swaziland",
            "Sweden",
            "Switzerland",
            "Syria",
            "Taiwan",
            "Tajikistan",
            "Tanzania",
            "Thailand",
            "Timor L'Este",
            "Togo",
            "Tonga",
            "Trinidad & Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Turks & Caicos",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom",
            "United States of America",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Vatican City",
            "Venezuela",
            "Vietnam",
            "Virgin Islands (US)",
            "Yemen",
            "Zambia",
            "Zimbabwe"
        ];

        /*initiate the autocomplete function on the "myInput" element, and pass along the products array as possible autocomplete values:*/
        autocomplete(document.getElementById("myInput"), products);