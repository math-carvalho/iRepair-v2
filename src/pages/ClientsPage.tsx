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
        <div>
            <div>
                <form onSubmit={handleRegisterClient}>
                    <input
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nome:"
                        required
                    />
                    
                    <input
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Telefone:"
                        required
                    />

                    <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="E-mail:"
                        required
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Registrando..." : "Registrar"}
                    </button>
                </form>
            </div>
            
            <div>
                {clients.length === 0 ? (
                    <p>Sem clientes cadastrados.</p>
                ) : (
                    <ul>
                        {clients.map(c => (
                            <li key={c.id}>
                                {/* TODO: Completar quando for possível visualizar */}
                                <button onClick={() => handleRemoveClient(c.id)}>Remover</button>
                            </li>)                
                            )
                        }     
                    </ul>
                )}
            </div>
        </div>
    );
}