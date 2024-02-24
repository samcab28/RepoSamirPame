import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen0 from './Screen0';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Screen5 from './Screen5';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen0">
      <Stack.Screen name="Screen0" component={Screen0} options={{ title: 'Inicio' }}/>
      <Stack.Screen name="Screen1" component={Screen1} options={{ title: 'Guardar Producto' }} />
        <Stack.Screen name="Screen2" component={Screen2} options={{ title: 'Borrar Producto' }}/>
        <Stack.Screen name="Screen3" component={Screen3} options={{ title: 'Modificar Producto' }}/>
        <Stack.Screen name="Screen4" component={Screen4} options={{ title: 'Modifique Producto' }}/>
        <Stack.Screen name="Screen5" component={Screen5} options={{ title: 'Consultar Producto' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
