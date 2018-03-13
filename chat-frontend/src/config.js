export default class Config {

    getUrl(endpoint = '') {

        if (endpoint) {
            return "http://localhost:3004/" + endpoint;

        } else {

            return "http://localhost:3004";
        }
    }
}