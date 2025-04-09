import { Redirect } from 'expo-router'; // Importa a função Redirect do Expo Router para redirecionamento automático

export default function Index() {
  return <Redirect href="/home" />; // Redireciona imediatamente para a tela inicial (Home)
}