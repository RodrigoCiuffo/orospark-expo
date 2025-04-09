import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import lojasData from '../../assets/lojas.json'; // Importa os dados das lojas a partir do JSON
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '@/components/CustomButton';

// Interface que define a estrutura dos dados de uma loja
interface Loja {
  id: number;
  nome: string;
  logo: string;
}

const LojasScreen = () => {
  const router = useRouter();
  const [lojas, setLojas] = useState<Loja[]>([]); // Estado para armazenar a listagem de lojas

  useEffect(() => {
    setLojas(lojasData); // Carrega os dados das lojas a partir do JSON
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.banner} source={{ uri: 'https://i.imgur.com/uHpBZSv.png' }} />
        <Text style={styles.h1}>RESTAURANTES</Text>
        <FlatList
          data={lojas} // Usa os dados carregados do JSON
          keyExtractor={(item) => item.id.toString()} // Define uma chave única baseada no ID da loja atual
          renderItem={({ item }) => ( // Renderiza cada loja dinamicamente
            <TouchableOpacity
              style={styles.lojaContainer}
              onPress={() => router.push({ pathname: "/detalhamento", params: { id: String(item.id) } })}>
              <Image source={{ uri: item.logo }} style={styles.logo} />
              <Text style={styles.nome}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
        <CustomButton title={'VOLTAR'} onPress={() => router.push({ pathname: "/(tabs)/home" })} />
      </View>
    </ScrollView>
  );
};

// Estilização da tela de restaurantes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9B710',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lojaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#F9B710'

  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  banner: {
    marginTop: 20,
    width: 297,
    height: 219},
  h1:{ 
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 900,
    color: '#000000',
    marginBottom: 10, 
    marginTop: 20 },
});

export default LojasScreen;