import { BrowserRouter, Routes, Route } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { ClientsPage } from "./pages/ClientsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />}/>
          <Route path="/clients" element={< ClientsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}