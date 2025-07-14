import './App.scss';
import { useState } from 'react';
import Card from './components/Card';
import Formulario from './components/Formulario';
import Calendario from './components/Calendario';
import ListaDeEventos from './components/ListaDeEventos';
import { RecoilRoot } from 'recoil';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <RecoilRoot>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none"></div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Overlay */}
          {isMenuOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}

          {/* Desktop Layout (1024px+) */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-6 lg:p-6 lg:h-screen">
            <div className="lg:col-span-2 space-y-6 overflow-y-auto">
              <Card>
                <Formulario />
              </Card>

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <Card>
                <ListaDeEventos />
              </Card>
            </div>

            {/* Right Column - Calendar */}
            <div className="lg:col-span-3 h-[90vh]">
              <Calendario />
            </div>
          </div>

          {/* Tablet Layout (768px - 1024px) */}
          <div className="hidden md:block lg:hidden">
            <div className="p-4 space-y-6 min-h-screen">
              <Card>
                <Formulario />
              </Card>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card>
                  <ListaDeEventos />
                </Card>

                <div className="xl:col-span-1">
                  <Calendario />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout (até 768px) */}
          <div className="md:hidden">
            <div className={`fixed inset-y-0 left-0 z-50 w-full max-w-sm transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <div className="h-full bg-slate-900/95 backdrop-blur-sm border-r border-white/10 p-4 space-y-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-white">Menu</h1>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-white/70 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <Card>
                  <Formulario />
                </Card>

                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <Card>
                  <ListaDeEventos />
                </Card>
              </div>
            </div>

            {/* Conteúdo principal mobile */}
            <div className="p-2 pt-20 min-h-screen">
              <Calendario />
            </div>
          </div>
        </div>
      </DndProvider>
    </RecoilRoot>
  );
}

export default App;