import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Obtém parâmetros da URL para identificar a loja selecionada
import lojasData from '../../assets/lojas.json'; // Importa os dados das lojas a partir do JSON
import { useRouter } from 'expo-router'; 
import CustomButton from '@/components/CustomButton';

// Interface para definir o formato dos dados de uma loja
interface Loja {
  id: number;
  nome: string;
  descricao: string;
  telefone: string;
  whatsapp: string;
  logo: string;
  banner: string;
  fotos: string[];
  delivery: string;
}

const LojaDetalheScreen = () => {
  const router = useRouter(); 
  const { id } = useLocalSearchParams(); // Obtém o ID da loja selecionada a partir da URL atual
  const [loja, setLoja] = useState<Loja | null>(null); // Estado para armazenar os detalhes da loja

  useEffect(() => {
    // Busca no JSON a loja correspondente ao ID fornecido
    const lojaSelecionada = lojasData.find((item) => item.id.toString() === id);

    // Se a loja for encontrada, atualiza o estado
    if (lojaSelecionada) setLoja(lojaSelecionada);
  }, [id]); // Executa a busca sempre que o ID da loja mudar

  // Se nenhuma loja for encontrada, exibe uma mensagem informativa ao usuário
  if (!loja) return <Text>Selecione uma loja na aba Lojas para prosseguir.</Text>;

  return (
    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} style={styles.container}>
      <Image source={{ uri: loja.banner }} style={styles.banner} />
      <Text style={styles.nome}>{loja.nome}</Text>
      <Text style={styles.secundarios}>{loja.descricao}</Text>
      <View style={styles.fotosContainer}>
        {loja.fotos.map((foto: string, index: number) => (
          <Image key={index} source={{ uri: foto }} style={styles.foto} />
        ))}
      </View>
      <View style={styles.divContato}>
        <Text style={styles.contato}>Telefone: {loja.telefone}</Text>
        <Text style={styles.contato}>WhatsApp: {loja.whatsapp}</Text>
      </View>
      <View style={styles.containerBotao}>
        <CustomButton title={'DELIVERY'} onPress={() => Linking.openURL(loja.delivery)} /> 
        <CustomButton title={'CARDÁPIO'} onPress={() => router.push({ pathname: "/cardapio", params: { id: String(loja.id) } })} />
      </View>
      <CustomButton title={'VOLTAR'} onPress={() => router.push({ pathname: "/lojas" })} />
    </ScrollView>
  );
};

// Estilização da tela de detalhamento da loja
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F9B710' },
  banner: { 
    width: '100%', 
    height: 200, 
    borderRadius: 10, 
    borderWidth: 2 },
  nome: { 
    fontSize: 28, 
    fontWeight: 900, 
    marginTop: 10 },
  secundarios: { 
    fontSize: 18, 
    marginVertical: 10, 
    fontWeight: 600 },
  fotosContainer: { 
    flexDirection: 'row', 
    marginVertical: 10},
  foto: { 
    width: 100, 
    height: 100, 
    marginRight: 10, 
    borderRadius: 5, 
    borderWidth: 2, 
    borderColor: 'black' },
  link: { 
    fontSize: 16, 
    color: 'blue', 
    marginTop: 10 },
  containerBotao: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    marginBottom: -20},
  contato: { 
    fontWeight: 900, 
    fontSize: 16},
  divContato: { 
    width: '100%', 
    marginTop: 10, 
    marginBottom: 20}
});

export default LojaDetalheScreen;