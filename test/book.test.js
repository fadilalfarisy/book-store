import supertest from "supertest"
import { web } from "../src/application/web.js";
import { createBook, createCategoryBook, removeBooks, removeCategories } from "./test-util.js";
import cloudinary from "../src/service/cloudinary-service.js";

describe('Create Book', () => {
	afterEach(async () => {
		// await removeBooks()
	})
	it('should can create book', async () => {
		const category = await createCategoryBook()
		const result = await supertest(web)
			.post('/api/books')
			.attach('cover_book', 'D:/Portofolio/book-store/test/telephone.jpg')
			.field({
				title: 'Ilmu Pengetahuan Alam',
				description: 'lorem lorem',
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
			});
		await cloudinary.uploader.destroy(result.body.data.cover_book_id)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.title).toBe('Sejarah Bima Dompu Dana Mbojo');
		expect(result.body.data.price).toBe(60_000);
	})
})

describe('Get All Books', () => {
	it('should can get all books', async () => {
		const result = await supertest(web).get('/api/books')
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.blogs).toEqual(expect.any(Array));
	})
})

describe('Get Book by Id', () => {

	afterEach(async () => {
		await removeBooks()
	})
	it('should can get books by id', async () => {
		const book = await createBook()
		const result = await supertest(web).get(`/api/books/${book.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.title).toBe('TEST');
	})
})

describe('Update Book', () => {
	afterEach(async () => {
		await removeBooks()
		await removeCategories()
	})
	it('should can update books by id', async () => {
		const book = await createBook()
		const category = await createCategoryBook()
		const result = await supertest(web)
			.put(`/api/books/${book.id}`)
			.send({
				title: 'UPDATED TEST',
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
			});
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.title).toBe('UPDATED TEST');
	})
})

describe('Delete Book', () => {
	afterEach(async () => {
		await removeBooks()
	})
	it('should can delete books by id', async () => {
		const book = await createBook()
		const result = await supertest(web).delete(`/api/books/${book.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('Book deleted successfully');
	})
})