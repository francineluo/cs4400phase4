import * as express from 'express';
import DB from './db';

const router = express.Router();

//Screen 13: Admin filter user
router.get('/api/admin_approve_user', async (req, res) => {
    try {
        let users = await DB.ManageUser.admin_approve_user(req.query);
        res.json(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/admin_decline_user', async (req, res) => {
    try {
        let users = await DB.ManageUser.admin_decline_user(req.query);
        res.json(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/admin_filter_user', async (req, res) => {
    try {
        let users = await DB.ManageUser.admin_filter_user(req.query);
        res.json(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_filtered_users', async (req, res) => {
    try {
        let users = await DB.ManageUser.get_filtered_users();
        res.json(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


//Screen 14: Admin filter company
router.get('/api/admin_filter_company', async (req, res) => {
    try {
        let companies = await DB.ManageCompany.admin_filter_company(req.query);
        res.json(companies);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/get_filtered_companies', async (req, res) => {
    try {
        let companies = await DB.ManageCompany.get_filtered_companies();
        res.json(companies);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;