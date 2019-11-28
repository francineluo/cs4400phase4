import * as express from 'express';
import DB from './db';

const router = express.Router();

//Screen 1: User login
router.get('/api/user_login', async (req, res) => {
    try {
        let queryResult = await DB.Login.user_login(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_user_info', async (req, res) => {
    try {
        let queryResult = await DB.Login.get_user_info(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 3-6: General registration stuff
router.get('/api/get_all_usernames', async (req, res) => {
    try {
        let queryResult = await DB.Registration.get_all_usernames(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_all_creditcards', async (req, res) => {
    try {
        let queryResult = await DB.Registration.get_all_creditcards(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_all_companies', async (req, res) => {
    try {
        let queryResult = await DB.Registration.get_all_companies(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 3: User register
router.get('/api/user_register', async (req, res) => {
    try {
        let queryResult = await DB.Registration.user_register(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 4: Customer-Only register
router.get('/api/customer_only_register', async (req, res) => {
    try {
        let queryResult = await DB.Registration.customer_only_register(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/customer_add_creditcard', async (req, res) => {
    try {
        let queryResult = await DB.Registration.customer_add_creditcard(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 5: Manager-Only register
router.get('/api/manager_only_register', async (req, res) => {
    try {
        let queryResult = await DB.Registration.manager_only_register(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 6: Manager-Customer register
router.get('/api/manager_customer_register', async (req, res) => {
    try {
        let queryResult = await DB.Registration.manager_customer_register(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/manager_customer_add_creditcard', async (req, res) => {
    try {
        let queryResult = await DB.Registration.manager_customer_add_creditcard(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


//Screen 13: Admin filter user
router.get('/api/admin_approve_user', async (req, res) => {
    try {
        let queryResult = await DB.ManageUser.admin_approve_user(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/admin_decline_user', async (req, res) => {
    try {
        let queryResult = await DB.ManageUser.admin_decline_user(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/admin_filter_user', async (req, res) => {
    try {
        let queryResult = await DB.ManageUser.admin_filter_user(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_filtered_users', async (req, res) => {
    try {
        let queryResult = await DB.ManageUser.get_filtered_users();
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


//Screen 14: Admin filter company
router.get('/api/admin_filter_company', async (req, res) => {
    try {
        let queryResult = await DB.ManageCompany.admin_filter_company(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_filtered_companies', async (req, res) => {
    try {
        let queryResult = await DB.ManageCompany.get_filtered_companies();
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 15: Admin create theater
router.get('/api/admin_create_theater', async (req, res) => {
    try {
        let queryResult = await DB.CreateTheater.admin_create_theater(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_company_theaters', async (req, res) => {
    try {
        let queryResult = await DB.CreateTheater.get_company_theaters(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_eligible_managers', async (req, res) => {
    try {
        let queryResult = await DB.CreateTheater.get_eligible_managers();
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 16: Admin view company detail
router.get('/api/admin_view_comDetail_emp', async (req, res) => {
    try {
        let queryResult = await DB.CompanyDetail.admin_view_comDetail_emp(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/admin_view_comDetail_th', async (req, res) => {
    try {
        let queryResult = await DB.CompanyDetail.admin_view_comDetail_th(req.query);
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_company_employees', async (req, res) => {
    try {
        let queryResult = await DB.CompanyDetail.get_company_employees();
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_comDetail_theaters', async (req, res) => {
    console.log("boats");
    try {
        let queryResult = await DB.CompanyDetail.get_comDetail_theaters();
        res.json(queryResult);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Screen 17: Admin create movie

//Screen 18: Manager filter theater

//Screen 19: Manager schedule movie

//Screen 20: Customer filter movie

//Screen 21: Customer view history

//Screen 22: User explore theater

//Screen 23: User visit history

export default router;