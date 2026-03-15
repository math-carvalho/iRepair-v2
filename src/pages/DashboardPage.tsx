// Página de dashboard com OS's carregadas da API
import { useEffect, useState } from "react";
import { api } from "../services/api"; 

// Interface da OS
interface ServiceOrder {
    id: number;
    client_id: number;
    device: string;
    issue: string;
    status: string;
    created_at: string;
}

export function DashboardPage() {
    // Estados do dashboard
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
                setError("Não foi possível carregar as ordens de serviço.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchServiceOrders();
    }, []);

    // Verificar carregamento da página
    if (isLoading) {
        return <p>Carregando...</p>;
    }

    // Verifica erro na página
    if (error) {
        return <p>{error}</p>;
    }

    // Verifica se a lista de OS's está vazia
    if (serviceOrders.length === 0) {
        return <p>Sem ordens de serviço cadastradas.</p>
    }

    return (
        <ul>
            {serviceOrders.map(so => (
                <li key={so.id}>
                    {/* TODO: Completar quando for possível visualizar */}
                </li>))
            }     
        </ul>
    );
}