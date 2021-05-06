import { Router } from 'express';
import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ContactController from './app/controllers/ContactController'

const routes = new Router();

/**
 * @api {post} /users Register a new session
 * @apiGroup Sessions
 * @apiParam {String}  email
 * @apiParam {String}  password
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@test.com"
 *      "password": "123456"
 *    }

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "token" "3edfdf4r534t45gdrfscsf.dsf423",
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.post('/sessions' , SessionController.store);

/**
 * @api {post} /users Register a new user
 * @apiGroup Users
 * @apiParam {String}  email
 * @apiParam {String}  password
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@test.com"
 *      "password": "123456"
 *    }

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "token" "3edfdf4r534t45gdrfscsf.dsf423",
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.post('/users' , UserController.store);

routes.use(authMiddleware);

/**
 * @api {put} /users Update a user
 * @apiGroup Users
 * @apiParam {String} email User
 * @apiParam {String} oldPassword User
 * @apiParam {String} password User
 * @apiHeader {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@test.com",
 *      "oldPassword": "oldPassword",
 *      "password": "password"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.put('/users', UserController.update);

/**
 * @api {post} /users Register a new contact
 * @apiGroup Contacts
 * @apiParam {String}  firstName
 * @apiParam {String}  lastName
 * @apiParam {String}  phone
 * @apiParam {String}  address
 * @apiHeader {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 * @apiParamExample {json} Input
 *    {
 *      "firstName": "Mario",
 *      "lastName": "Leite",
 *      "phone": "34553323",
 *      "address": "St. One Way",
 *    }

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "token" "3edfdf4r534t45gdrfscsf.dsf423",
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.put('/contacts' , ContactController.store);

export default routes;
