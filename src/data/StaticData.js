export default class StaticData {
    //username: [pw, isAdmin, isCustomer, isManager, status, fname, lname, creditCards]
    static dummyUsers = {
        "admin": ["admin", true, false, false, "Approved", "John", "Smith", []],
        "admincustomer": ["admincustomer", true, true, false, "Approved", "Jon", "Smith", ["00001111"]],
        "customer": ["customer", false, true, false, "Pending", "Johnny", "Smith", ["12341234", "56785678"]],
        "manager": ["manager", false, false, true, "Declined", "Jonny", "Smith", []],
        "managercustomer": ["managercustomer", false, true, true, "Approved", "Johnathan", "Smith", ["99991111"]],
        "user": ["user", false, false, false, "Pending", "Jonathan", "Smith", []]
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

    static getCreditCardCount(username) {
        if (typeof this.dummyUsers[username][7] === "undefined")
            return 0;
        return this.dummyUsers[username][7].length;
    }

    static getStatus(username) {
        return this.dummyUsers[username][4];
    }

    static setStatus(username, status) {
        this.dummyUsers[username][4] = status;
    }

    static registerUser(fname, lname, username, pw) {
        //TODO: store hashed password instead of plaintext password
        this.dummyUsers[username] = [pw, false, false, false, "Pending", fname, lname];
        this.setCurrentUser(username);
    }

    static registerCustomer(fname, lname, username, pw, creditCards) {
        //TODO: store hashed password instead of plaintext password, add credit card nums
        this.dummyUsers[username] = [pw, false, true, false, "Pending", fname, lname, creditCards];
        this.setCurrentUser(username);
    }

    static registerManager(fname, lname, username, pw) {
        //TODO: store hashed password instead of plaintext password, add address and company
        this.dummyUsers[username] = [pw, false, false, true, "Pending", fname, lname];
        this.setCurrentUser(username);
    }

    static registerManagerCustomer(fname, lname, username, pw) {
        //TODO: store hashed password instead of plaintext password, add address and company, add credit card nums
        this.dummyUsers[username] = [pw, false, true, true, "Pending", fname, lname];
        this.setCurrentUser(username);
    }
}