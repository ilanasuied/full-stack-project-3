
// var btn = document.getElementById('submitBtn');
// btn.addEventListener('click', function () {
//     //save the username and the password
//     const username = document.getElementById("name").value;
//     const password = document.getElementById("password").value;

//     let ourRequest = new FXMLHttpRequest();

//     ourRequest.onreadystatechange = function () {
//         if (ourRequest.readyState === 4 && ourRequest.status === 200) {
//             document.getElementById("demo").innerHTML = this.responseText;

//         }
//     }
//     ourRequest.open('POST', localStorage);
//     ourRequest.send(`username=${username}&password=${password}`);
// });


// let viewall = document.getElementById('viewall');
// viewall.addEventListener('click', function () {
//     let ourRequest = new FXMLHttpRequest();
//     ourRequest.onreadystatechange = function () {
//         if (ourRequest.readyState === 4 && ourRequest.status === 200) {
//             let htmlContent = '';
//             for (let key in this.responseText) {
//                 htmlContent += `<p>${key}: ${this.responseText[key]}</p>`;
//             }
//             document.getElementById("demo2").innerHTML = htmlContent;

//         }
//     }
//     ourRequest.open('GET', localStorage);
//     ourRequest.send();
// });


// let addbtn = document.getElementById('addContact');
// addbtn.addEventListener('click', function () {
//     //save the username and the password
//     const name = document.getElementById("newContact").value;
//     const number = document.getElementById("number").value;

//     let ourRequest = new FXMLHttpRequest();

//     ourRequest.onreadystatechange = function () {
//         if (ourRequest.readyState === 4 && ourRequest.status === 200) {
//             document.getElementById("demo3").innerHTML = this.responseText;

//         }
//     }
//     ourRequest.open('PUT', localStorage);
//     ourRequest.send(`name=${name}&number=${number}`);
// });



// let removebtn = document.getElementById('removebtn');
// removebtn.addEventListener('click', function () {
//     //save the username and the password
//     const name = document.getElementById("remove").value;

//     let ourRequest = new FXMLHttpRequest();

//     ourRequest.onreadystatechange = function () {
//         if (ourRequest.readyState === 4 && ourRequest.status === 200) {
//             document.getElementById("demo4").innerHTML = this.responseText;

//         }
//     }

//     ourRequest.open('DELETE', localStorage);
//     ourRequest.send(name);
// });



//new user registration
var errorConnection = false;
let registerbtn = document.getElementById('regist');
registerbtn.addEventListener('click', function(){
    errorConnection = false;
    document.getElementById('msg').style.display = 'block';
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    let ourRequest = new FXMLHttpRequest();
    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            if(!this.responseText){
                document.getElementById("msg").classList.add('msg');
                document.getElementById("msg").innerHTML = 'This username is already taken';
                errorConnection = true;
                let interval = setInterval(function(){
                    document.getElementById('msg').style.display = 'none';
                    clearInterval(interval);
                },2000);
            }
            
        }
    }

    ourRequest.open('POST', localStorage);
    ourRequest.send(`username=${username}&password=${password}&name=${name}&email=${email}`);
});


//an existing user connects to the site
let loginbtn = document.getElementById('btnsignin');
loginbtn.addEventListener('click', function(){
    errorConnection = false;
    document.getElementById('errorMsg').style.display = 'block';
    let username = document.getElementById('username-login').value;
    let password = document.getElementById('password-login').value;
    let ourRequest = new FXMLHttpRequest();
    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            if(!this.responseText){
                errorConnection = true;
                document.getElementById("errorMsg").classList.add('msg');
                document.getElementById("errorMsg").innerHTML = 'Wrong username or password';
                let interval = setInterval(function(){
                    document.getElementById('errorMsg').style.display = 'none';
                    clearInterval(interval);
                },2000);
                
            }
        }
    }

    ourRequest.open('POST', localStorage);
    ourRequest.send(`username=${username}&password=${password}`);
});


//Show all the contact list
let contact_page = document.getElementById('contact-page');
contact_page.addEventListener('click', showAllContact);
function showAllContact(){
    let ourRequest = new FXMLHttpRequest();
    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            let htmlContent = '';
            for (let key in this.responseText) {
                htmlContent += `<tr>
                                    <td>${key}</td>
                                    <td>${this.responseText[key]}</td>
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
addContactButton.addEventListener('click', function() {
  modal.style.display = 'block';
});

// Close the modal when the user clicks the close button
closeButton.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Close the modal when the user clicks outside of the modal
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// Prevent the modal from closing if the user clicks inside the form
contactForm.addEventListener('click', function(event) {
  event.stopPropagation();
});


//add a new contact
let addbtn = document.getElementById('add_contact');
addbtn.addEventListener('click', function () {
    //save the username and the password
    const name = document.getElementById("newContactName").value;
    const number = document.getElementById("phone_number").value;

    let ourRequest = new FXMLHttpRequest();

    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
           // document.getElementById("demo3").innerHTML = this.responseText;
           modal.style.display = 'none';
           showAllContact();
        }
    }
    ourRequest.open('PUT', localStorage);
    ourRequest.send(`name=${name}&number=${number}`);
});