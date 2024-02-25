import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,  FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonGroup,Button  } from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#002F5C",
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
  subHeader: {
    backgroundColor : "#2089dc",
    color : "white",
    textAlign : "center",
    paddingVertical : 5,
    marginBottom : 10
  },
  buttonStyle: {
    backgroundColor: '#ff9c1b', 
  },
  selectedButtonStyle: {
    backgroundColor: '#ff721b', 
  },
  textStyle: {
    color: 'white', 
  },
});

const Screen5 = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [filterType, setFilterType] = useState('precio');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ['Precio', 'Cantidad', 'Cantidad Vendida'];
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  

 

  const fetchData = async () => {
    try {
      const allProducts = await getProductsLocal();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setShowRefreshButton(false);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      Alert.alert('Error', 'No se pudo obtener la lista de productos. Inténtalo de nuevo más tarde.');
    }
  };
  
  useEffect(() => {
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
      case 'precio':
        filtered = products.filter(product => parseInt(product.precioVenta) === parseInt(searchCriteria));
        break;
      case 'vendido':
        filtered = products.filter(product => parseInt(product.cantVendido) === parseInt(searchCriteria));
        break;
      case 'cantidad':
        filtered = products.filter(product => parseInt(product.cantidad) === parseInt(searchCriteria));
        break;
      default:
        break;
    }
  
    if (filtered.length === 0) {
      Alert.alert('No hay resultados', 'No se encontraron productos que coincidan con el criterio de búsqueda.');
    } else {
      setShowRefreshButton(true);
      setFilteredProducts(filtered);
    }

    setSearchCriteria(''); // Esto borra el contenido del TextInput después de buscar
  };
  

  const handleButtonPress = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    switch (selectedIndex) {
      case 0:
        setFilterType('precio');
        break;
      case 1:
        setFilterType('cantidad');
        break;
      case 2:
        setFilterType('vendido');
        break;
      default:
        break;
    }
  };


  return (
    <View style={styles.mainContainer}>

      <Text style={styles.Subtittletext}>Filtrar por:</Text>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={handleButtonPress}
        containerStyle={{ marginBottom: 20 }}
        buttonStyle={styles.buttonStyle}
        selectedButtonStyle={styles.selectedButtonStyle}
        textStyle={styles.textStyle}
        
      />
      
      <Text style={styles.Subtittletext}>Consultar productos por {filterType}:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ingrese criterio de búsqueda"
        value={searchCriteria}
        onChangeText={setSearchCriteria}
      />

      <Button
            ViewComponent={LinearGradient} 
            linearGradientProps={{
              colors: ["#f47f36", "#F6A800"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={filterProducts}
            style={styles.button}
          >
            Buscar
          </Button>

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

      {showRefreshButton && ( // Mostrar el botón Borrar solo después de realizar una búsqueda
        <Button
        ViewComponent={LinearGradient} 
        linearGradientProps={{
          colors: ["#f47f36", "#F6A800"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={fetchData}
        style={styles.button}
      >
        Recargar Datos
      </Button>
      )}            

      
    </View>
  );
};



export default Screen5;
