var alphabeticalOrder = false;
var alphabeticalDownOrder = false;



///////////////////////////////////////features for the register page/////////////////////////////////////////////


//new user registration
var errorConnection = false;
let registerbtn = document.getElementById('regist');
registerbtn.addEventListener('click', function () {
    errorConnection = false;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    let ourRequest = new FXMLHttpRequest();
    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            if (this.responseText !== 0) {
                document.getElementById('msg').style.display = 'block';
                document.getElementById("msg").classList.add('msg');
                if (this.responseText === 1) {
                    document.getElementById("msg").innerHTML = 'This username is already taken';
                }
                else if (this.responseText === 2) {
                    document.getElementById("msg").innerHTML = 'Please enter a correct email';
                }
                else if (this.responseText === 3) {
                    document.getElementById("msg").innerHTML = 'Username cannot be empty';
                }
                else if (this.responseText === 4) {
                    document.getElementById("msg").innerHTML = 'Password cannot be empty';
                }
                errorConnection = true;
                let interval = setInterval(function () {
                    document.getElementById('msg').style.display = 'none';
                    clearInterval(interval);
                }, 2000);
            }
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
        }
    }

    ourRequest.open('POST', localStorage);
    ourRequest.send(`username=${username}&password=${password}&name=${name}&email=${email}`);
});


/////////////////////////////////////////feature for the log in page////////////////////////////////////////////////



// An existing user connects to the site
let loginbtn = document.getElementById('btnsignin');
const contactPageLink = document.getElementById('contact-page');
// Initially disable the contact page link
contactPageLink.classList.add('disabled');

loginbtn.addEventListener('click', function () {
    errorConnection = false;
    let username = document.getElementById('username-login').value;
    let password = document.getElementById('password-login').value;
    let ourRequest = new FXMLHttpRequest();
    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            if (!this.responseText) {
                errorConnection = true;
                document.getElementById('errorMsg').style.display = 'block';
                document.getElementById("errorMsg").classList.add('msg');
                document.getElementById("errorMsg").innerHTML = 'Wrong username or password';
                let interval = setInterval(function () {
                    document.getElementById('errorMsg').style.display = 'none';
                    clearInterval(interval);
                }, 2000);
            }
        }
        else {
            contactPageLink.classList.remove('disabled');
        }
        document.getElementById('username-login').value = "";
        document.getElementById('password-login').value = "";
    }

    ourRequest.open('POST', localStorage);
    ourRequest.send(`username=${username}&password=${password}`);
});


/////////////////////////////////////////feature for the contact page////////////////////////////////////////////////



//Show all the contact list
let contact_page = document.getElementById('contact-page');
contact_page.addEventListener('click', showAllContact);
let showAllButton = document.getElementById('showAllButton');
showAllButton.addEventListener('click', showAllContact);

function showAllContact() {

    //clear the search field
    document.getElementById('searchbar').value = '';
    let ourRequest = new FXMLHttpRequest();
    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            let htmlContent = '';
            let contact_list = this.responseText;

            //if alphabeticalOrder is true
            if (alphabeticalOrder || alphabeticalDownOrder) {
                // keeps all the keys
                let keys = Object.keys(contact_list);

                // sorted in alphabetical order
                keys.sort();

                //reverse the order to show z-a
                if (alphabeticalDownOrder) {
                    keys.reverse();
                }
                let newContactList = {};
                keys.forEach(function (k) {
                    newContactList[k] = contact_list[k];
                });
                contact_list = newContactList;
                alphabeticalOrder = false;
                alphabeticalDownOrder = false;
            }
            for (let key in contact_list) {
                // element to delete
                let bin = document.createElement("img");
                bin.src = "./IMG/dustbin.png";
                bin.className = "removebtn";
                bin.dataset.id = key;

                // element to update
                let upd = document.createElement("img");
                upd.src = "./IMG/update.png";
                upd.className = "update";
                upd.dataset.id = key;
                upd.dataset.number = contact_list[key];

                htmlContent += `<tr>
                                    <td>${key}</td>
                                    <td>${contact_list[key]}</td>
                                    <td>${bin.outerHTML}</td>
                                    <td>${upd.outerHTML}</td>
                                </tr>`;
            }
            document.getElementById("tbody_contact").innerHTML = htmlContent;
        }
    }
    ourRequest.open('GET', localStorage);
    ourRequest.send();
}



