// Cabeçalho do iRepair
import { Link } from "react-router";

export function Header() {
    return (
        <header className="bg-gray-950 text-white flex justify-between items-center p-4 py-6">
            <div className="text-3xl ">
                <h1>iRepair</h1>
             </div>

            <nav className="flex gap-4" >
                <Link to="/">Dashboard</Link>
                <Link to="/clients">Clientes</Link>
                <Link to="/service-orders">Ordens de Serviço</Link>
            </nav>
        </header>
    );
}