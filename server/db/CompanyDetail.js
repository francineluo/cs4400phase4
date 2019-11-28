import { Connection } from './index';

export const admin_view_comDetail_emp = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL admin_view_comDetail_emp(?)",
            [params.comName],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const admin_view_comDetail_th = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL admin_view_comDetail_th(?)",
            [params.comName],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_company_employees = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM AdComDetailEmp",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_comDetail_theaters = async () => {
    console.log("hello");
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM AdComDetailTh",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    admin_view_comDetail_emp,
    admin_view_comDetail_th,
    get_company_employees,
    get_comDetail_theaters
}