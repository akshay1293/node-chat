export default class Config {

    // baseUrl = "http://chat-frontend.s3-website.ap-south-1.amazonaws.com";
    baseUrl = "http://localhost:3000";

    getUrl(endpoint = '') {
        var server = "https://rocky-tor-68043.herokuapp.com/";
        // var server = "http://localhost:3005/";
        if (endpoint) {
            return server + endpoint;

        } else {

            return server;
        }
    }
}