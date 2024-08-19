// Connect with Repository
import bcrypt from 'bcrypt';

import { CustomersRepository } from '../repositories/CustomersRepository';

const CustomersRepositoryFunction = new CustomersRepository();

export class CustomerController {
	async index(request: any, response: any) {
		const { orderBy } = request.query;
		const customers = await CustomersRepositoryFunction.findAll(orderBy);

		response.json(customers);
	}

	async show(request: any, response: any) {
		// List a specific records
		const { id } = request.params;
		const customer = await CustomersRepositoryFunction.findById(id);

		if (!customer) {
			return response.status(404).json({ error: 'User not found' });
		}
		response.json(customer);
	}

	async store(request: any, response: any) {
		// Create a new records
		const { name, email, phone, password } = request.body;

		const hashedPassword = bcrypt.hashSync(password, 10);

		request.body.password = hashedPassword;

		console.log({ hashedPassword });

		if (!name || !email) {
			return response
				.status(400)
				.json({ error: 'Name and email are both required' });
		}
		const customerExists = await CustomersRepositoryFunction.findByEmail(email);

		if (customerExists) {
			return response
				.status(400)
				.json({ error: 'This email was already been taken!' });
		}
		const customer = await CustomersRepositoryFunction.create({
			name,
			email,
			phone,
			password: hashedPassword,
		});

		response.json(customer);
	}

	async update(request: any, response: any) {
		// Update a specific records
		const { id } = request.params;
		const { name, email, phone } = request.body;

		const customerExists = await CustomersRepositoryFunction.findById(id);

		if (!customerExists) {
			return response.status(404).json({ error: 'customer not found' });
		}
		if (!name || !email) {
			return response
				.status(400)
				.json({ error: 'Name and email are both required' });
		}
		const customerByEmail =
			await CustomersRepositoryFunction.findByEmail(email);

		if (customerByEmail && customerByEmail._id !== id) {
			return response
				.status(400)
				.json({ error: 'This email was already been taken!' });
		}

		const customer = await CustomersRepositoryFunction.update(id, {
			name,
			email,
			phone,
		});

		response.json(customer);
	}

	async delete(request: any, response: any) {
		// Delete a specific records
		const { id } = request.params;
		const customer = await CustomersRepositoryFunction.findById(id);

		if (!customer) {
			return response.status(404).json({ error: 'User not found' });
		}
		await CustomersRepositoryFunction.delete(id);
		response.sendStatus(204);
	}

	async authenticatedRoute(request: any, response: any) {
		response.json({
			statusCode: 200,
			message: 'Authenticated',
		});
	}
}
