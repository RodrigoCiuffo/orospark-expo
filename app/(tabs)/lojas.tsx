import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import lojasData from '../../assets/lojas.json';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '@/components/CustomButton';

interface Loja {
  id: number;
  nome: string;
  logo: string;
}

const LojasScreen = () => {
  const router = useRouter();
  const [lojas, setLojas] = useState<Loja[]>([]);

  useEffect(() => {
    setLojas(lojasData);
  }, []);

  return (
    <ScrollView >
      <View style={styles.container}>
      <Image style={styles.banner} source={require('../../assets/images/restaurant-meal-md.png')}></Image>
      <Text style={styles.h1}>RESTAURANTES</Text>
      <FlatList
        data={lojas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.lojaContainer}
            onPress={() => router.push({ pathname: "/lojaDetalhe", params: { id: String(item.id) } })}>
            <Image source={{uri: item.logo}}  style={styles.logo} />
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>)}/>
          <CustomButton title={'VOLTAR'} onPress={() => router.push({ pathname: "/"})}></CustomButton>
          </View>
    </ScrollView>

  );
};

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
    marginTop: 20},
  h1:{ 
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 900,
    color: '#000000',
    marginBottom: 10, 
    marginTop: 20 },
});

export default LojasScreen;