export default class Config {

    baseUrl = "http://chat-frontend.s3-website.ap-south-1.amazonaws.com";
    // baseUrl = "http://localhost:3000";
    getUrl(endpoint = '') {

        if (endpoint) {
            return "https://rocky-tor-68043.herokuapp.com/" + endpoint;

        } else {

            return "https://rocky-tor-68043.herokuapp.com";
        }
    }
}