// src/service/comprasService.js
import axios from "axios";

const API = "https://carrito-compra-pedido-arg.onrender.com/api/v1/compra";

export async function getCompras() {
    const res = await axios.get(API);
    return res.data;
}
