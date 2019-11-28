import { Connection } from './index';

export const manager_schedule_mov = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "CALL manager_schedule_mov(?, ?, ?, ?)",
            [params.manager, params.movie, params.releasedate, params.playdate],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_all_movies = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT movName FROM Movie",
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const get_movie_release_date = async (params) => {
    return new Promise((resolve, reject) => {
        Connection.query(
            "SELECT movReleaseDate FROM Movie WHERE Movie.movName = ?",
            [params.movie],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    manager_schedule_mov,
    get_all_movies,
    get_movie_release_date
}