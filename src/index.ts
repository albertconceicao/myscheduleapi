import logger from './app/utils/logger';
import app from './config/serverConfig';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.debug(`:: Server started in DEBUG Mode ::`);
	logger.info(`:: Server Initializing ... ::`);
	logger.info(`:: Stage=${process.env.STAGE} ::`);
	logger.info(`:: Log Level=${process.env.LOG_LEVEL} ::`);
	logger.info(`Server started at http://localhost:${PORT}`);
});
