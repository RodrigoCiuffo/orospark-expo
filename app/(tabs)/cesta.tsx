import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'; 
import { useRouter } from 'expo-router';
import { useCarrinho } from '@/context/CarrinhoContext';
import CustomButton from '@/components/CustomButton';

const CestaScreen = () => {
  const router = useRouter();
  const carrinhoContext = useCarrinho(); // Obtém os dados do contexto do carrinho

  // Mostra uma mensagem caso o contexto ainda não tenha sido carregado
  if (!carrinhoContext) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagemVazia}>O carrinho ainda não foi carregado.</Text>
      </View>
    );
  }

  // Obtém os métodos e o estado do contexto para o funcionamento do carrinho
  const { carrinho, removerDoCarrinho, atualizarQuantidade, esvaziarCarrinho } = carrinhoContext;

  // Calcula o valor total da cesta somando preços dos itens multiplicados por suas quantidades
  const valorTotal = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);

  return (
    // Operador ternário abaixo para definir renederização da cesta vazia ou da cesta com um ou mais itens
    <View style={styles.container}>
      <Text style={styles.titulo}>CESTA DE COMPRAS</Text>
      {carrinho.length === 0 ? (
        <Text style={styles.mensagemVazia}>Sua cesta está vazia.</Text>
      ) : (
        <>
          {/* Exibe a lista de itens do carrinho */}
          <FlatList
            data={carrinho} // Usa os itens armazenados no contexto
            keyExtractor={(item) => item.id.toString()} // Define uma chave baseada no ID do prato
            renderItem={({ item }) => ( // Renderiza cada item do carrinho
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.imagem }} style={styles.imagem} />
                <View>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
                  <View style={styles.quantidadeContainer}>
                    <TouchableOpacity onPress={() => atualizarQuantidade(item.id, Math.max(1, item.quantidade - 1))}>
                      <Text style={styles.botaoQuantidade}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantidade}>{item.quantidade}</Text>
                    <TouchableOpacity onPress={() => atualizarQuantidade(item.id, item.quantidade + 1)}>
                      <Text style={styles.botaoQuantidade}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <CustomButton title="REMOVER" onPress={() => removerDoCarrinho(item.id)} style={styles.botaoRemover}/>
                </View>
              </View>
            )}
          />
          <Text style={styles.valorTotal}>TOTAL: R$ {valorTotal.toFixed(2)}</Text>
          <View style={styles.botoesFinais}>
            <CustomButton title="ESVAZIAR CESTA" onPress={esvaziarCarrinho} />
            <CustomButton title="VOLTAR" onPress={() => router.push({ pathname: '/(tabs)/home' })} />
          </View>
        </>
      )}
    </View>
  );
};

// Estilização da tela da cesta
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9B710',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  mensagemVazia: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginTop: 0,
    fontWeight: '600',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    height: 150,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F9B710',
    marginRight: 36,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  preco: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginVertical: 4,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#F9B710',
    borderRadius: 8,
    width: '80%',
    marginTop: -40,
    marginLeft: 0
  },
  botaoQuantidade: {
    fontSize: 36,
    color: '#000000',
    fontWeight: 900,
    paddingHorizontal: 12,
  },
  quantidade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 10,
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F9B710',
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 16,
    marginTop: 16,
  },
  botaoRemover: {
    borderWidth: 2,
    borderColor: '#F9B710',
    height: 50,
    marginLeft: 8,
  },
  botoesFinais: {
    gap: 12,
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default CestaScreen;