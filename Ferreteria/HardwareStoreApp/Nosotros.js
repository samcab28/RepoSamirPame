import React from 'react';
import { View, Text, Image,  StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002F5C",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFCE1B',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
    marginBottom:20,
    textAlign: 'left',
  },
  
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  button: {
    width: 200,
    height: 50, // ajusta la altura según sea necesario
    marginBottom: 0, // ajusta el margen inferior según sea necesario
  },
  name: {
    color: '#FFCE1B',
    fontSize: 16,
    marginBottom: 5,
  },
});

const Nosotros = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Integrantes:</Text>  
      <Text style={styles.name}>- Samir Cabrera Tabash - 2022161229.</Text>
      <Text style={[styles.name, {marginBottom: 200}]}>- Pamela Morataya Sandoval - 2022108818.</Text>

    <Button
      ViewComponent={LinearGradient} 
      linearGradientProps={{
        colors: ["#f47f36", "#F6A800"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      onPress={() => navigation.navigate('Screen0')}
      style={styles.button}
    >
      Regresar
    </Button>
    </View>
  );
};



export default Nosotros;