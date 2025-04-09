import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import { Video } from 'expo-av'; // Componente de vídeo do Expo para exibição de apresentações
import eventosData from '../../assets/eventos.json'; // Importa os dados dos eventos a partir do JSON

// Interface que define a estrutura dos eventos
interface Evento {
  id: string;
  nome: string; 
  video: {
    uri: string;
  };
}

const EventosScreen = () => {
  const [eventos, setEventos] = React.useState<Evento[]>([]); // Estado para armazenar a lista de eventos

  React.useEffect(() => {
    setEventos(eventosData); // Atualiza o estado com os eventos carregados do JSON
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EVENTOS SEMANAIS</Text>
      <Text style={styles.descricao}>
        Aqui você consegue acompanhar nossa programação dos fins de semana e, de quebra, ganhar uma palhinha das bandas incríveis que pode ouvir e assistir no nosso Orospark! :)
      </Text>
      <FlatList
        data={eventos} // Usa os eventos carregados do JSON
        keyExtractor={(item) => item.id} // Define uma chave única baseada no ID do evento
        renderItem={({ item, index }) => ( // Renderiza cada evento da lista (com adição das datas a cada 3 eventos ou período de sexta, sábado e domingo)
          <View style={styles.evento}>
            {(index === 0) && <Text style={styles.semanas}>11/04 a 13/04</Text>}
            {(index === 3) && <Text style={styles.semanas}>18/04 a 20/04</Text>}
            {(index === 6) && <Text style={styles.semanas}>25/04 a 27/04</Text>}
            <Text style={styles.nome}>{item.nome}</Text>
            <Video source={item.video} style={styles.video} useNativeControls />
          </View>
        )}
      />
    </ScrollView>
  );
};

// Estilos da tela de eventos
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