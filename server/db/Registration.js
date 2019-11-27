import { Connection } from './index';

//user
export const user_register = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL user_register(?, ?, ?, ?)",
            [params.username, params.password, params.fname, params.lname],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

//customer-only
export const customer_only_register = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL customer_only_register(?, ?, ?, ?)",
            [params.username, params.password, params.fname, params.lname],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const customer_add_creditcard = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL customer_add_creditcard(?, ?)",
            [params.username, params.creditcard],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

//manager-only
export const manager_only_register = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL manager_only_register(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [params.username, params.password, params.fname, params.lname, params.comName, params.street, params.city, params.state, params.zip],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

//manager-customer
export const manager_customer_register = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL manager_customer_register(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [params.username, params.password, params.fname, params.lname, params.comName, params.street, params.city, params.state, params.zip],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const manager_customer_add_creditcard = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL manager_customer_add_creditcard(?, ?)",
            [params.username, params.creditcard],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

//general
export const get_all_usernames = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT username from User",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_all_creditcards = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT creditCardNum from CustomerCreditCard",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_all_companies = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT comName from Company",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    user_register,
    customer_only_register,
    customer_add_creditcard,
    manager_only_register,
    manager_customer_register,
    manager_customer_add_creditcard,
    get_all_usernames,
    get_all_creditcards,
    get_all_companies
}