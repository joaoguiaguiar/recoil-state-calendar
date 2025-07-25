import { useSetRecoilState } from "recoil";
import type { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

const useDeletarEvento = () => {
  const setListaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
  return (evento: IEvento) => {

    setListaEventos((listaAntiga) => [
      ...listaAntiga.filter(evt => evento.id !== evt.id)
    ])
  }
}

export default useDeletarEvento