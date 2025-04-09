import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import cardapioData from '../../assets/cardapio.json';
import CustomButton from '@/components/CustomButton';

interface ItemCardapio {
  id: number;
  nome: string;
  imagem: string;
  descricao: string;
  quantidade: string;
  ingredientes: string[];
  preco: number;
}

const DetalheItemScreen = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<ItemCardapio | null>(null);

  useEffect(() => {
    cardapioData.restaurantes.forEach((loja: { pratos: ItemCardapio[] }) => {
      const encontrado = loja.pratos.find((produto: ItemCardapio) => produto.id.toString() === id);
      if (encontrado) setItem(encontrado);
    });
  }, [id]);

  if (!item) return <Text>Selecione um dos itens de cardápio das lojas.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.ingredientesTitulo}>Ingredientes:</Text>
      {item.ingredientes.map((ingrediente, index) => (
        <Text key={index} style={styles.ingrediente}>- {ingrediente}</Text>
      ))}
          <TouchableOpacity style={styles.botaoVoltar}>
          <CustomButton title={'VOLTAR'} onPress={() => router.push({ pathname: "/(tabs)/cardapio"})}></CustomButton>
          </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F9B710' },
  imagem: { 
    width: '100%', 
    height: 250, 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: 'black' },
  nome: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 10 },
  descricao: { 
    fontSize: 18, 
    marginVertical: 10,
    fontWeight: 600 },
  quantidade: { 
    fontSize: 16, 
    fontWeight: 'bold' },
  preco: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000000', 
    marginVertical: 10 },
  ingredientesTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10 },
  ingrediente: { 
    fontSize: 18,
    fontWeight: 600 },
  botaoVoltar: { 
    width: '100%', 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 20}
});

export default DetalheItemScreen;
