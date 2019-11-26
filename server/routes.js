import * as express from 'express';
import DB from './db';

const router = express.Router();

router.get("/api/allCompanies", async (req, res) => {
    try {
        let companies = await DB.Company.all();
        res.json(companies);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;