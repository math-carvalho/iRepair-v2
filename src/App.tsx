import {useState} from "react";
import { Header } from "./components/Header";
import { NewServiceForm } from "./components/NewServiceForm";
import { ServiceCard } from "./components/ServiceCard";

export default function App() {
  // Estado da lista de OS's
  const [ordensServico, setOrdensServico] = useState<{ 
    id: number, 
    nomeCliente: string, 
    modeloAparelho: string, 
    defeito: string, 
    status: string
  	}[]>
	([]);

  // Estados dos campos do formulário de OS
  const [nomeClienteForm, setNomeClienteForm] = useState("");
  const [modeloAparelhoForm, setModeloAparelhoForm] = useState("");
  const [defeitoForm, setDefeitoForm] = useState("");

  // Função para submissão do formulário de OS
  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nomeClienteForm !== "" && modeloAparelhoForm !== "" && defeitoForm !== "") {
      alert(`OS aberta:
        -> Cliente: ${nomeClienteForm};
        -> Aparelho: ${modeloAparelhoForm};
        -> Defeito: ${defeitoForm}.`
      );
      
      const novaOrdemServico = {
        id: Date.now(),
        nomeCliente: nomeClienteForm,
        modeloAparelho: modeloAparelhoForm,
        defeito: defeitoForm,
        status: "Aberto",
      }
      
      setOrdensServico((ordensServico) => [...ordensServico, novaOrdemServico]);
      
      setNomeClienteForm("");
      setModeloAparelhoForm("");
      setDefeitoForm("");
    } else {
      alert("Todos os campos da OS devem ser preenchidos.");
    } 
  } 

	// Função para finalizar e alterar status da OS
	function handleFinish(id: number) {
    setOrdensServico((ordensServico) =>
      ordensServico.map((os) =>
        (os.id === id)
          ? { ...os, status: "Finalizado" }
          : os
      )
    );
  }

  return (
    <div>
      <Header />

      {/* Formulário de OS */}
      <NewServiceForm 
        funcaoSubmit={handleSubmit} 
        nomeCliente={nomeClienteForm} 
        setNomeCliente={setNomeClienteForm} 
        modeloAparelho={modeloAparelhoForm}
        setModeloAparelho={setModeloAparelhoForm}
        defeito={defeitoForm}
        setDefeito={setDefeitoForm}
        acaoBotao="Salvar" 
      />

      {/* Lista de OS's */}
      {ordensServico.length === 0
        ? (
          <p 
            className="text-center bg-gray-600 text-white p-4 rounded">Não há Ordens de Serviço cadastradas.
          </p>
        )
        : (
          ordensServico.map((os) => (
            <ServiceCard
              key={os.id}
              id={os.id}
							nomeCliente={os.nomeCliente}
              modeloAparelho={os.modeloAparelho}
              defeito={os.defeito}
              status={os.status}
              funcaoFinalizar={handleFinish}
            />
            )
          )
        )
      }
    </div>
  )
}
            
