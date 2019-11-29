export default class StaticData {
    static currentUser;
    //currentUser = [username, status, isCustomer, isAdmin, isManager]

    static getCurrentUser() {
        return this.currentUser;
    }

    static setCurrentUser(userInfo) {
        this.currentUser = userInfo[0];
    }

    static logoutCurrentUser() {
        this.currUser = [];
    }
}