import { Connection } from './index';

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

export default {
    user_register,
    customer_only_register,
    customer_add_creditcard,
    get_all_usernames,
    get_all_creditcards
}