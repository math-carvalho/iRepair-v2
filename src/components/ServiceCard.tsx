interface OrdemServicoProps {
    id: number
    nomeCliente: string;
    modeloAparelho: string;
    defeito: string;
    status: string;
    funcaoFinalizar: (id: number) => void;
}

export function ServiceCard({ id, nomeCliente, modeloAparelho, defeito, status, funcaoFinalizar }: OrdemServicoProps) {
  return (
    <div className="flex justify-center p-2">
      <ul className="bg-gray-600 w-80 rounded-md">
        <li className="bg-gray-300 p-2 m-2 rounded-md">{nomeCliente}</li>
        <li className="bg-gray-300 p-2 m-2 rounded-md">{modeloAparelho}</li>
        <li className="bg-gray-300 p-2 m-2 rounded-md">{defeito}</li>
        <li className={`${status === "Aberto" ? "bg-green-500" : "bg-red-500"} p-2 m-2 rounded-md`}>{status}</li>
        <button className="bg-blue-700 p-2 m-2 rounded-md cursor-pointer" onClick={() => funcaoFinalizar(id)}>Finalizar</button>
      </ul>
    </div>
  )
}