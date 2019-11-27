import { Connection } from './index';

export const admin_filter_user = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL admin_filter_user(?,?,?,?)",
            [params.username || undefined, params.status, params.sortBy || undefined, params.sortDirection || undefined],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_filtered_users = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM AdFilterUser",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    admin_filter_user,
    get_filtered_users
}