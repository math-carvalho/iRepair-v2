interface FormProps {
    funcaoSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    nomeCliente: string;
    setNomeCliente: React.Dispatch<React.SetStateAction<string>>;
    modeloAparelho: string;
    setModeloAparelho: React.Dispatch<React.SetStateAction<string>>;
    defeito: string;
    setDefeito: React.Dispatch<React.SetStateAction<string>>;
    acaoBotao: string;
}

export function NewServiceForm({ funcaoSubmit, nomeCliente, setNomeCliente, modeloAparelho, setModeloAparelho, defeito, setDefeito, acaoBotao }: FormProps) {
    return (
        <div className="flex justify-center p-14">
            <form className="bg-gray-600 rounded p-6" onSubmit={funcaoSubmit}>
                <div className="flex flex-col gap-8">
                    <input 
                        className="bg-gray-300 p-4 rounded" 
                        type="text" 
                        placeholder="Nome do cliente:" 
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}
                    />

                    <input 
                        className="bg-gray-300 p-4 rounded" 
                        type="text" 
                        placeholder="Modelo do aparelho:" 
                        value={modeloAparelho}
                        onChange={(e) => setModeloAparelho(e.target.value)}
                    />

                    <input 
                        className="bg-gray-300 p-4 rounded" 
                        type="text" 
                        placeholder="Defeito:" 
                        value={defeito}
                        onChange={(e) => setDefeito(e.target.value)}
                    />
                </div>

                <div className="flex flex-col pt-8">
                    <button 
                        className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-500 cursor-pointer" 
                        type="submit">
                        {acaoBotao}
                    </button>
                </div>
            </form>
        </div>
    )
}