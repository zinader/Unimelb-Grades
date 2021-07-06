import axios from "axios";

const apiURL = "https://averagegrade.herokuapp.com/subjects";

export const api = axios.create({ baseURL: apiURL });
