/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *         - role
 *         - verified
 *       properties:
 *         email:
 *           type: string
 *           description: email user
 *         username:
 *           type: string
 *           description: username user
 *         password:
 *           type: string
 *           description: password account user
 *         role:
 *           type: string
 *           description: role user
 *         verified:
 *           type: string
 *           description: status account user
 *       example:
 *         email: nasi@gmail.com
 *         username: 'nasi'
 *         password: 'rahasia'
 *         role: ADMIN
 *         verified: true
 */


/**
 * @swagger
 * /api/users/register:
 *  post:
 *    summary: Register user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *      responses:
 *        200:
 *          description: User successfully created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Users'
 *        400:
 *          description: Bad request
 *        500:
 *          description: Server error
 */


/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Login user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                description: Email user
 *              password:
 *                type: string
 *                description: Password account user
 *            example:
 *              email: nasi@gmail.com
 *              password: 'rahasia'
 *    responses:
 *      200:
 *        description: User successfully login
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */


/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: List all the users
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Users'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized request
 *      500:
 *        description: Server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *    summary: Remove user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: Book successfully deleted
 *      400:
 *        description: Bad request
 *      404:
 *        description: User not found
 *      500:
 *        description: Server error
 */


/**
 * @swagger
 * /api/users/confirm/{token}:
 *  get:
 *    summary: Confirm email address
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string
 *        required: true
 *        description: Unique token user
 *    responses:
 *      200:
 *        description: User successfully verify email address
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */

