import axios from "axios";
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const developmentUrl = "http://localhost:5000";

const axiosConfic = axios.create({
  baseURL: productionUrl,
  withCredentials: true,
  credentials: "include"
});

export default axiosConfic;
