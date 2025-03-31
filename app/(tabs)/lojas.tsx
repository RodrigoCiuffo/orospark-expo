import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import lojasData from '../../assets/lojas.json';

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
    <View style={styles.container}>
      <FlatList
        data={lojas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.lojaContainer}
            onPress={() => router.push({ pathname: "/lojaDetalhe/[id]", params: { id: String(item.id) } })}
            >
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  lojaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LojasScreen;