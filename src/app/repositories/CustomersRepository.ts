// Connect with Data Source
import mongoose from 'mongoose';

import '../models/User';
import logger from '../utils/logger';

const User = mongoose.model('customers');

interface ICustomer {
	id?: string;
	name: string;
	email: string;
	phone: string;
	password?: string;
}
export class CustomersRepository {
	async findAll(orderBy?: string) {
		const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

		const users = await User.find({})
			.sort({ id: direction.toLowerCase() as any })
			.then((userList) => userList);

		return users;
	}

	async findById(id: string) {
		const specifcUser = await User.findOne({ _id: id }).then((user) => user);

		return specifcUser;
	}

	async findByEmail(email: string) {
		const specifcUser = await User.findOne({ email }).then((user) => user);

		return specifcUser;
	}

	async create({ name, email, phone, password }: ICustomer) {
		const newUser = await User.create({ name, email, phone, password })
			.then((user) => user)
			.catch((error) => logger.error('Erro ao criar cliente', error));

		return newUser;
	}

	async update(id: string, { name, email, phone }: ICustomer) {
		const updatedUser = await User.findOne({ _id: id }).then((user) => {
			if (user) {
				user.name = name;
				user.email = email;
				user.phone = phone;
				user
					.save()
					.then((responseUpdatedUser: string) => responseUpdatedUser)
					.catch((error: Error) =>
						logger.error('Erro ao atualizar cliente', error),
					);
			}
		});

		return updatedUser;
	}

	async delete(id: string) {
		const deletedUser = await User.findOneAndDelete({ _id: id })
			.then((user) => user)
			.catch((error) => logger.error('Erro ao deletar cliente', error));
		return deletedUser;
	}
}
