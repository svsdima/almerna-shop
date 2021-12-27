import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		img: '/img/avatar.png',
		isAdmin: true,
	},
	{
		name: 'Elizaveta Vitalievna',
		email: 'liza@example.com',
		password: bcrypt.hashSync('123456', 10),
		img: '/img/avatar.png',
		isAdmin: false,
	},
	{
		name: 'Grigoriy Panoramkin',
		email: 'grisha123@example.com',
		password: bcrypt.hashSync('123456', 10),
		img: '/img/avatar.png',
		isAdmin: false,
	},
];

export default users;
