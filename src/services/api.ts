// Configuração de API

import axios from "axios";

export const api = axios.create({
    baseURL: "https://trainee.fidelis.workers.dev/api",
    headers: {
        "Authorization": "Bearer 05010be0-84a5-4335-b3ed-44f55efbc7b7",
        "Content-Type": "application/json"
    }
})
