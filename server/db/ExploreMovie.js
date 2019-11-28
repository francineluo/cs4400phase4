import { Connection } from './index';

export const customer_filter_mov = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL customer_filter_mov(?, ?, ?, ?, ?, ?)",
            [params.movie, params.company, params.city, params.state, params.minPlayDate || undefined, params.maxPlayDate || undefined],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const customer_view_mov = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL customer_view_mov(?, ?, ?, ?, ?, ?)",
            [params.creditCard, params.movie, params.releaseDate, params.theater, params.company, params.playDate],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const customer_get_cards = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT creditCardNum FROM CustomerCreditCard WHERE username = ?",
            [params.username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_customer_filtered_mov = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM CosFilterMovie",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    customer_filter_mov,
    customer_view_mov,
    customer_get_cards,
    get_customer_filtered_mov
}