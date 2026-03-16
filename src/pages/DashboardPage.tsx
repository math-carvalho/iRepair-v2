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

    return (
        <div className="flex flex-col items-center p-14">
            <div className="bg-gray-950 text-white rounded text-2xl p-4">
                <h2>Dashboard</h2>
        </div>
        
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
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
        </div>
    );
}