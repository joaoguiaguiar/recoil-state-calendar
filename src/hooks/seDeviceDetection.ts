import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType({
        isMobile: width < 768,       // < 768px
        isTablet: width >= 768 && width < 1024,  // 768px - 1023px
        isDesktop: width >= 1024,     // ≥ 1024px
      });
    };

    // Executa imediatamente para definir o estado inicial
    handleResize();

    // Adiciona listener para redimensionamento da janela
    window.addEventListener('resize', handleResize);

    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};

export default useDeviceDetection;