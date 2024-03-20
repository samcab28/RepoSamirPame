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
    fontSize: 30,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  button: {
    width: 200,
    height: 50, 
    marginBottom: 0, 
  },
  buttonUs: {
    width: 200,
    height: 50, 
    marginTop: 50, 
  },
  buttonAdd:{
    marginTop:70,
    width: 200,
    height: 50, 
    marginBottom: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  logo: {
    marginTop:70,
    width: 150,
    height: 116,
  },
});

const Screen0 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ferretería El Cielo</Text>  
      <Image
        source={require('./images/taladro.png')}
        style={styles.logo}
      />
      <Button
      ViewComponent={LinearGradient} 
      linearGradientProps={{
        colors: ["#f47f36", "#F6A800"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      onPress={() => navigation.navigate('Screen1')}
      style={styles.buttonAdd}
    >
      Agregar
    </Button>

    <Button
      ViewComponent={LinearGradient} 
      linearGradientProps={{
        colors: ["#f47f36", "#F6A800"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      onPress={() => navigation.navigate('Screen5')}
      style={styles.button}
    >
      Consultar
    </Button>

    <Button
      ViewComponent={LinearGradient} 
      linearGradientProps={{
        colors: ["#f47f36", "#F6A800"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      onPress={() => navigation.navigate('Screen3')}
      style={styles.button}
    >
      Modificar
    </Button>

    <Button
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#f47f36", "#F6A800"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      onPress={() => navigation.navigate('Screen2')}
      style={styles.button}
    >
      Borrar
    </Button>

    

    <Button
      ViewComponent={LinearGradient} 
      linearGradientProps={{
        colors: ["#f47f36", "#F6A800"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      onPress={() => navigation.navigate('Nosotros')}
      style={styles.buttonUs}
    >
      Nosotros
    </Button>
    </View>
  );
};



export default Screen0;