import React, { useState, useEffect } from 'react';
import { View, TextInput,  StyleSheet, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Button  } from '@rneui/themed'

const Screen4 = ({ route, navigation }) => {
  const { index } = route.params;
  const [data, setData] = useState({
    idCounter: 0,
    name: '',
    cantidad: '',
    precioCosto: '',
    precioVenta: '',
    cantVendido: '',
  });

  useEffect(() => {
    loadData();
  }, []);

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

  const loadData = async () => {
    const jsonData = await AsyncStorage.getItem('data');
    const parsedData = jsonData ? JSON.parse(jsonData) : [];
    if (parsedData[index]) {
      setData(parsedData[index]);
    }
  };

  const updateData = async () => {
  // Verificar si algún campo está vacío
  if (Object.values(data).some(value => value === '')) {
    Alert.alert('Campos Vacíos', 'Por favor complete todos los campos antes de actualizar el producto.');
    return; // Detener la actualización si hay algún campo vacío
  }

  try {
    const jsonData = await AsyncStorage.getItem('data');
    let newData = jsonData ? JSON.parse(jsonData) : [];
    newData[index] = data;
    await AsyncStorage.setItem('data', JSON.stringify(newData));
     Alert.alert(
      '¡Modificación Exitosa!',
      '¿Desea realizar más modificaciones?',
      [
        {
          text: 'Sí',
          onPress: () => navigation.navigate('Screen3', { index }),
        },
        {
          text: 'No',
          onPress: () => navigation.navigate('Screen0', { index }),
        },
      ]
    );
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    Alert.alert('Error', 'No se pudo actualizar el producto. Inténtalo de nuevo más tarde.');
  }
};


  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre: {data.name}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad producto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite la cantidad del producto "
          value={data.cantidad}
          onChangeText={text => setData({...data, cantidad: text})}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Precio Costo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite precio costo"
          value={data.precioCosto}
          onChangeText={text => setData({...data, precioCosto: text})}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Precio Venta:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite precio venta"
          value={data.precioVenta}
          onChangeText={text => setData({...data, precioVenta: text})}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad Vendido: {data.cantVendido}</Text>

      </View>
      <Button
        ViewComponent={LinearGradient} 
        linearGradientProps={{
          colors: ["#f47f36", "#F6A800"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={updateData}
        style={[styles.button, { marginTop: 85}]}
      >
        Actualizar
      </Button>
    </View>
  );
};



export default Screen4;
