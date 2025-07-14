import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);
    
    const eventos = todosOsEventos.filter(evento => {
      if (!filtro.data) {
        return true;
      }
      const ehOMesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);
      return ehOMesmoDia;
    });
    
    return eventos;
  }
});

// Seletor para eventos do dia atual
export const eventosHojeState = selector({
  key: 'eventosHojeState',
  get: ({ get }) => {
    const todosOsEventos = get(listaDeEventosState);
    const hoje = new Date();
    
    return todosOsEventos.filter(evento => {
      const ehHoje = hoje.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);
      return ehHoje;
    });
  }
});

// Seletor para eventos por status
export const eventosPorStatusState = selector({
  key: 'eventosPorStatusState',
  get: ({ get }) => {
    const todosOsEventos = get(listaDeEventosState);
    
    return {
      completos: todosOsEventos.filter(evento => evento.completo),
      pendentes: todosOsEventos.filter(evento => !evento.completo),
      total: todosOsEventos.length
    };
  }
});

// Seletor para eventos da semana atual
export const eventosSemanaState = selector({
  key: 'eventosSemanaState',
  get: ({ get }) => {
    const todosOsEventos = get(listaDeEventosState);
    const hoje = new Date();
    
    // Início da semana (domingo)
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    inicioSemana.setHours(0, 0, 0, 0);
    
    // Fim da semana (sábado)
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);
    fimSemana.setHours(23, 59, 59, 999);
    
    return todosOsEventos.filter(evento => {
      const dataEvento = new Date(evento.inicio);
      return dataEvento >= inicioSemana && dataEvento <= fimSemana;
    });
  }
});