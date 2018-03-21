export default class Config {

    getUrl(endpoint = '') {

        if (endpoint) {
            return "http://172.18.3.99:3004/" + endpoint;

        } else {

            return "http://172.18.3.99:3004";
        }
    }
}