import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonGroup,Button  } from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient';

const Screen2 = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [filterType, setFilterType] = useState('ID');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ['ID', 'Nombre'];
  const [showDeleteButton, setShowDeleteButton] = useState(false); // Estado para controlar la visibilidad del botón Borrar
  

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
      backgroundColor: '#ff9c1b', // Color inicial de los botones
    },
    selectedButtonStyle: {
      backgroundColor: '#ff721b', // Color de los botones seleccionados
    },
    textStyle: {
      color: 'white', // Color del texto dentro de los botones
    },
  });

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
      case 'ID':
        filtered = products.filter(product => parseInt(product.id) === parseInt(searchCriteria));
        break;
      case 'nombre':
        filtered = products.filter(product => product.name.toLowerCase().includes(searchCriteria.toLowerCase()));
        break;
      default:
        break;
    }
  
    if (filtered.length === 0) {
      Alert.alert('No hay resultados', 'No se encontraron productos que coincidan con el criterio de búsqueda.');
    } else {
      setShowDeleteButton(true); // Mostrar el botón Borrar después de realizar la búsqueda
      setFilteredProducts(filtered);
    }

    setSearchCriteria(''); 
  };
  

  const handleButtonPress = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    switch (selectedIndex) {
      case 0:
        setFilterType('ID');
        break;
      case 1:
        setFilterType('nombre');
        break;
      default:
        break;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      // Muestra un mensaje de confirmación antes de borrar
      Alert.alert(
        'Confirmar Borrado',
        '¿Estás seguro de que quieres borrar este producto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Borrar',
            onPress: async () => {
              // Realiza el borrado del producto
              const updatedProducts = products.filter(product => product.id !== productId);
              setProducts(updatedProducts);
              setFilteredProducts(updatedProducts);
              await AsyncStorage.setItem('data', JSON.stringify(updatedProducts));
              Alert.alert('Producto Borrado', 'El producto ha sido borrado exitosamente.');
              setShowDeleteButton(false); // Desactivar el botón Borrar después de borrar el producto
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Error al borrar el producto:', error);
      Alert.alert('Error', 'No se pudo borrar el producto. Inténtalo de nuevo más tarde.');
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
      
      <Text style={styles.Subtittletext}>Borrar producto por {filterType}:</Text>
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

            {showDeleteButton && ( // Mostrar el botón Borrar solo después de realizar una búsqueda
              <Button
                title="Borrar"
                onPress={() => deleteProduct(item.id)}
                color="red"
              />
            )}
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

    </View>

    
  );
};



export default Screen2;
