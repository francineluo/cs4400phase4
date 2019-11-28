import { Connection } from './index';

export const user_filter_th = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL user_filter_th(?,?,?,?)",
            [params.theater || undefined, params.company || undefined, params.city || undefined, params.state || undefined],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const user_visit_th = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL user_visit_th(?,?,?,?)",
            [params.theater, params.company, params.visitDate, params.username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const user_get_filtered_th = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM UserFilterTh",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_all_theaters = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT thName FROM Theater",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    user_filter_th,
    user_visit_th,
    user_get_filtered_th,
    get_all_theaters
}