import * as mysql from 'mysql';
import config from '../config';

//import queries
import Login from './Login';
import Registration from './Registration';
import ManageUser from './ManageUser';
import ManageCompany from './ManageCompany';
import CreateTheater from './CreateTheater';
import CompanyDetail from './CompanyDetail';
import CreateMovie from './CreateMovie';
import TheaterOverview from './TheaterOverview';
import ScheduleMovie from './ScheduleMovie';
import ExploreMovie from './ExploreMovie';
import ViewHistory from './ViewHistory';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if (err) console.log(err);
    console.log("Connected!");
});

export default {
    Login,
    Registration,
    ManageUser,
    ManageCompany,
    CreateTheater,
    CompanyDetail,
    CreateMovie,
    TheaterOverview,
    ScheduleMovie,
    ExploreMovie,
    ViewHistory
}