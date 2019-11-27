import { Connection } from './index';

//TODO: ORDER BY is not working
export const admin_filter_company = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL admin_filter_company(?,?,?,?,?,?,?,?,?)",
            [params.comName, params.minCity || undefined, params.maxCity || undefined, params.minTheater || undefined, params.maxTheater || undefined, params.minEmployee || undefined, params.maxEmployee || undefined, params.sortBy || undefined, params.sortDirection || undefined],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_filtered_companies = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM AdFilterCom",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    admin_filter_company,
    get_filtered_companies
}