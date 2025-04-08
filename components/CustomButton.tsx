import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style }) => {
  return (
    <Pressable style={[styles.botaoLojas, style]} onPress={onPress}>
      <Text style={styles.textoBotao}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  botaoLojas: {
    height: 52.5,
    width: 160,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 10
  },
  textoBotao: {
    color: '#F9B710',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default CustomButton;