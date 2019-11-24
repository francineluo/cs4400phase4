export default class StaticData {
    //username: [pw, isAdmin, isCustomer, isManager, fname, lname, creditCards]
    static dummyUsers = {
        "admin": ["admin", true, false, false],
        "admincustomer": ["admincustomer", true, true, false],
        "customer": ["customer", false, true, false],
        "manager": ["manager", false, false, true],
        "managercustomer": ["managercustomer", false, true, true],
        "user": ["user", false, false, false]
    };
    static currentUser;

    static getCurrentUser() {
        return this.currentUser;
    }

    static setCurrentUser(username) {
        this.currentUser = username;
    }

    static getAllUsernames() {
        let usernames = [];
        for (let key in this.dummyUsers) {
            usernames.push(key);
        }
        return usernames;
    }

    static getPassword(username) {
        return this.dummyUsers[username][0];
    }

    static getUserType(username) {
        return this.dummyUsers[username].slice(1, 4);
    }

    static registerUser(fname, lname, username, pw) {
        //TODO: store hashed password instead of plaintext password
        this.dummyUsers[username] = [pw, false, false, false, fname, lname];
        this.setCurrentUser(username);
    }

    static registerCustomer(fname, lname, username, pw, creditCards) {
        //TODO: store hashed password instead of plaintext password, add credit card nums
        this.dummyUsers[username] = [pw, false, true, false, fname, lname, creditCards];
        this.setCurrentUser(username);
    }

    static registerManager(fname, lname, username, pw) {
        //TODO: store hashed password instead of plaintext password, add address and company
        this.dummyUsers[username] = [pw, false, false, true, fname, lname];
        this.setCurrentUser(username);
    }

    static registerManagerCustomer(fname, lname, username, pw) {
        //TODO: store hashed password instead of plaintext password, add address and company, add credit card nums
        this.dummyUsers[username] = [pw, false, true, true, fname, lname];
        this.setCurrentUser(username);
    }
}