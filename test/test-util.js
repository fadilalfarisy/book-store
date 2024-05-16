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

export const removeCompany = async () => {
	await prismaClient.company.deleteMany({})
}

export const createCompany = async () => {
	const company = {
		name: 'bibi',
		industry: 'books publisher',
		description: 'since 2002',
		vision: 'globally',
		mission: `a\nb\nc`
	}

	await prismaClient.company.create({
		data: company
	})
}

export const createBook = async () => {
	const category = await createCategoryBook()
	const book = {
		title: 'TEST',
		description: 'Sejarah terus ditulis orang disemua peradaban dan disepanjang waktu, sebenarnya cukup menjadi bukti betapa pentingnya sejarah bagi umat manusia sepanjang zaman. Di dalam kitab-kitab suci, seperti Kitab Suci Al-Quran, Tuhan banyak melukiskan potret kehidupan umat manusia sebelum Nabi Muhammad SAW merupakan bukti bahwa sejarah sangat dibutuhkan oleh umat manusia kini dan masa datang.',
		author: 'Rahmah Fitriah dan Siti Linda Yuliarti',
		class: 'SMP/Mts',
		size: '17.6 x 25 cm',
		ISBN: 'On Process',
		publish_year: 2020,
		page: 104,
		link_shopee: 'https://shopee.co.id/-NEW-YOU-Sunbrella-Daily-Defense-Sunscreen-Serum-SPF30-Tabir-Surya-UVA-UVB-Blue-Light-Lightweight-Skincare-Dry-Skin-i.72375863.22172646246',
		link_tokopedia: 'https://www.tokopedia.com/footballdept/sepatu-bola-anak-nike-tiempo-legend-10-club-fg-mg-dv4352700-original-35-5-318ea?extParam=ivf%3Dfalse&src=topads',
		price: 60_000,
		category_id: category.id
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

export const createCategoryBook = async () => {
	const category = {
		category: 'Sejarah'
	}
	return await prismaClient.categoryBook.create({
		data: category
	})
}


export const removeBookCategories = async () => {
	return await prismaClient.categoryBook.deleteMany({})
}


export const createBlogCategory = async () => {
	const category = {
		category: 'Article'
	}
	return await prismaClient.categoryBlog.create({
		data: category
	})
}


export const removeBlogCategories = async () => {
	return await prismaClient.categoryBlog.deleteMany({})
}

export const createBlog = async () => {
	const category = await createBlogCategory()
	const blog = {
		title: 'BLOG TEST',
		description: 'Lorem Ipsum',
		category_id: category.id
	}
	const thumbnail = await cloudinary.uploader.upload('D:/Portofolio/book-store/test/telephone.jpg')
	blog.thumbnail_id = thumbnail.public_id
	blog.thumbnail = thumbnail.secure_url
	return await prismaClient.blog.create({
		data: blog
	})
}

export const removeBlogs = async () => {
	await prismaClient.blog.deleteMany({})
}