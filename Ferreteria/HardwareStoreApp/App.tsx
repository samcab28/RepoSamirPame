import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen0 from './Screen0';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Screen5 from './Screen5';
import Nosotros from './Nosotros';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen0"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f6a800', // Color de fondo de la barra de navegación
        },
        headerTintColor: '#002f5c', // Color del texto en la barra de navegación
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Screen0" component={Screen0} options={{ title: 'Inicio' }}/>
      <Stack.Screen name="Screen1" component={Screen1} options={{ title: 'Agregar Producto' }} />
        <Stack.Screen name="Screen2" component={Screen2} options={{ title: 'Borrar Producto' }}/>
        <Stack.Screen name="Screen3" component={Screen3} options={{ title: 'Modificar Producto' }}/>
        <Stack.Screen name="Screen4" component={Screen4} options={{ title: 'Modificar Producto' }}/>
        <Stack.Screen name="Screen5" component={Screen5} options={{ title: 'Consultar Producto' }}/>
        <Stack.Screen name="Nosotros" component={Nosotros} options={{ title: 'Nosotros' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
