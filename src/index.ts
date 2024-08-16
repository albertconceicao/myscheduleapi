import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import '../dotenv.config';

import 'express-async-errors';

import { MongoURI } from './config/key';
import { router } from './routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

const database = MongoURI;

mongoose
	.connect(database)
	.then(() => {
		console.log('Atlas Connected...');
	})
	.catch((err) => console.log(err));

app.use((error: any, request: any, response: any, next: any) => {
	console.log('###### Error Handler ######');
	console.log(error);
	response.sendStatus(500);
});
app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
