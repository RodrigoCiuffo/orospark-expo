import React from 'react'; 
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Biblioteca para exibir mapas e localização
import { useRouter } from 'expo-router'; // Gerencia a navegação entre telas

const HomeScreen = () => {
  const router = useRouter(); // Hook para navegação

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={require('../../assets/images/food_park.png')} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.h1}>Bem-vindo ao Orospark!</Text>
          <Text style={styles.intro}>
            Orospark é um dos food parks mais frequentados e bem avaliados de Florianópolis. 
            Nossos restaurantes parceiros garantirão que saia daqui feliz e satisfeito!
          </Text>
          <Text style={styles.h2}>Nossos restaurantes</Text>
          <Text style={styles.intro}>
            Os nossos restaurantes parceiros estão entre os mais aclamados da capital. Aqui, você pode curtir um belo "churras" no <Text style={styles.loja}>Churrasco Sul</Text>,
            experimentar o melhor hambúrguer da região na <Text style={styles.loja}>Hamburgueria 99</Text> e muito mais! :D
          </Text>
          <View style={styles.iconsDiv}>
            <Image source={{ uri: 'https://i.imgur.com/FItyk4R.jpeg'}} style={styles.iconsLoja}/>
            <Image source={{ uri: 'https://i.imgur.com/JWYbZiY.jpeg'}} style={styles.iconsLoja}/>
            <Image source={{ uri: 'https://i.imgur.com/k7o4fj1.jpeg'}} style={styles.iconsLoja}/>
            <Image source={{ uri: 'https://i.imgur.com/TPnvjBN.jpeg'}} style={styles.iconsLoja}/>
            <Image source={{ uri: 'https://i.imgur.com/8qp8MlY.jpeg'}} style={styles.iconsLoja}/>
          </View>
          <Pressable style={styles.botaoLojas} onPress={() => router.push({ pathname: "/lojas" })}>
            <Text style={{ color: '#F9B710', fontWeight: '800', fontSize: 16}}>RESTAURANTES</Text>
          </Pressable>
          <Text style={styles.h2}>Você pode nos encontrar em:</Text>
          <View style={styles.iconsDiv}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/...')}>
              <Image source={{ uri: 'https://i.imgur.com/zmH0Z8l.png'}} style={styles.gps}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos da tela inicial
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9B710' },
  content: { 
    alignItems: 'center', 
    paddingLeft: 20, 
    paddingRight: 20},
  image: { 
    width: '100%', 
    height: 230, 
    padding: 0},
  h1: { 
    textAlign: 'center', 
    fontSize: 28, 
    fontWeight: 900, 
    color: '#000000', 
    marginBottom: 10,  
    marginTop: 20 },
  intro: { 
    textAlign: 'center', 
    fontSize: 20, 
    color: '#000000', 
    marginBottom: 30, 
    fontWeight: 500 },
  map: { 
    width: '100%', 
    height: 350, 
    marginTop: 10, 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20},
  iconsDiv: { 
    width: '100%',
    height: 100, 
    alignItems: 'center', 
    justifyContent: 'space-evenly', 
    flexDirection: 'row', 
    marginTop: 20,},
  loja: { 
    fontWeight: 800},
  h2: { 
    fontSize: 24, 
    fontWeight: 900,
    marginBottom: 20},
  botaoLojas: { 
    height: 52.5, 
    width: 200, 
    backgroundColor: '#000000', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 20, 
    marginBottom: 30},
  iconsLoja: { 
    width: 60, 
    height: 60, 
    borderRadius: 30,
    marginRight: 10, 
    marginTop: -30, 
    marginBottom: 30, 
    borderWidth: 2},
  gps: {
    width: 50, 
    height: 60, 
    borderRadius: 30,
    marginRight: 10, 
    marginTop: -30, 
    marginBottom: 30, 
  }
});

export default HomeScreen;