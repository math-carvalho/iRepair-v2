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
        <div className="flex flex-col items-center p-14">
            <div className="bg-gray-950 text-white rounded text-2xl p-4">
                <h2>Página de Ordens de Serviço</h2>
            </div>

            <form className="bg-gray-600 rounded p-6 m-8" onSubmit={handleRegisterSO}>
                <div className="flex flex-col gap-8">
                    <input
                        className="bg-gray-300 p-4 rounded" 
                        value={device}
                        onChange={(e) => setDevice(e.target.value)}
                        placeholder="Dispositivo:"
                        required
                    />
                    
                    <input
                        className="bg-gray-300 p-4 rounded"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        placeholder="Defeito:"
                        required
                    />

                    <select
                        className="bg-gray-300 p-4 rounded" 
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
                {serviceOrders.length === 0 ? (
                    <p>Sem ordens de serviço cadastradas.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {serviceOrders.map(so => (
                            <div key={so.id} className="bg-gray-500 p-4 rounded">
                                <ul>
                                    <li>Dispositivo: {so.device}</li>
                                    <li>Defeito: {so.issue}</li>
                                    <li>Status: {so.status}</li>
                                </ul>
                                <button 
                                    className="mt-2 text-white rounded p-2 bg-gray-800 hover:bg-red-500"
                                    onClick={() => handleRemoveSO(so.id)}
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