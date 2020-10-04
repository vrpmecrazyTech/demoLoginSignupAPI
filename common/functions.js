var bcrypt = require("bcrypt");

module.exports = {
    encryptPassword: function (password, callback) {
        bcrypt.hash(password, 10).then(function (hash) {
            return callback(hash);
        });
    },
    passwordCompare: function (plainPass, hashPass, callback) {
        console.log(plainPass)
        bcrypt.compare(plainPass, hashPass).then(function (result) {
            return callback(result);
        });
    }
}
