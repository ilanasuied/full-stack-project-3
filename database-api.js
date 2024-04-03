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

//remove a contect from the contact list
function  removeContect(database, name){
    let currentUserName = database.getItem('currentUser');
    let user = JSON.parse(database.getItem(currentUserName));
    delete user.contact[name];
    database.setItem(currentUserName, JSON.stringify(user));
}