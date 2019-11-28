import { Connection } from './index';

export const customer_view_history = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL customer_view_history(?)",
            [params.username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_customer_view_history = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM CosViewHistory",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    customer_view_history,
    get_customer_view_history
}