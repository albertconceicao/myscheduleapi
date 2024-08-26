import bodyParser from 'body-parser';
import express from 'express';

import 'express-async-errors';

import { cors } from '../app/middlewares/cors';
import logger from '../app/utils/logger';
import databaseConfig from './database/databaseConfig';
import { router } from '../app/routes/routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors);

databaseConfig.init();

app.use(router);

app.use((error: any, request: any, response: any, next: any) => {
	logger.error(`###### Error Handler ######`, error);
	response.sendStatus(500);
});

export default app;
