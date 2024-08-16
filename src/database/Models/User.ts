import mongoose, { Schema } from 'mongoose';

const User: any = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: Number,
});

mongoose.model('customers', User);
