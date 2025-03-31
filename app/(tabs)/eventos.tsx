import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Video } from 'expo-av';

const eventos = [
  { id: '1', nome: 'Show de Samba', video: require('../../assets/videos/samba.mp4') },
  { id: '2', nome: 'Stand-up Comedy', video: require('../../assets/videos/comedy.mp4') },
];

const EventosScreen = () => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  evento: { marginBottom: 20 },
  nome: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  video: { width: '100%', height: 200 },
});

export default EventosScreen;