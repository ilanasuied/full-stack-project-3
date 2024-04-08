
//add to the database a new user
// this function return 
//0 if everything its ok
//1 if the username is already taken  
//2 if the email is invalid 
//3 if the username is empty
//4 if the password is empty
function post(database, data){
    let username;
    let password;
    let name;
    let email;
    let keyValuePairs = data.split('&');
    if(keyValuePairs.length == 2){
        return log_in(database, keyValuePairs);
    }
    for (let pair of keyValuePairs) {
        let parts = pair.split('=');
        if (parts[0] === 'username') {
            username = parts[1];
        }
        else if (parts[0] === 'password') {
            password = parts[1];
        }
        else if (parts[0] === 'name') {
            name = parts[1];
        }
        else if (parts[0] === 'email') {
            email = parts[1];
        }
    }
    if(searchUser(database, username)){
        return 1;
    }
    if(!checkMail(email)){
        return 2;
    }
    if(username === ''){
        return 3;
    }
    if(password === ''){
        return 4;
    }
    addUser(database, username, password, name, email);
    return 0;
} 


//connect a user
function log_in(database, keyValuePairs){
    let username, password;
    for (let pair of keyValuePairs) {
        let parts = pair.split('=');
        if (parts[0] === 'username') {
            username = parts[1];
        }
        else if (parts[0] === 'password') {
            password = parts[1];
        }
    }
    if(!searchUser(database, username)){
        return false;
    }
    if(getPassword(database, username) !== password){
       return false
    }
    setCurrentUser(database, username);
    return true;
}


//get from the database all the contacts of the current user
function get(database, data){
    if(data == null){
        return selectAll(database);
    }
    else{
        let contact = searchContact(database, data);
        return contact;
    }
}


//add a new contact to the current user
function put(database, data){
    let name;
    let number;
    let newName;
    let keyValuePairs = data.split('&');
    if(keyValuePairs.length == 2) {
        for (let pair of keyValuePairs) {
            // Split each pair by '=' to separate the key and value
            let parts = pair.split('=');
            // Check if the key is 'username'
            if (parts[0] === 'name') {
                // Extract the username (value)
                name = parts[1];
            }
            // Check if the key is 'password'
            if (parts[0] === 'number') {
                // Extract the password (value)
                number = parts[1];
            }
        }
        console.log(name);
        console.log(number);
        addContact(database, name, number);
        return `${name} was successfully added`
    }
    if(keyValuePairs.length == 3) {
        for (let pair of keyValuePairs) {
            // Split each pair by '=' to separate the key and value
            let parts = pair.split('=');
            // Check if the key is 'username'
            if (parts[0] === 'oldName') {
                // Extract the old username (value)
                name = parts[1];
            }
            // Check if the second is the new name
            if (parts[0] === 'name') {
                // Extract the new name (value)
                newName = parts[1];
            }
            // Check if the third is the number
            if (parts[0] === 'number') {
                // Extract the number (value)
                number = parts[1];
            }
        }
        console.log(name);
        console.log(newName);
        console.log(number);
        updateContact(database, name, newName, number);
        return `${name} updated to ${newName} with number ${number}`;
    }
    
}

//remove someone from the contact list of the current user
function dlt(database, data){
    console.log(data, typeof(data));
    removeContect(database, data);
    return `${data} was successfully removed`;
}

function checkMail(mail){
    if (!mail.match(/^.+\@\w+\.\w+$/)) 
    {
        return false;
    }
    return true;
}