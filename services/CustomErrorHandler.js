class CustomErrorHandler extends Error {
    constructor(message, status) {
        super()
        this.message = message;
        this.status = status;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(message, 409)
    }

    static wrongCredentials(message = 'Email or Password is invalid !') {
        return new CustomErrorHandler(message, 401)
    }

    static passwordError(message) {
        return new CustomErrorHandler(message, 409)
    }



}

module.exports = CustomErrorHandler