import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import { Video } from 'expo-av';
import eventosData from '../../assets/eventos.json';

interface Evento {
  id: string;
  nome: string;
  video: {
    uri: string;
  };
}

const EventosScreen = () => {
  const [eventos, setEventos] = React.useState<Evento[]>([]);

  React.useEffect(() => {
    setEventos(eventosData);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EVENTOS SEMANAIS</Text>
      <Text style={styles.descricao}>Aqui você consegue acompanhar nossa programação dos fins de semana e, de quebra, ganhar uma palhinha das bandas incríveis que pode ouvir e assistir no nosso Orospark! :)</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.evento}>
            {(index === 0) && (
              <Text style={styles.semanas}>11/04 a 13/04</Text>
            )}
            {(index === 3) && (
              <Text style={styles.semanas}>18/04 a 20/04</Text>
            )}
            {(index === 6) && (
              <Text style={styles.semanas}>25/04 a 27/04</Text>
            )}
            <Text style={styles.nome}>{item.nome}</Text>
            <Video source={item.video} style={styles.video} useNativeControls />
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#000000',
    flex: 1, 
    padding: 20,
    borderWidth: 2,
    borderColor: '#F9B710'},
  evento: { 
    marginBottom: 20 },
  nome: { 
    fontSize: 18, 
    fontWeight: 900, 
    marginBottom: 10,
    color: '#F9B710' },
  video: { 
    width: '100%', 
    height: 200,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 2,
  borderColor: '#F9B710'},
  titulo: {
    width: '100%',
    fontSize: 24,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: 20,
    color: '#F9B710'
  },
  descricao: {
    color: '#F9B710',
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 40,
    textAlign: 'center'
  },
  semanas: {
    width: '100%',
    fontSize: 22,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: 20,
    color: '#F9B710'
  }
});

export default EventosScreen;