import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Button  } from '@rneui/themed'

const Screen1 = ({ navigation }) => {
  const [idCounter, setIdCounter] = useState(0);
  const [name, setName] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioCosto, setPrecioCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [cantVendido, setcantVendido] = useState('');

  useEffect(() => {
    const getCounter = async () => {
      const counter = await AsyncStorage.getItem('idCounter');
      if (counter) {
        setIdCounter(parseInt(counter));
      }
    };
    getCounter();
  }, []);

  const saveData = async () => {
    if (!name || !cantidad || !precioCosto || !precioVenta || !cantVendido) {
      alert('Por favor llene todos los campos');
      return;
    }
  
    const newId = idCounter + 1;
    const newData = { id: newId.toString(), name, cantidad, precioCosto, precioVenta, cantVendido };
    let data = await AsyncStorage.getItem('data');
    if (data) {
      data = JSON.parse(data);
      data.push(newData);
    } else {
      data = [newData];
    }
    await AsyncStorage.setItem('data', JSON.stringify(data));
    await AsyncStorage.setItem('idCounter', newId.toString());
    setIdCounter(newId);
    setName('');
    setCantidad('');
    setPrecioCosto('');
    setPrecioVenta('');
    setcantVendido('');
    Alert.alert(
      '¡Producto agregado!',
      '¿Desea agregar más productos?',
      [
        {
          text: 'Sí',
          onPress: () => navigation.navigate('Screen1'), 
        },
        {
          text: 'No',
          onPress: () => navigation.navigate('Screen0'), 
        },
      ],
      { cancelable: false } // Esto evita que se cierre la alerta al tocar fuera de ella
    );
    
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#002F5C',
    },
    inputContainer: {
      color: "#6f6f6f",
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
    label: {
      color: "#fff",
      marginRight: 10,
    },
    input: {
      color: "#fff",
      flex: 1,
      height: 40,
      borderColor: '#4a65a3',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { textAlign: 'center' }]}>ID: {idCounter+1}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite el nombre del producto"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad producto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite la cantidad del producto"
          value={cantidad}
          onChangeText={text => setCantidad(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Precio Costo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite precio costo"
          value={precioCosto}
          onChangeText={text => setPrecioCosto(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Precio Venta:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite precio venta"
          value={precioVenta}
          onChangeText={text => setPrecioVenta(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad Vendida:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite cantidad vendidos"
          value={cantVendido}
          onChangeText={text => setcantVendido(text)}
          keyboardType="numeric"
        />
      </View>

      <Button
            ViewComponent={LinearGradient} 
            linearGradientProps={{
              colors: ["#f47f36", "#F6A800"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={saveData}
            style={[styles.button, { marginTop: 85}]}
          >
            Guardar
          </Button>
    </View>
  );
};




export default Screen1;
