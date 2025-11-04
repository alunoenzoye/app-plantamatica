import axios from "axios";

const api = axios.create({
    timeout: 60000,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        Accept: "application/json"
    }
})

export default api
