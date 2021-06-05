import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/api.cartolafc.globo.com/",
});

export default api;