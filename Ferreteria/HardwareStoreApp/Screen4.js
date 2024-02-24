import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const loadData = async () => {
    const jsonData = await AsyncStorage.getItem('data');
    const parsedData = jsonData ? JSON.parse(jsonData) : [];
    if (parsedData[index]) {
      setData(parsedData[index]);
    }
  };

  const updateData = async () => {
    const jsonData = await AsyncStorage.getItem('data');
    let newData = jsonData ? JSON.parse(jsonData) : [];
    newData[index] = data;
    await AsyncStorage.setItem('data', JSON.stringify(newData));
    navigation.navigate('Screen0', { index });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite el nombre del producto: "
          value={data.name}
          onChangeText={text => setData({...data, name: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad producto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite la cantidad del producto: "
          value={data.cantidad}
          onChangeText={text => setData({...data, cantidad: text})}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Precio Costo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite precio costo: "
          value={data.precioCosto}
          onChangeText={text => setData({...data, precioCosto: text})}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Precio Venta:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite precio venta: "
          value={data.precioVenta}
          onChangeText={text => setData({...data, precioVenta: text})}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad Vendido:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite cantidad vendidos: "
          value={data.cantVendido}
          onChangeText={text => setData({...data, cantVendido: text})}
          keyboardType="numeric"
        />
      </View>
      <Button title="Update" onPress={updateData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6f6f6f',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Screen4;
