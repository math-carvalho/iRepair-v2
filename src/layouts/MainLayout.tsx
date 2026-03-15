// Layout principal das páginas

import { Outlet } from "react-router";
import { Header } from "../components/Header";

export function MainLayout() {
    return (
        <div>
            {/* Componente de cabeçalho */}
            <Header />

            <main>
                {/* Páginas da aplicação */}
                <Outlet />
            </main>
        </div>
    )
}