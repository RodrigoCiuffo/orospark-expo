import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import { Video } from 'expo-av';

const eventos = [
  
  {
    id: '1',
    nome: 'System of a Down',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744071355/System_Of_A_Down_-_Chop_Suey_Official_HD_Video_1_ytasmu.mp4' }
  },
  {
    id: '2',
    nome: 'Scalene',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744122166/surreal_yv4YAb04_isquvj.mp4' }
  },
  {
    id: '3',
    nome: 'Supercombo',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744121957/sol-da-manha-supercombo-clipe-1_BS38eggM_zuaogv.mp4'}
  },
  {
    id: '4',
    nome: 'Seafret',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744122865/seafret-loving-you-official-video_fFqtg4Mf_axqyh8.mp4'}
  },
  {
    id: '5',
    nome: 'Tom Odell',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744121028/tom-odell-sense-1_t0muuqQA_ndq5ds.mp4'}
  },
  {
    id: '6',
    nome: 'Arctic Monkeys',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744120402/Arctic_Monkeys_-_Fluorescent_Adolescent_Official_Video_llysko.mp4'}
  },
  {
    id: '7',
    nome: 'Creed',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744120402/Arctic_Monkeys_-_Fluorescent_Adolescent_Official_Video_llysko.mp4'}
  },
  {
    id: '8',
    nome: 'Los Retros',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744120402/Arctic_Monkeys_-_Fluorescent_Adolescent_Official_Video_llysko.mp4'}
  },
  {
    id: '9',
    nome: 'Cuco',
    video: { uri: 'https://res.cloudinary.com/dnq5qpsot/video/upload/v1744120402/Arctic_Monkeys_-_Fluorescent_Adolescent_Official_Video_llysko.mp4'}
  },
];

const EventosScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EVENTOS SEMANAIS</Text>
      <Text style={styles.descricao}>Aqui você consegue acompanhar nossa programação dos fins de semana e, de quebra, ganhar uma palhinha das bandas incríveis que pode ouvir e assistir no nosso Orospark! :)</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.evento}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Video source={item.video} style={styles.video} useNativeControls/>
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
    padding: 20 },
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
    borderRadius: 20},
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
    marginBottom: 40
  }
});

export default EventosScreen;