import { Connection } from './index';

export const admin_create_mov = async (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL admin_create_mov(?, ?, ?)",
            [params.name, params.duration, params.releasedate],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    admin_create_mov
}