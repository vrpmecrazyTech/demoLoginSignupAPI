const authConfig = require("../config/authConfig");
const fs = require('fs');
const jwt = require('jsonwebtoken');

 async function generateLoginToken(user) {
    console.log(user)
	console.log(user)
	return generateUserToken(user);
}

 function generateUserToken(user) {
	let data = {
		_id: user._id,
		name: user.name,
		email: user.email,
		mobile: user.mobile,
		age: user.age,
		
	};
	return generateJWTToken(data);
}

 function generateJWTToken(payload = {}, options = {}) {
	let privateKEY = fs.readFileSync(authConfig.PRIVATE_KEY, "utf8");
	let opt = {
		expiresIn: authConfig.EXPIRY,
		algorithm: authConfig.ALGORITHM,
		...options,
	};

	return jwt.sign(payload, privateKEY, opt);
}