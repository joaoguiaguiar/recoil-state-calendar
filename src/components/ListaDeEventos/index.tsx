import React from 'react';
import { useRecoilValue } from 'recoil';
import { eventosFiltradosState } from '../../state/seletores';
import useAtualizarEvento from '../../state/hooks/useAtualizarEvento';
import useDeletarEvento from '../../state/hooks/useDeletarEvento';
import Filtro from '../Filtro';
import type { IEvento } from '../../interfaces/IEvento';

const ListaDeEventos: React.FC = () => {
  const eventosListados = useRecoilValue(eventosFiltradosState);
  const atualizarEvento = useAtualizarEvento();
  const deletarEvento = useDeletarEvento();

  const aoAlterarStatus = (evento: IEvento) => {
    const eventoAtualizado = {
      ...evento,
      completo: !evento.completo
    };
    atualizarEvento(eventoAtualizado);
  };

  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarHora = (data: Date) => {
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const aoFiltroAplicado = (data: Date | null) => {
    console.log('Filtro aplicado:', data);
  };

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Lista de Eventos</h3>
      
      <Filtro aoFiltroAplicado={aoFiltroAplicado} />
      
      <div className="max-h-64 md:max-h-80 lg:max-h-96 overflow-y-auto space-y-3 pr-2">
        {eventosListados.length > 0 ? (
          eventosListados.map((evento) => (
            <div 
              key={evento.id} 
              className={`bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 ${
                evento.completo ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex-1 space-y-1">
                  <h4 className={`text-white font-semibold ${evento.completo ? 'line-through' : ''}`}>
                    {evento.descricao}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {formatarData(evento.inicio)} - {formatarHora(evento.inicio)} às {formatarHora(evento.fim)}
                  </p>
                  {evento.completo && (
                    <span className="inline-block px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                      Concluído
                    </span>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      evento.completo 
                        ? 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800' 
                        : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                    } text-white`}
                    onClick={() => aoAlterarStatus(evento)}
                  >
                    {evento.completo ? 'Reabrir' : 'Concluir'}
                  </button>
                  <button 
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded text-sm font-medium transition-all duration-200 transform hover:scale-105"
                    onClick={() => deletarEvento(evento)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-white/50">
            <p className="text-sm">Nenhum evento encontrado</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListaDeEventos;