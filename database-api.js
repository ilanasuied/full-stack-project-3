// username: {
//     contact: {
//         name1: number1,
//         name2: number2
//         }
//     password: '####'

// }


//this function add a new user to the database and update the currentUser
function addUser(database, username, password){
    let user = {
        username: username,
        password: password,
        contact: {
            sivane: 123,
            lea: 123
        }
    }
    //store the date on the local storage
    database.setItem(username, JSON.stringify(user));

    //store in the key 'currentuser' the username of the user that is courently log in 
    database.setItem('currentUser', username);
}


//this function return true if this user exist, else return false
function searchUser(username){
    if(localStorage.getItem(username) === null){
        return false;
    }
    return true;
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