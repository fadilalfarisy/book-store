import { request } from "express"
import { prismaClient } from "../application/database.js"
import { createCompanyValidation } from "../validation/company-validation.js"
import { validate } from "../validation/validation.js"

const createCompany = async (request) => {
	const company = validate(createCompanyValidation, request)
	const misi = company.misi
	delete company.misi

	const [companyRecord] = await prismaClient.$transaction(async (prisma) => {
		await prisma.company.deleteMany({})
		await prisma.misi.deleteMany({})

		const companyRecord = await prisma.company.create({
			data: company
		})

		const misiInput = misi.map((element) => ({ misi: element, company_id: companyRecord.id }))
		await prisma.misi.createMany({
			data: misiInput
		})

		return [{
			...companyRecord,
			misi: misiInput
		}]
	})

	return companyRecord
}

const getCompany = async () => {
	return await prismaClient.company.findMany({
		include: {
			misi: {
				select: {
					misi: true,
				}
			}
		},
	})
}

export default {
	createCompany,
	getCompany
}