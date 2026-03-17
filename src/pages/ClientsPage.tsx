// Página de lista de clientes cadastrados

import React, { useEffect, useState } from "react";
import { api } from "../services/api"; 

// Interface de clientes
interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    created_at: string;
}

export function ClientsPage() {
   // Estados para formulário de novos clientes
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados da página de clientes
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Função que busca clietes
        async function fetchClients() {
            try {
                const response = await api.get("/clients");
                setClients(response.data.data);
            } catch {
                setError("Não foi possível carregar clientes.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchClients();
    }, []);

    // Verificar carregamento da página
    if (isLoading) {
        return <p>Carregando...</p>;
    }

    // Verifica erro na página
    if (error) {
        return <p>{error}</p>;
    }

     // Função para botão que remove cliente
    async function handleRemoveClient(clientId: number) {
        try {
            await api.delete(`/clients/${clientId}`);
            setClients((prev) => prev.filter((client) => client.id !== clientId));
        } catch {
            setError("Não foi possível remover o cliente.");
        }
    }

    // Função para formulário de registro de clientes
    async function handleRegisterClient(event: React.FormEvent) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await api.post("/clients", { name: clientName, phone: clientPhone, email: clientEmail });
            setClients((prev) => [...prev, response.data]);
            setClientName("");
            setClientPhone("");
            setClientEmail("");
        } catch {
            setError("Não foi possível cadastrar o cliente.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col items-center p-14">
            <div className="bg-gray-950 text-white rounded text-2xl p-4">
                <h2>Clientes</h2>
            </div>

            <form className="bg-gray-600 rounded p-6 m-8" onSubmit={handleRegisterClient}>
                <div className="flex flex-col gap-8">
                    <input
                        className="bg-gray-300 p-4 rounded" 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nome:"
                        required
                    />
                    
                    <input
                        className="bg-gray-300 p-4 rounded" 
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Telefone:"
                        required
                    />

                    <input
                        className="bg-gray-300 p-4 rounded" 
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="E-mail:"
                        required
                    />
                </div>
                
                <div className="flex flex-col pt-8">
                    <button 
                        className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-500 cursor-pointer"
                        type="submit" 
                        disabled={isSubmitting}>
                        {isSubmitting ? "Registrando..." : "Registrar"}
                    </button>
                </div>
            </form>
            
            <div className="bg-gray-600 text-white rounded m-8 p-4">
                {clients.length === 0 ? (
                    <p>Sem clientes cadastrados.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {clients.map(c => (
                            <div key={c.id} className="bg-gray-500 p-4 rounded">
                                <ul>
                                    <li>Nome: {c.name}</li>
                                    <li>Telefone: {c.phone}</li>
                                    <li>E-mail: {c.email}</li>
                                </ul>
                                <button 
                                    className="mt-2 text-white rounded p-2 bg-gray-800 hover:bg-red-500"
                                    onClick={() => handleRemoveClient(c.id)}
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}