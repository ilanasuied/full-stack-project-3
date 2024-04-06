// username: {
//     name: '####'
//     email: '####'
//     contact: {
//         name1: number1,
//         name2: number2
//         }
//     password: '####'
// }


//this function add a new user to the database and update the currentUser
function addUser(database, username, password, name, email){
    let user = {
        username: username,
        password: password,
        name: name,
        email: email,
        contact: {}
    }
    //store the date on the local storage
    database.setItem(username, JSON.stringify(user));

    //store in the key 'currentuser' the username of the user that is courently log in 
    setCurrentUser(database, username);
}


//this function return true if this user exist, else return false
function searchUser(database, username){
    if(database.getItem(username) === null){
        return false;
    }
    return true;
}

//get the password of an user
function getPassword(database, username){
    if(database.getItem(username) !== null){
        let user = JSON.parse(database.getItem(username));
        return user.password;
    }
}


//store in the key 'currentuser' the username of the user that is courently log in 
function setCurrentUser(database, username){
    database.setItem('currentUser', username);
}


//return all the contact of the current user
function selectAll(database){
    let currentUserName = database.getItem('currentUser');
    let user = JSON.parse(database.getItem(currentUserName));
    return user.contact
}


//add a new contact to the contact list
function addContact(database, name, number){
    let currentUserName = database.getItem('currentUser');
    let user = JSON.parse(database.getItem(currentUserName));
    user.contact[name] = number;
    database.setItem(currentUserName, JSON.stringify(user));
}

//remove a contact from the contact list
function removeContect(database, name){
    let currentUserName = database.getItem('currentUser');
    let user = JSON.parse(database.getItem(currentUserName));
    console.log(name, typeof(name));
    delete user.contact[name];
    database.setItem(currentUserName, JSON.stringify(user));
}

//update a contact in the contact list
function updateContact(database, oldName, newName, newNumber) {
    let currentUserName = database.getItem('currentUser');
    let user = JSON.parse(database.getItem(currentUserName));

    // Check if the contact with the oldName exists
    if (user && user.contact && user.contact[oldName]) {
        // Update the contact's name and number
        user.contact[newName] = user.contact[oldName];
        delete user.contact[oldName]; // Remove the old contact entry
        user.contact[newName] = newNumber; // Update the number

        // Update the database with the modified user data
        database.setItem(currentUserName, JSON.stringify(user));

    } else {
        return `${oldName} not found in the contact list`;
    }
}


//search a contact in the contact list 
function searchContact(database, name){
    let currentUserName = database.getItem('currentUser');
    let user = JSON.parse(database.getItem(currentUserName));
    // Search for the contact by name in the contact list
    if (user.contact[name]) {
        // Create an object containing the name and number of the contact
        let contact = {
            name: name,
            number: user.contact[name]
        };
        return contact;
    } else {
        console.log('Contact not found');
        return null; // or handle the case where the contact is not found
    }
    
}