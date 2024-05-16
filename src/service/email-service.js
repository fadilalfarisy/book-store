import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD_EMAIL
	}
});

const mailOptions = {
	from: {
		name: 'Nasi Goreng',
		address: 'nasigorengminyak35@gmail.com'
	},
	to: 'nasigorengminyak35@gmail.com',
	subject: 'Email Confirmation',
	text: 'link'
};

const sendEmail = async (to, message) => {
	await transporter.sendMail({
		...mailOptions,
		to: to,
		text: message
	})
}

export default {
	sendEmail
}