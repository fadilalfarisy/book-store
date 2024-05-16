import companyService from '../service/company-service.js'

const createCompany = async (req, res, next) => {
	try {
		const result = await companyService.createCompany(req);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const getCompany = async (req, res, next) => {
	try {
		const result = await companyService.getCompany();
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

export default {
	createCompany,
	getCompany
}