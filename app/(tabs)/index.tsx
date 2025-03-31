import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Linking, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = () => {
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require('../../assets/images/food_park.png')} style={styles.image} />
        <Text style={styles.h1}>Bem-vindo ao Orospark!</Text>
        <Text style={styles.intro}>
          Orospark é um dos food parks mais frequentados e bem avaliados de Florianópolis. 
          Nossos restaurantes parceiros garantirão que saia daqui feliz e satisfeito!
        </Text>
        <Text style={styles.h2}>Você pode nos encontrar em:</Text>
        <MapView
          style={styles.map}
          initialRegion={{ latitude: -27.5954, longitude: -48.5480, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
          <Marker coordinate={{ latitude: -27.5954, longitude: -48.5480 }} title="Orospark" />
        </MapView>
        <View style={styles.iconsDiv}>
        <TouchableOpacity>
        <Image source={require('../../assets/images/tele.png')} style={styles.icons}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../assets/images/insta.png')} style={styles.icons}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../assets/images/email.png')} style={styles.icons}/>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#a37a51' },
  content: { alignItems: 'center', padding: 20 },
  image: { width: 375, height: 230},
  h1: { fontSize: 28, fontWeight: 900, color: '#000000', marginBottom: 10,  marginTop: 40 },
  intro: { textAlign: 'center', fontSize: 20, color: '#000000', marginBottom: 40, fontWeight: 500 },
  info: { fontSize: 16, color: 'blue', marginBottom: 10 },
  map: { width: '100%', height: 200, marginTop: 10, borderRadius: 10 },
  iconsDiv: {width: '100%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', marginTop: 30},
  icons: {},
  h2: {fontSize: 24, fontWeight: 900}

});

export default HomeScreen;