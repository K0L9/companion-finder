import axios from "axios";

const instance = axios.create({
    // baseURL: "/",
    // baseURL: "https://localhost:5001/",
    baseURL: "https://localhost:5001/",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    }
});

export default instance;