// Select the necessary elements
let addContactButton = document.getElementById('addContactButton');
let modal = document.getElementById('modal');
let closeButton = document.getElementsByClassName('close')[0];
let contactForm = document.getElementById('contactForm');

// Open the modal when the button is clicked
addContactButton.addEventListener('click', function () {
    modal.style.display = 'block';
});

// Close the modal when the user clicks the close button
closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Close the modal when the user clicks outside of the modal
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Prevent the modal from closing if the user clicks inside the form
contactForm.addEventListener('click', function (event) {
    event.stopPropagation();
});


//add a new contact
let addbtn = document.getElementById('add_contact');
addbtn.addEventListener('click', function () {

    //save the username and the number
    const name = document.getElementById("newContactName").value;
    const number = document.getElementById("phone_number").value;

    //verification of number
    let correct = numberAndNameVerification(name, number);

    if (correct) {
        let ourRequest = new FXMLHttpRequest();

        ourRequest.onreadystatechange = function () {
            if (ourRequest.readyState === 4 && ourRequest.status === 200) {
                modal.style.display = 'none';
                document.getElementById('contactForm').style.display = 'none';
                showAllContact();
            }
        }
        ourRequest.open('PUT', localStorage);
        ourRequest.send(`name=${name}&number=${number}`);

    }
    else {
        // Display error message with OK button
        let errorMessage = document.createElement('div');
        errorMessage.classList.add('msg');
        errorMessage.innerHTML = 'Error: ' + getErrorMessage(name, number);

        let okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', function () {
            // Hide the error message and reset the form
            errorMessage.style.display = 'none';

            document.getElementById("newContactName").value = '';
            document.getElementById("phone_number").value = '';
            document.getElementById('contactForm').style.display = 'block'; // Ensure the form is visible

        });

        errorMessage.appendChild(okButton);
        document.getElementById('contactForm').appendChild(errorMessage);
        errorMessage.style.display = 'block';
    }

    // Reset the form after adding a contact
    document.getElementById("newContactName").value = '';
    document.getElementById("phone_number").value = '';
    document.getElementById('contactForm').style.display = 'block';

});


function numberAndNameVerification(name, number) {
    // Check if name is not empty, number length is 10, and number starts with '05'
    return name.trim() !== '' && number.length === 10 && number.startsWith('05');
}

function getErrorMessage(name, number) {
    if (name.trim() === '') {
        return 'Contact name cannot be empty';
    }
    if (number.length !== 10) {
        return 'Number must contain 10 digits exactly';
    }
    if (!number.startsWith('05')) {
        return 'Number must start with "05"';
    }
}




let del = document.getElementById('del');
let deleteForm = document.getElementById('deleteForm');
let closeBtn = document.getElementsByClassName('close')[1];

// Close the del when the user clicks outside of it
window.addEventListener('click', function (event) {
    if (event.target == del) {
        del.style.display = 'none';
    }
});

// Close the del when the user clicks the close button
closeBtn.addEventListener('click', function () {
    del.style.display = 'none';
});

// Prevent the del from closing if the user clicks inside the form
deleteForm.addEventListener('click', function (event) {
    event.stopPropagation();
});


// Change/Update Details of Contact
const updateRec = document.getElementById('updateContact');
let updateForm = document.getElementById('updateForm');
let closeBt = document.getElementsByClassName('close')[2];

// Close the del when the user clicks outside of it
window.addEventListener('click', function (event) {
    if (event.target == del) {
        updateRec.style.display = 'none';
    }
});

// Close the del when the user clicks the close button
closeBt.addEventListener('click', function () {
    updateRec.style.display = 'none';
});

// Prevent the del from closing if the user clicks inside the form
updateForm.addEventListener('click', function (event) {
    event.stopPropagation();
});

