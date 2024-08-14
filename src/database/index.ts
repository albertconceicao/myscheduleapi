import { run } from 'node:test';

const { MongoClient, ServerApiVersion } = require('mongodb');

const username = encodeURIComponent('developeralbert');
const password = encodeURIComponent('Gt@lph@2023');
const uri = `mongodb+srv://${username}:${password}@myschedule.xutyw.mongodb.net/?retryWrites=true&w=majority&appName=MySchedule`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export const Query = async function run(query: string, tableName: string) {
	try {
		await client.connect();
		const database = client.db('sample_mflix');
		const table = database.collection(tableName);
		const query = {};
		const options = {
			limit: 10,
		};

		const cursor = table.find(query, options);

		await cursor.forEach((doc) => {
			console.log(doc);
		});
	} finally {
		await client.close();
	}
};
run().catch(console.dir);
