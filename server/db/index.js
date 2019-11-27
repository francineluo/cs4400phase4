import * as mysql from 'mysql';
import config from '../config';

//import queries
import Company from './Company';
import User from './User';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if (err) console.log(err);
    console.log("Connected!");
});

export default {
    Company,
    User
}