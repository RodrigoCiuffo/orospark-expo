import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import cardapioData from '../../assets/cardapio.json'; // Importa os dados do cardápio a partir do JSON
import CustomButton from '@/components/CustomButton';

// Interface que define a estrutura dos itens do cardápio
interface ItemCardapio {
  id: number;
  nome: string;
  thumbnail: string; // Imagem em miniatura do prato
  preco: number;
}

const CardapioScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtém o ID da loja selecionada a partir da URL atual
  const [itens, setItens] = useState<ItemCardapio[]>([]); // Estado para armazenar a lista de pratos da loja

  useEffect(() => {
    // Busca no JSON a loja correspondente ao ID encontrado na URL
    const lojaCardapio = cardapioData.restaurantes.find(
      (loja: { id: number }) => loja.id.toString() === id
    );

    // Controla qual é a loja atual
    if (lojaCardapio) setItens(lojaCardapio.pratos);
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>ESCOLHA UM PRATO</Text>

      {/* Exibição da lista de pratos da loja selecionada */}
      <FlatList
        data={itens} // Usa os pratos armazenados atualmente
        keyExtractor={(item) => item.id.toString()} // Define uma chave única para cada prato
        renderItem={({ item }) => ( // Renderiza cada prato da lista
          <TouchableOpacity 
            style={styles.itemContainer} 
            onPress={() => router.push({ pathname: "/(tabs)/item", params: { id: String(item.id) } })}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} /> 
            <View>
              <Text style={styles.nome}>{item.nome}</Text> 
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.botaoVoltar}>
        <CustomButton title={'VOLTAR'} onPress={() => router.push({ pathname: "/(tabs)/detalhamento" })} />
      </TouchableOpacity>
    </ScrollView>
  );
};

// Estilos da tela de cardápio
const styles = StyleSheet.create({
  titulo: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 28,
    marginBottom: 20},
  container: {
    flex: 1,
    backgroundColor: '#F9B710',
    padding: 20},
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#000000' },
  thumbnail: {
    width: '100%',
    height: 280,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black' },
  nome: {
    fontSize: 20,
    fontWeight: '900',
    color: '#F9B710' },
  preco: {
    fontSize: 18,
    color: '#F9B710',
    fontWeight: '900' },
  botaoVoltar: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20}
});

export default CardapioScreen;