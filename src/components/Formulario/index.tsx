import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSetRecoilState } from 'recoil';
import type { IEvento } from '../../interfaces/IEvento';
import { listaDeEventosState } from '../../state/atom';
import { obterId } from '../../util';

const Formulario: React.FC = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  const montarData = (data: string, hora: string) => {
    return new Date(`${data}T${hora}`);
  };

  const validationSchema = Yup.object({
    descricao: Yup.string().required('Descrição obrigatória'),
    dataInicio: Yup.string().required('Data obrigatória'),
    horaInicio: Yup.string().required('Hora obrigatória'),
    dataFim: Yup.string().required('Data obrigatória'),
    horaFim: Yup.string().required('Hora obrigatória'),
  });

  return (
    <Formik
      initialValues={{
        descricao: '',
        dataInicio: '',
        horaInicio: '',
        dataFim: '',
        horaFim: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const novoEvento: IEvento = {
          id: obterId(),
          descricao: values.descricao,
          inicio: montarData(values.dataInicio, values.horaInicio),
          fim: montarData(values.dataFim, values.horaFim),
          completo: false,
        };
        setListaDeEventos(eventos => [...eventos, novoEvento]);
        resetForm();
      }}
    >
      {() => (
        <Form className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">Novo evento</h3>

          <div className="space-y-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-white/80">
              Descrição
            </label>
            <Field
              id="descricao"
              name="descricao"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Descrição do evento"
              autoComplete="off"
            />
            <ErrorMessage 
              name="descricao" 
              component="div" 
              className="text-red-400 text-sm mt-1" 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dataInicio" className="block text-sm font-medium text-white/80">
              Data de início
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                id="dataInicio"
                name="dataInicio"
                type="date"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
              <Field
                id="horaInicio"
                name="horaInicio"
                type="time"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
            </div>
            <ErrorMessage 
              name="dataInicio" 
              component="div" 
              className="text-red-400 text-sm mt-1" 
            />
            <ErrorMessage 
              name="horaInicio" 
              component="div" 
              className="text-red-400 text-sm mt-1" 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dataFim" className="block text-sm font-medium text-white/80">
              Data de término
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                id="dataFim"
                name="dataFim"
                type="date"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
              <Field
                id="horaFim"
                name="horaFim"
                type="time"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
            </div>
            <ErrorMessage 
              name="dataFim" 
              component="div" 
              className="text-red-400 text-sm mt-1" 
            />
            <ErrorMessage 
              name="horaFim" 
              component="div" 
              className="text-red-400 text-sm mt-1" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-6 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Salvar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Formulario;