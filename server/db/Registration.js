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

export default {
    user_register,
    get_all_usernames
}