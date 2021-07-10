import axios from "axios";

const apiURL = "https://averagegrade.herokuapp.com/items";

export const api = axios.create({ baseURL: apiURL });
