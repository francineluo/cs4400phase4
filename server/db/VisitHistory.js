import { Connection } from './index';

export const user_filter_visitHistory = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL user_filter_visitHistory(?,?,?)",
            [params.username, params.minVisitDate || undefined, params.maxVisitDate || undefined],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_user_visit_history = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM UserVisitTheater WHERE username = ?",
            [params.username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    user_filter_visitHistory,
    get_user_visit_history
}