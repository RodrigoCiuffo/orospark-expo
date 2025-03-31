import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import lojasData from '../../assets/lojas.json';

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
  cardapio: string;
}

const LojaDetalheScreen = () => {
  const { id } = useLocalSearchParams();
  const [loja, setLoja] = useState<Loja | null>(null);

  useEffect(() => {
    const lojaSelecionada = lojasData.find((item) => item.id.toString() === id);
    if (lojaSelecionada) setLoja(lojaSelecionada);
  }, [id]);

  if (!loja) return <Text>Carregando...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: loja.banner }} style={styles.banner} />
      <Text style={styles.nome}>{loja.nome}</Text>
      <Text style={styles.descricao}>{loja.descricao}</Text>
      <View style={styles.fotosContainer}>
        {loja.fotos.map((foto: string, index: number) => (
          <Image key={index} source={{ uri: foto }} style={styles.foto} />
        ))}
      </View>
      <Text style={styles.contato}>Telefone: {loja.telefone}</Text>
      <Text style={styles.contato}>WhatsApp: {loja.whatsapp}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(loja.delivery)}>
        <Text style={styles.link}>Pedir no delivery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(loja.cardapio)}>
        <Text style={styles.link}>Ver cardápio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  banner: { width: '100%', height: 200, borderRadius: 10 },
  nome: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  descricao: { fontSize: 16, marginVertical: 10 },
  fotosContainer: { flexDirection: 'row', marginVertical: 10 },
  foto: { width: 100, height: 100, marginRight: 10, borderRadius: 5 },
  contato: { fontSize: 16, marginTop: 5 },
  link: { fontSize: 16, color: 'blue', marginTop: 10 },
});

export default LojaDetalheScreen;