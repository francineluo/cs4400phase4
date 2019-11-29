import { Connection } from './index';

export const admin_create_theater = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL admin_create_theater(?, ?, ?, ?, ?, ?, ?, ?)",
            [params.thName, params.comName, params.street, params.city, params.state, params.zip, params.capacity, params.manager],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_company_theaters = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT thName FROM Theater WHERE Theater.comName = ?",
            [params.comName || undefined],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_eligible_managers = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT username FROM Manager WHERE username NOT IN "
            + "(SELECT DISTINCT username FROM Manager INNER JOIN Theater ON Manager.username = Theater.manUsername) "
            + "AND comName = ?",
            [params.company],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    admin_create_theater,
    get_company_theaters,
    get_eligible_managers
}