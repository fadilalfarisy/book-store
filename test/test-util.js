import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import cloudinary from "../src/service/cloudinary-service.js";

export const removeTestUser = async () => {
	await prismaClient.user.deleteMany({})
}

export const removeTokenTest = async () => {
	await prismaClient.token.deleteMany({})
}

export const createTestUser = async () => {
	return await prismaClient.user.create({
		data: {
			email: "lelekuning35@gmail.com",
			username: "test",
			password: await bcrypt.hash("rahasia", 10),
			role: 'ADMIN',
		}
	})
}

export const createVerifiedTestUser = async () => {
	await prismaClient.user.create({
		data: {
			email: "lelekuning35@gmail.com",
			username: "test",
			password: await bcrypt.hash("rahasia", 10),
			role: 'USER',
			verified: true
		}
	})
}

export const createValidTokenTestUser = async () => {

	const recordToken = await prismaClient.$transaction(async (prisma) => {
		const recordUser = await prisma.user.create({
			data: {
				email: "lelekuning35@gmail.com",
				username: "test",
				role: 'USER',
				password: await bcrypt.hash("rahasia", 10),
			},
			select: {
				id: true,
				email: true,
				username: true,
				verified: true,
				role: true
			}
		});

		const expire = new Date()
		expire.setHours(expire.getHours() + 1)
		expire.toISOString()

		const recordToken = await prisma.token.create({
			data: {
				token: uuid(),
				expire: expire,
				user_id: recordUser.id
			},
			select: {
				token: true
			}
		})

		return recordToken.token
	})

	return recordToken
}

export const removeCompanyAndMisi = async () => {
	await prismaClient.company.deleteMany({})
}

export const createCompanyAndMisi = async () => {
	const company = {
		name: 'bibi',
		industry: 'books publisher',
		description: 'since 2002',
		visi: 'globally',
		misi: ['a', 'b', 'c']
	}
	const misi = company.misi
	delete company.misi

	await prismaClient.$transaction(async (prisma) => {
		const companyRecord = await prisma.company.create({
			data: company
		})

		const misiInput = misi.map((element) => ({ misi: element, company_id: companyRecord.id }))
		await prisma.misi.createMany({
			data: misiInput
		})
	})
}

export const createBook = async () => {
	const book = {
		title: 'TEST',
		description: 'Sejarah terus ditulis orang disemua peradaban dan disepanjang waktu, sebenarnya cukup menjadi bukti betapa pentingnya sejarah bagi umat manusia sepanjang zaman. Di dalam kitab-kitab suci, seperti Kitab Suci Al-Quran, Tuhan banyak melukiskan potret kehidupan umat manusia sebelum Nabi Muhammad SAW merupakan bukti bahwa sejarah sangat dibutuhkan oleh umat manusia kini dan masa datang.',
		author: 'Rahmah Fitriah dan Siti Linda Yuliarti',
		target: 'SMP/Mts',
		page: 104,
		size: '17.6 x 25 cm',
		ISBN: 'On Process',
		price: 60_000
	}
	const uploadCoverBook = await cloudinary.uploader.upload('D:/Portofolio/book-store/test/telephone.jpg')
	book.cover_book_id = uploadCoverBook.public_id
	book.cover_book = uploadCoverBook.secure_url
	return await prismaClient.book.create({
		data: book
	})
}

export const removeBooks = async () => {
	await prismaClient.book.deleteMany({})
} 