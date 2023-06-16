import axios from "axios";
import {defaultServerWay} from "./constants";

const instance = axios.create({
    // baseURL: "/",
    // baseURL: "https://localhost:5001/",
    baseURL: defaultServerWay,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    }
});

export default instance;