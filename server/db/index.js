import * as mysql from 'mysql';
import config from '../config';

//import queries
import Login from './Login';
import ManageUser from './ManageUser';
import ManageCompany from './ManageCompany';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if (err) console.log(err);
    console.log("Connected!");
});

export default {
    Login,
    ManageUser,
    ManageCompany
}