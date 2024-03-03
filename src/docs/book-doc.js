/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - author
 *         - target
 *         - page
 *         - size
 *         - ISBN
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         description:
 *           type: string
 *           description: Description about the the reference
 *         author:
 *           type: string
 *           description: Author of the book
 *         target:
 *           type: string
 *           description: Target of the book
 *         page:
 *           type: string
 *           description: Total page
 *         size:
 *           type: string
 *           description: Size book
 *         ISBN:
 *           type: string
 *           description: Number regist book
 *         price:
 *           type: string
 *           description: Price book
 *       example:
 *         title: SENI BUDAYA SASAK
 *         description: Buku ini mengulas seni budaya Sasak. Terdiri atas tiga pokok bahasan yaitu seni budaya Sasak, tradisi lisan, dan manuskrip. Setelah melakukan pendalaman, penulis meyakini ketiga unsur budaya yang hidup dan berkembang dalam keseharian suku Sasak memiliki nilai-nilai seni yang adiluhung. Bagi Kuntjaraningrat, itu semua merupakan puncak-puncak kebudayaan lokal yang akan menjadi kebudayaan nasional Indonesia.
 *         author: Abdul Azizurrahman
 *         target: SMA/SMK Kelas XI
 *         page: 174
 *         size: 17,6 x 25 cm
 *         ISBN: On Progress
 *         price: 89900
 */


/**
 * @swagger
 * /api/books:
 *  get:
 *    summary: List all the books
 *    tags: [Books]
 *    responses:
 *      200:
 *        description: The list of books.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Books'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */


/**
 * @swagger
 * /api/books/{id}:
 *  get:
 *    summary: Get a book by id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: The book id
 *    responses:
 *      200:
 *        description: The detail of book.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Books'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */


/**
 * @swagger
 * /api/books:
 *  post:
 *    summary: Create a new book
 *    tags: [Books]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Books'
 *    responses:
 *      200:
 *        description: Book successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Books'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */


/**
 * @swagger
 * /api/books/{id}:
 *  put:
 *    summary: Update book
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: Book successfully updated
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */


/**
 * @swagger
 * /api/books/{id}:
 *  delete:
 *    summary: Delete book
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: The book id
 *    responses:
 *      200:
 *        description: Book successfully deleted
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */