
var btn = document.getElementById('submitBtn');
btn.addEventListener('click', function () {
    //save the username and the password
    const username = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    let ourRequest = new FXMLHttpRequest();

    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            document.getElementById("demo").innerHTML = this.responseText;

        }
    }
    ourRequest.open('POST', localStorage);
    ourRequest.send(`username=${username}&password=${password}`);
});


let viewall = document.getElementById('viewall');
viewall.addEventListener('click', function () {
    let ourRequest = new FXMLHttpRequest();
    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            let htmlContent = '';
            for (let key in this.responseText) {
                htmlContent += `<p>${key}: ${this.responseText[key]}</p>`;
            }
            document.getElementById("demo2").innerHTML = htmlContent;

        }
    }
    ourRequest.open('GET', localStorage);
    ourRequest.send();
});


let addbtn = document.getElementById('addContact');
addbtn.addEventListener('click', function () {
    //save the username and the password
    const name = document.getElementById("newContact").value;
    const number = document.getElementById("number").value;

    let ourRequest = new FXMLHttpRequest();

    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            document.getElementById("demo3").innerHTML = this.responseText;

        }
    }
    ourRequest.open('PUT', localStorage);
    ourRequest.send(`name=${name}&number=${number}`);
});



let removebtn = document.getElementById('removebtn');
removebtn.addEventListener('click', function () {
    //save the username and the password
    const name = document.getElementById("remove").value;

    let ourRequest = new FXMLHttpRequest();

    ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
            document.getElementById("demo4").innerHTML = this.responseText;

        }
    }

    ourRequest.open('DELETE', localStorage);
    ourRequest.send(name);
});