import { Connection } from './index';

export const user_login = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL user_login(?, ?)",
            [params.username, params.password],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_user_info = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * from UserLogin",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    user_login,
    get_user_info
}