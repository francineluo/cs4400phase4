import apiRouter from './routes';
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static('public'));
app.use(apiRouter);
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));