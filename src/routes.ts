// The router purpose is to send the requests to Controllers and activate his methods. The Controller will connect with Repository, that will connect with Data Source and return to Controller the result

import { Router } from 'express';

import { CustomerController } from './app/controllers/CustomerController';

const CustomerControllerFunction = new CustomerController();

export const router = Router();

router.get('/customers', CustomerControllerFunction.index);
router.get('/customers/:id', CustomerControllerFunction.show);
router.delete('/customers/:id', CustomerControllerFunction.delete);
router.post('/customers/', CustomerControllerFunction.store);
router.put('/customers/:id', CustomerControllerFunction.update);
