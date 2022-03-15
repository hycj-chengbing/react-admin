const devBaseURL = "http://159.75.128.32:5000";
const proBaseURL = "http://159.75.128.32:5000";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export const HEADERS={'content-Type': 'application/json;charset=UTF-8'};
export const TIMEOUT = 5000;