document.addEventListener('click', function (event) {
    // Delete Contact From the list
    if (event.target && event.target.className === 'removebtn') {
        // Extract the name of the current record
        let record = event.target.dataset.id; // Assuming you set the name as a data attribute on the bin logo

        console.log("Bin ID:", record);

        // Show the delete confirmation modal
        document.getElementById("del").style.display = 'block';

        // Handle the click on "Yes" button in the delete confirmation modal
        document.getElementById("del_yes").addEventListener('click', function () {
            let ourRequest = new FXMLHttpRequest();

            ourRequest.onreadystatechange = function () {
                if (ourRequest.readyState === 4 && ourRequest.status === 200) {
                    //deleteForm.innerHTML = this.responseText;
                    del.style.display = 'none';
                    showAllContact();
                }
            }

            ourRequest.open('DELETE', localStorage);
            ourRequest.send(record);
        });

        // Handle the click on "No" button in the delete confirmation modal
        document.getElementById("del_no").addEventListener('click', function () {
            document.getElementById("del").style.display = 'none';
        });
    }

});

document.addEventListener('click', function (event) {
    // Change/Update Details of Contact
    if (event.target && event.target.className === 'update') {
        //save the username and the password
        const oldName = event.target.dataset.id;
        document.getElementById("updateName").value = oldName;
        document.getElementById("updatePhone").value = event.target.dataset.number;
        updateRec.style.display = 'block';
        updateForm.style.display = 'block';
    }
});

 // Handle the click on "Save Changes" button 
 document.getElementById("up_contact").addEventListener('click', function () {
    const oldName = document.getElementById("updateName").value;
    const newName = document.getElementById("updateName").value;
    const newNumber = document.getElementById("updatePhone").value;

    // Verification of inputs
    let correct = numberAndNameVerification(newName, newNumber);

    if (correct) {
        let ourRequest = new FXMLHttpRequest();

        ourRequest.onreadystatechange = function () {
            if (ourRequest.readyState === 4 && ourRequest.status === 200) {
                updateForm.style.display = 'none';
                updateRec.style.display = 'none';
                showAllContact();
            }
        }
        ourRequest.open('PUT', localStorage);
        ourRequest.send(`oldName=${oldName}&name=${newName}&number=${newNumber}`);
    }
    else {
        // Display error message with OK button
        let errorMessage = document.createElement('div');
        errorMessage.classList.add('msg');
        errorMessage.innerHTML = 'Error: ' + getErrorMessage(newName, newNumber);

        let okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', function () {
            // Hide the error message and reset the form
            errorMessage.style.display = 'none';
            document.getElementById('updateForm').style.display = 'block'; // Ensure the form is visible

        });

        errorMessage.appendChild(okButton);
        document.getElementById('updateForm').appendChild(errorMessage);
        errorMessage.style.display = 'block';
    }
});





// Search a Contact 
let searchBar = document.getElementById('searchbar');
let searchbtn = document.getElementById('searchbtn');

searchbtn.addEventListener('click', function (event) {
    event.preventDefault();
    //save the username and the password
    const name = searchBar.value.trim().toLowerCase();  // Trim to remove any leading or trailing whitespace

    if (name !== '') {  // Check if the contact name is not empty
        // Send a POST request to search for the contact
        let ourRequest = new FXMLHttpRequest();

        ourRequest.onreadystatechange = function () {
            if (ourRequest.readyState === 4 && ourRequest.status === 200) {
                let htmlContent = '';
                for (let key in this.responseText) {
                    htmlContent += `<tr>
                                        <td>${key}</td>
                                        <td>${this.responseText[key]}</td>
                                        <td><img src="./IMG/dustbin.png" class="removebtn" data-id="${key}"></td>
                                        <td><img src="./IMG/update.png" class="update" data-id="${key}" data-number="${this.responseText[key]}"></td>
                                    </tr>`;
                }
                document.getElementById("tbody_contact").innerHTML = htmlContent;
            }
        }

        // Adjust the endpoint URL and request type according to your server configuration
        ourRequest.open('GET', localStorage);
        ourRequest.send(name); // Send the contact name in the request body
    }


});

document.getElementById('orderBtnAZ').addEventListener('click', function () {
    alphabeticalOrder = true;
    showAllContact();
});

document.getElementById('orderBtnZA').addEventListener('click', function () {
    alphabeticalDownOrder = true;
    showAllContact();
});