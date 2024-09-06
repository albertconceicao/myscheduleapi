import path from 'path';

import { Application } from 'express';
import swaggerCombine from 'swagger-combine';
import swaggerUi from 'swagger-ui-express';

import logger from '../app/utils/logger';

const swaggerConfigPath = path.resolve(
	__dirname,
	'../docs/swagger/swagger.json',
);

export function loadSwaggerUi(app: Application) {
	swaggerCombine(swaggerConfigPath)
		.then((swaggerDocument) => {
			app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
			logger.info(
				`Swagger docs available at http://localhost:${
					process.env.PORT || 3000
				}/api-docs`,
			);
		})
		.catch((err: any) => {
			logger.error('Error combining Swagger JSON files', err);
		});
}
