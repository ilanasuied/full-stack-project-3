
//add to the database a new user
function post(database, data){
    console.log(data);
    let username;
    let password;
    let name;
    let email;
    let keyValuePairs = data.split('&');
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
    console.log(`the username is ${username}`)
    if(searchUser(username)){
        return false;
    }
    addUser(database, username, password, name, email);
    return true;
} 

//get from the database all the contacts of the current user
function get(database){
    return selectAll(database);
}

//add a new contact to the current user
function put(database, data){
    let name;
    let number;
    let keyValuePairs = data.split('&');
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
    addContact(database, name, number);
    return `${name} was successfully added`
}

//remove someone from the contact list of the current user
function dlt(database, data){
    removeContect(database, data);
    return `${data} was successfully remove`
}