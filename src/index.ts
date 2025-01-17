import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import "express-async-errors";

import { errorHandler } from "./middleware/errors";
import { routes } from "./routes";

const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use('/', routes);

app.use(function (req, res) {
    res.sendStatus(404);
});

app.use(errorHandler);

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

