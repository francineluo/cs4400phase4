import * as mysql from 'mysql';
import config from '../config';

//import queries
import ManageCompany from './ManageCompany';
import ManageUser from './ManageUser';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if (err) console.log(err);
    console.log("Connected!");
});

export default {
    ManageCompany,
    ManageUser
}