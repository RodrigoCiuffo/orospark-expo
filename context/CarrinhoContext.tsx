import React, { createContext, useContext, useState, useEffect } from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface que define a estrutura de um item no carrinho
interface ItemCarrinho {
  id: number;
  nome: string; 
  preco: number; 
  quantidade: number; 
  imagem: string; 
}

// Interface para definir os métodos e estado do contexto do carrinho
interface CarrinhoContextType {
  carrinho: ItemCarrinho[]; 
  adicionarAoCarrinho: (item: ItemCarrinho) => void; 
  removerDoCarrinho: (id: number) => void; 
  atualizarQuantidade: (id: number, quantidade: number) => void; 
  esvaziarCarrinho: () => void; 
}

// Criação do contexto do carrinho
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]); // Estado para armazenar os itens do carrinho

  // Carrega os itens do carrinho armazenados no AsyncStorage ao iniciar o app
  useEffect(() => {
    const carregarCarrinho = async () => {
      const carrinhoSalvo = await AsyncStorage.getItem('@carrinho'); // Busca o carrinho salvo no armazenamento do dispositivo
      if (carrinhoSalvo) setCarrinho(JSON.parse(carrinhoSalvo)); // Atualiza o estado com os dados recuperados
    };
    carregarCarrinho();
  }, []);

  // Salva os itens do carrinho no AsyncStorage sempre que houver alteração
  useEffect(() => {
    AsyncStorage.setItem('@carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // Função para adicionar um item ao carrinho
  const adicionarAoCarrinho = (item: ItemCarrinho) => {
    setCarrinho((carrinhoAnterior) => {
      const itemExistente = carrinhoAnterior.find((produto) => produto.id === item.id);
      if (itemExistente) {
        // Se o item já existir, apenas incrementa a quantidade
        return carrinhoAnterior.map((produto) =>
          produto.id === item.id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
        );
      } else {
        // Caso contrário, adiciona um novo item ao carrinho
        return [...carrinhoAnterior, { ...item, quantidade: 1 }];
      }
    });
  };

  // Remover um item do carrinho
  const removerDoCarrinho = (id: number) => {
    setCarrinho((carrinhoAnterior) => carrinhoAnterior.filter((item) => item.id !== id));
  };

  // Atualizar a quantidade de um item específico no carrinho
  const atualizarQuantidade = (id: number, quantidade: number) => {
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  // Esvaziar completamente o carrinho
  const esvaziarCarrinho = () => {
    setCarrinho([]);
  };

  return (
    // Garante que todas as telas tenham acesso ao contexto do carrinho
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade, esvaziarCarrinho }}>
      {children} 
    </CarrinhoContext.Provider>
  );
};

// Hook personalizado para acessar o contexto do carrinho
export const useCarrinho = () => {
  return useContext(CarrinhoContext);
};