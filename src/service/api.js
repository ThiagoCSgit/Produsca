import axios from "axios";

const route = axios.create({
  baseURL: "https://feijao12.bsite.net",
  // baseURL: "https://edu176.bsite.net",
});

export default route;
