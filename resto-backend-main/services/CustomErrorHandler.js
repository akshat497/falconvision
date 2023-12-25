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
    static forbiddden(message = 'Forbidden !') {
        return new CustomErrorHandler(message, 403)
    }
    static UpdatingError(message = 'Error in updating !') {
        return new CustomErrorHandler(message, 404)
    }
    static UserNotFound(message = 'User not found !') {
        return new CustomErrorHandler(message, 404)
    }
    static UnAuthorised(message = 'Unauthorized!') {
        return new CustomErrorHandler(message, 401)
    }
    static MenuItemError(message,status) {
        return new CustomErrorHandler(message, status)
    }
    static NotFound(message) {
        return new CustomErrorHandler(message, 404)
    }
    static BadRequest(message){
        return new CustomErrorHandler(message, 400);
    }



}

module.exports = CustomErrorHandler