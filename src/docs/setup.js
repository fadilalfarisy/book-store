import express from "express";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Company Profile CV Binasti',
			version: '1.0.0',
			description: "This is a API for company profile CV Binasti",
		},
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			}
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		servers: [
			{
				url: 'http://localhost:3000/',
				description: 'Development'
			},
		],
	},
	apis: ['./src/docs/*.js']
}

const documentation = new express.Router();

const swaggerSpec = swaggerJSDoc(options)
documentation.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css' }))

export { documentation }