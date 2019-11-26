import * as mysql from 'mysql';
import config from '../config';

//import tables
import Company from './Company';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if (err) console.log(err);
    console.log("Connected!");
});

export default {
    Company
}