import { Drawer } from 'expo-router/drawer'; // Importa o sistema de navegação Drawer (menu hamburguer)
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback, useState } from 'react'; 
import { View } from 'react-native'; 
import { CarrinhoProvider } from '@/context/CarrinhoContext'; // Importa o contexto da cesta de compras

// Garante que a tela de abertura não saia automaticamente antes do carregamento estar completo
SplashScreen.preventAutoHideAsync();

const DrawerLayout = () => {
  const [isReady, setIsReady] = useState(false); // Controla se o app está pronto

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula um tempo de carregamento para exibir a splash
      setIsReady(true); // Define que o app está pronto
    };

    prepare();
  }, []);

  // Quando o app estiver pronto, oculta a tela de abertura
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  // Se o app ainda não estiver carregado, retorna null para evitar renderização incompleta
  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <CarrinhoProvider> 
        <Drawer /> 
      </CarrinhoProvider>
    </View>
  );
};

export default DrawerLayout; // Exporta o layout da aplicação