const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGOBD_PASSWORD;

const convertedUsername = encodeURIComponent(username!);
const convertedPassword = encodeURIComponent(password!);
export const MongoURI = `mongodb+srv://${convertedUsername}:${convertedPassword}@myschedule.xutyw.mongodb.net/?retryWrites=true&w=majority&appName=MySchedule`;
