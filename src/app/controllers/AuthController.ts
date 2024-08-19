import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import '../../../dotenv.config';

import { CustomersRepository } from '../repositories/CustomersRepository';

const CustomersRepositoryFunction = new CustomersRepository();

const SECRET = process.env.JWT_SECRET as string;

export class AuthController {
	async login(request: any, response: any) {
		const { email, password } = request.body;

		const customer = await CustomersRepositoryFunction.findByEmail(email);

		if (!customer) {
			return response.status(401).json({
				error: 'Usuário não encontrado',
				data: {
					email,
				},
			});
		}

		const validatedPassword = bcrypt.compareSync(password, customer.password);

		if (!validatedPassword) {
			return response.status(401).json({
				error: 'Não autorizado!',
			});
		}

		const token = jwt.sign(
			{ name: customer.name, email: customer.email },
			SECRET,
		);
		response.json({
			statusCode: 200,
			message: 'Usuário logado com sucesso!',
			data: {
				token,
			},
		});
	}

	async verifyToken(request: any, response: any, next: any) {
		// eslint-disable-next-line prettier/prettier, dot-notation
		const tokenHeader = request.headers['authorization'];
		const token = tokenHeader && tokenHeader.split(' ')[1];

		if (!token) {
			return response.status(401).json({
				error: 'Não autorizado!',
			});
		}

		try {
			const decoded = jwt.verify(token, SECRET);
			response.json({
				statusCode: 200,
				message: 'Token válido',
				data: {
					decoded,
				},
			});
			next();
			console.log('Here');
		} catch (error) {
			response.status(401).json({
				statusCode: 401,
				message: 'Token inválido',
				error,
			});
		}
	}
}
