import React, { useEffect, useState } from 'react';
import { Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'; 
import { useLocalSearchParams, router } from 'expo-router'; // Hooks para obtenção de parâmetros e navegação
import { useCarrinho } from '@/context/CarrinhoContext'; // Importa o contexto da cesta de compras
import cardapioData from '../../assets/cardapio.json'; // Importa os dados do cardápio a partir do JSON
import CustomButton from '@/components/CustomButton';

// Interface que define a estrutura dos itens do cardápio
interface ItemCardapio {
  id: number;
  nome: string;
  imagem: string; 
  descricao: string;
  ingredientes: string[]; 
  preco: number; 
}

const DetalheItemScreen = () => {
  const { id } = useLocalSearchParams(); // Obtém o ID do item a partir da URL atual
  const carrinhoContext = useCarrinho(); // Obtém o contexto do carrinho

  // Caso o contexto do carrinho não tenha sido carregado corretamente, exibe um aviso
  if (!carrinhoContext) {
    return <Text>Erro: O contexto do carrinho não foi carregado corretamente.</Text>;
  }

  const { adicionarAoCarrinho } = carrinhoContext; // Adicionar itens ao carrinho

  const [item, setItem] = useState<ItemCardapio | null>(null); // Estado para armazenar os detalhes do prato selecionado

  useEffect(() => {
    // Busca o item no JSON do cardápio com base no ID recebido na URL
    cardapioData.restaurantes.forEach((loja: { pratos: ItemCardapio[] }) => {
      const encontrado = loja.pratos.find((produto: ItemCardapio) => produto.id.toString() === id);
      if (encontrado) setItem(encontrado); // Atualiza o estado com os detalhes do prato
    });
  }, [id]); // Executa a busca sempre que o ID do item mudar

  // Caso o item não seja encontrado, exibe uma mensagem informativa
  if (!item) return <Text>Selecione um dos itens de cardápio das lojas.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.ingredientesTitulo}>Ingredientes:</Text>
      {item.ingredientes.map((ingrediente, index) => (
        <Text key={index} style={styles.ingrediente}>- {ingrediente}</Text> // Renderiza os ingredientes dinamicamente
      ))}
      <CustomButton title="Adicionar à Cesta" onPress={() => adicionarAoCarrinho({ ...item, quantidade: 1 })} />
      <TouchableOpacity style={styles.botaoVoltar}>
        <CustomButton title="VOLTAR" onPress={() => router.push({ pathname: "/(tabs)/cardapio" })} />
      </TouchableOpacity>
    </ScrollView>
  );
};

// Estilização da tela de detalhamento do prato
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F9B710' 
  },
  imagem: { 
    width: '100%', 
    height: 250, 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: 'black' 
  },
  nome: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  descricao: { 
    fontSize: 18, 
    marginVertical: 10,
    fontWeight: '600' 
  },
  preco: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000000', 
    marginVertical: 10 
  },
  ingredientesTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  ingrediente: { 
    fontSize: 18,
    fontWeight: '600' 
  },
  botaoVoltar: { 
    width: '100%', 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 20 
  }
});

export default DetalheItemScreen;