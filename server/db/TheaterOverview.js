import { Connection } from './index';

export const manager_filter_th = async (params) => {
    let includeNotPlayed = (params.includeNotPlayed === "true") ? 1 : 0;
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL manager_filter_th(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [params.manager, params.movie || undefined, params.minDuration || undefined, params.maxDuration || undefined, params.minReleaseDate || undefined, params.maxReleaseDate || undefined, params.minPlayDate || undefined, params.maxPlayDate || undefined, includeNotPlayed],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_filtered_movies = async () => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT * FROM ManFilterTh",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    manager_filter_th,
    get_filtered_movies
}