const crypto = require('crypto')

function sha512 (password, salt) {
    var hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
    hash.update(password)
    var value = hash.digest('hex')
    return {
        salt,
        passwordHash:value
    }
}

function saltHashPassword(userpassword) {
    var salt = 'vT$.20!8_8!02.$Tv'
    var passwordData = sha512(userpassword, salt)
    return passwordData.passwordHash
}

module.exports.saltHashPassword = saltHashPassword
