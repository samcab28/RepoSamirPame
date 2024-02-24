import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConsultScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [filterType, setFilterType] = useState('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProductsLocal();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        Alert.alert('Error', 'No se pudo obtener la lista de productos. Inténtalo de nuevo más tarde.');
      }
    };
    fetchData();
  }, []);

  const getProductsLocal = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('data');
      return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  };

  const filterProducts = () => {
    let filtered = [];
    switch (filterType) {
      case 'id':
        filtered = products.filter(product => product.id.toLowerCase().includes(searchCriteria.toLowerCase()));
        break;
      case 'name':
        filtered = products.filter(product => product.name.toLowerCase().includes(searchCriteria.toLowerCase()));
        break;
      case 'precioCosto':
        filtered = products.filter(product => parseInt(product.precioCosto) === parseInt(searchCriteria));
        break;
      case 'precioVenta':
        filtered = products.filter(product => parseInt(product.precioVenta) === parseInt(searchCriteria));
        break;
      case 'cantVendido':
        filtered = products.filter(product => parseInt(product.cantVendido) === parseInt(searchCriteria));
        break;
      default:
        break;
    }
  
    if (filtered.length === 0) {
      Alert.alert('No hay resultados', 'No se encontraron productos que coincidan con el criterio de búsqueda.');
    } else {
      setFilteredProducts(filtered);
    }
  };
  

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.Subtittletext}>Consultar productos:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ingrese criterio de búsqueda"
        value={searchCriteria}
        onChangeText={setSearchCriteria}
      />
      <Button title="Buscar" onPress={filterProducts} />

      <Text style={styles.Subtittletext}>Filtrar por:</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="ID"
          onPress={() => setFilterType('id')}
          color={filterType === 'id' ? 'blue' : 'gray'}
        />
        <Button
          title="Nombre" // Cambiado de 'Precio' a 'Nombre'
          onPress={() => setFilterType('name')} // Cambiado de 'price' a 'name'
          color={filterType === 'name' ? 'blue' : 'gray'} // Cambiado de 'price' a 'name'
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Precio Costo" // Cambiado de 'Precio Venta' a 'Precio Costo'
          onPress={() => setFilterType('precioCosto')} // Cambiado de 'sellingPrice' a 'precioCosto'
          color={filterType === 'precioCosto' ? 'blue' : 'gray'} // Cambiado de 'sellingPrice' a 'precioCosto'
        />
        <Button
          title="Precio Venta"
          onPress={() => setFilterType('precioVenta')} // Cambiado de 'sellingPrice' a 'precioVenta'
          color={filterType === 'precioVenta' ? 'blue' : 'gray'} // Cambiado de 'sellingPrice' a 'precioVenta'
        />
        
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cantidad Vendida"
          onPress={() => setFilterType('cantVendido')} // Cambiado de 'soldQuantity' a 'cantVendido'
          color={filterType === 'cantVendido' ? 'blue' : 'gray'} // Cambiado de 'soldQuantity' a 'cantVendido'
        />
      </View>


      <Text style={styles.Subtittletext}>Productos:</Text>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Nombre: {item.name}</Text>
            <Text style={styles.text}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.text}>Precio Costo: {item.precioCosto}</Text>
            <Text style={styles.text}>Precio Venta: {item.precioVenta}</Text>
            <Text style={styles.text}>Cantidad Vendida: {item.cantVendido}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6f6f6f',
  },
  Subtittletext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ConsultScreen;
