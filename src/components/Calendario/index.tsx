import React from 'react';
import Kalend, {
  CalendarView,
  type CalendarEvent,
  type OnEventDragFinish,
} from 'kalend';
import 'kalend/dist/styles/index.css';
import ptBR from './localizacao/ptBR.json';
import { useRecoilValue } from 'recoil';
import { listaDeEventosState } from '../../state/atom';
import useAtualizarEvento from '../../state/hooks/useAtualizarEvento';

const Calendario: React.FC = () => {
  const eventos = useRecoilValue(listaDeEventosState);
  const atualizarEvento = useAtualizarEvento();

  const eventosKalend: CalendarEvent[] = eventos.map(evento => ({
    id: String(evento.id), 
    startAt: evento.inicio.toISOString(),
    endAt: evento.fim.toISOString(),
    summary: evento.descricao,
    calendarID: 'principal',
    color: 'blue',
  }));

  const onEventDragFinish: OnEventDragFinish = (
    _original: CalendarEvent,
    atualizado: CalendarEvent
  ) => {
    const evento = eventos.find(e => e.id?.toString() === atualizado.id);
    if (evento) {
      atualizarEvento({
        ...evento,
        inicio: new Date(atualizado.startAt),
        fim: new Date(atualizado.endAt),
      });
    }
  };

  return (
    <div className="w-full h-[90vh] max-w-6xl mx-auto rounded-xl overflow-hidden border border-white/10 backdrop-blur-lg bg-white/5 p-4 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Calendário</h3>
      <Kalend
        events={eventosKalend}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat="24"
        weekDayStart="Monday"
        calendarIDsHidden={['work']}
        language="customLanguage"
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
        showTimeLine
        isDark
      />
    </div>
  );
};

export default Calendario;
