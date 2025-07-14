import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { filtroDeEventos } from '../../state/atom';

interface FiltroProps {
  aoFiltroAplicado: (data: Date | null) => void;
}

const Filtro: React.FC<FiltroProps> = ({ aoFiltroAplicado }) => {
  const [data, setData] = useState('');
  const setFiltroDeEventos = useSetRecoilState(filtroDeEventos);

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    
    if (!data) {
      setFiltroDeEventos({});
      aoFiltroAplicado(null);
      return;
    }

    const dataFiltro = new Date(data + 'T00:00:00');
    setFiltroDeEventos({ data: dataFiltro });
    aoFiltroAplicado(dataFiltro);
  };

  const limparFiltro = () => {
    setData('');
    setFiltroDeEventos({});
    aoFiltroAplicado(null);
  };

  const filtrarHoje = () => {
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().slice(0, 10);
    setData(dataFormatada);
    setFiltroDeEventos({ data: hoje });
    aoFiltroAplicado(hoje);
  };

  const filtrarSemana = () => {
    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    
    const dataFormatada = inicioSemana.toISOString().slice(0, 10);
    setData(dataFormatada);
    setFiltroDeEventos({ data: inicioSemana });
    aoFiltroAplicado(inicioSemana);
  };

  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-4">
      <h4 className="text-white font-semibold text-sm">Filtrar eventos</h4>
      
      <form onSubmit={submeterForm} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="flex-1 p-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            placeholder="Selecione uma data"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-all duration-200"
          >
            Filtrar
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={filtrarHoje}
          className="px-2 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded text-xs font-medium transition-all duration-200"
        >
          Hoje
        </button>
        <button
          onClick={filtrarSemana}
          className="px-2 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded text-xs font-medium transition-all duration-200"
        >
          Esta semana
        </button>
        <button
          onClick={limparFiltro}
          className="px-2 py-1 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 rounded text-xs font-medium transition-all duration-200"
        >
          Limpar filtro
        </button>
      </div>
    </div>
  );
};

export default Filtro;