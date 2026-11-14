import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detalhes from './screens/Detalhes';
import Formulario from './screens/Formulario';
import Home from './screens/Home';
import { receitasIniciais } from './data/receitas';
import { cores } from './data/tema';

const Stack = createNativeStackNavigator();

const opcoesPadrao = {
  headerStyle: { backgroundColor: cores.principal },
  headerTintColor: cores.textoClaro,
  headerTitleStyle: { fontWeight: '700' },
  contentStyle: { backgroundColor: cores.fundo },
};

export default function App() {
  const [receitas, setReceitas] = useState(receitasIniciais);

  const adicionarReceita = (dadosDaReceita) => {
    setReceitas((atuais) => {
      const maiorId = Math.max(0, ...atuais.map((receita) => receita.id));

      return [{ ...dadosDaReceita, id: maiorId + 1 }, ...atuais];
    });
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Home" screenOptions={opcoesPadrao}>
        <Stack.Screen name="Home" options={{ title: 'Receitas' }}>
          {(props) => <Home {...props} receitas={receitas} />}
        </Stack.Screen>

        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={({ route }) => ({
            title: route.params?.receita?.nome ?? 'Detalhes',
          })}
        />

        <Stack.Screen name="Formulario" options={{ title: 'Nova receita' }}>
          {(props) => <Formulario {...props} aoCadastrar={adicionarReceita} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}