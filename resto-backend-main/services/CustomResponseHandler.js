

class CustomResponseHandler  {
    constructor(message, status, success, data) {
        
        this.message = message;
        this.status = status;
        this.success = success;
        this.data = data;
    }

    static positiveResponse(message, data) {
        return new CustomResponseHandler(message, 200, true, data);
    }

    static negativeResponse(message, status,data) {
        return new CustomResponseHandler(message, status, false,data);
    }
}

module.exports = CustomResponseHandler;
