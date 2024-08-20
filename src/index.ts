import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import '../dotenv.config';

import 'express-async-errors';

import { cors } from './app/middlewares/cors';
import logger from './app/utils/logger';
import { MongoURI } from './config/key';
import { router } from './routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors);

app.use(router);

const database = MongoURI;

mongoose
	.connect(database)
	.then(() => {
		logger.info('Database connected');
	})
	.catch((err) => logger.error(err));

app.use((error: any, request: any, response: any, next: any) => {
	logger.error(`###### Error Handler ######`, error);
	response.sendStatus(500);
});
app.listen(PORT, () =>
	logger.info(`Server started at http://localhost:${PORT}`),
);
