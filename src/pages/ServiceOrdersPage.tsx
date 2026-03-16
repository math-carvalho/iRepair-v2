// Página de lista de OS's

import React, { useEffect, useState } from "react";
import { api } from "../services/api"; 

// Interface de OS's
interface ServiceOrder {
    id: number;
    client_id: number;
    device: string;
    issue: string;
    status: string;
    created_at: string;
}

// Interface de clientes
interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    created_at: string;
}

export function ServiceOrdersPage() {
   // Estados para formulário de novas OS's
    const [device, setDevice] = useState("");
    const [issue, setIssue] = useState("");
    const [status, setStatus] = useState("open");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados para clientes cadastrados
    const [clients, setClients] = useState<Client[]>([]);
    const [clientId, setClientId] = useState<number | "">("");

    // Estados da página de OS's
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Função que busca OS's
        async function fetchServiceOrders() {
            try {
                const response = await api.get("/service-orders");
                setServiceOrders(response.data.data);
            } catch {
                setError("Não foi possível carregar ordens de serviço.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchServiceOrders();
    }, []);

    useEffect(() => {
        // Função que busca clientes cadastrados
        async function fetchClients() {
            try {
            const response = await api.get("/clients");
            setClients(response.data.data);
            } catch {
            setError("Não foi possível carregar clientes cadastrados.");
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

    // Função para botão que remove OS
    async function handleRemoveSO(ServiceOrderId: number) {
        try {
            await api.delete(`/service-orders/${ServiceOrderId}`);
            setServiceOrders((prev) => prev.filter((so) => so.id !== ServiceOrderId));
        } catch {
            setError("Não foi possível remover a ordem de serviço.");
        }
    }

    // Função para formulário de registro de OS's
    async function handleRegisterSO(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        if (clientId === "") {
            setError("Selecione um cliente antes de registrar a OS.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await api.post("/service-orders", { device, issue, status, clientId });
            setServiceOrders((prev) => [...prev, response.data]);
            setDevice("");
            setIssue("");
            setClientId("");
        } catch (error: any) {
            setError("Não foi possível cadastrar a ordem de serviço.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleRegisterSO}>
                    <input
                        value={device}
                        onChange={(e) => setDevice(e.target.value)}
                        placeholder="Dispositivo:"
                        required
                    />
                    
                    <input
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        placeholder="Defeito:"
                        required
                    />

                    <select
                        value={clientId}
                        onChange={(e) => {
                            const value = e.target.value;
                            setClientId(value === "" ? "" : Number(value));
                        }}
                        required
                        >
                            <option value="" disabled>
                                Selecione um cliente
                            </option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                {client.name}
                                </option>
                            ))}
                    </select>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Registrando..." : "Registrar"}
                    </button>
                </form>
            </div>
            
            <div>
                {serviceOrders.length === 0 ? (
                    <p>Sem ordens de serviço cadastradas.</p>
                ) : (
                    <ul>
                        {serviceOrders.map(so => (
                            <li key={so.id}>
                                {/* TODO: Completar quando for possível visualizar */}
                                <button onClick={() => handleRemoveSO(so.id)}>Remover</button>
                            </li>)                
                            )
                        }     
                    </ul>
                )}
            </div>
        </div>
    );
}