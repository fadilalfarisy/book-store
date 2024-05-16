import { prismaClient } from "../application/database.js"
import { createCompanyValidation } from "../validation/company-validation.js"
import { validate } from "../validation/validation.js"

const createCompany = async (request) => {
	const company = validate(createCompanyValidation, request.body)

	const [companyRecord] = await prismaClient.$transaction(async (prisma) => {
		await prisma.company.deleteMany({})
		const companyRecord = await prisma.company.create({
			data: company
		})

		return [companyRecord]
	})

	return companyRecord
}

const getCompany = async () => {
	return await prismaClient.company.findMany({})
}

export default {
	createCompany,
	getCompany
}