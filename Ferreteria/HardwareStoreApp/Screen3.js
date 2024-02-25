import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,  StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Button  } from '@rneui/themed'

const Screen3 = ({ navigation }) => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const jsonData = await AsyncStorage.getItem('data');
    const parsedData = jsonData ? JSON.parse(jsonData) : [];
    setData(parsedData);
  };

  useEffect(() => {
    loadData();
  }, []);


  const navigateToModify = index => {
    navigation.navigate('Screen4', { index });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.cantidad}</Text>
      <Text>{item.precioCosto}</Text>
      <Text>{item.precioVenta}</Text>
      <Text>{item.cantVendido}</Text>

      <Button
            ViewComponent={LinearGradient} 
            linearGradientProps={{
              colors: ["#f47f36", "#F6A800"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={() => navigateToModify(index)}
            //style={[styles.button, { marginTop: 85}]}
          >
            Modificar
          </Button>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#002F5C',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Screen3;
