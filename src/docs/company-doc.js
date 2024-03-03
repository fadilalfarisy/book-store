/**
 * @swagger
 * tags:
 *   name: Company
 *   description: The company managing API
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - industry
 *         - description
 *         - visi
 *         - misi
 *       properties:
 *         name:
 *           type: string
 *           description: Name of company
 *         industry:
 *           type: string
 *           description: Industry company
 *         description:
 *           type: string
 *           description: Description of company
 *         visi:
 *           type: string
 *           description: Visi company
 *         misi:
 *           type: array of string
 *           description: Misi company
 *       example:
 *         name: Binasti
 *         industry: Book publisher
 *         description: CV. Binasti berdiri sejak tahun 2006. Kiprah CV. Binasti dalam dunia pendidikan dimulai dari penyediaan buku-buku dan berbagai sarana dan prasarana bagi sekolah dan lingkungannya. Kemudian CV. Binasti mulai merambah penerbitan khususnya untuk pembelajaran dari daerah Nusa Tenggara Barat.
 *         visi: globally
 *         misi: [{"misi":"a"}, {"misi":"b"}, {"misi":"c"}]
 */

/**
 * @swagger
 * /api/company:
 *  get:
 *    summary: Company info
 *    tags: [Company]
 *    responses:
 *      200:
 *        description: Company information
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Company'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */

/**
 * @swagger
 * /api/company:
 *  post:
 *    summary: Create company
 *    tags: [Company]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - industry
 *              - description
 *              - visi
 *              - misi
 *            properties:
 *              name:
 *                type: string
 *                description: Email user
 *              industry:
 *                type: string
 *                description: Password account user
 *              description:
 *                type: string
 *                description: Password account user
 *              visi:
 *                type: string
 *                description: Password account user
 *              misi:
 *                type: array of string
 *                description: Password account user
 *            example:
 *              name: Binasti
 *              industry: Book publisher
 *              description: CV. Binasti berdiri sejak tahun 2006. Kiprah CV. Binasti dalam dunia pendidikan dimulai dari penyediaan buku-buku dan berbagai sarana dan prasarana bagi sekolah dan lingkungannya. Kemudian CV. Binasti mulai merambah penerbitan khususnya untuk pembelajaran dari daerah Nusa Tenggara Barat.
 *              visi: globally
 *              misi: [{"misi":"a"}, {"misi":"b"}, {"misi":"c"}]
 *    responses:
 *      200:
 *        description: Company info.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Company'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */