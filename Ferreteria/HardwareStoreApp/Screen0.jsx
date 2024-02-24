import React from 'react';
import { View, Text,  Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

const Screen0 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ferretería El Cielo</Text>  
      <Button title="Agregar" onPress={() => navigation.navigate('Screen1')} />
      <Button title="Ver" onPress={() => navigation.navigate('Screen5')} />
      <Button title="Borrar" onPress={() => navigation.navigate('Screen2')} />
      <Button title="Modificar" onPress={() => navigation.navigate('Screen3')} />
    </View>
  );
};



export default Screen0;