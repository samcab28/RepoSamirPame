import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen2 = ({ navigation }) => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const jsonData = await AsyncStorage.getItem('data');
    const parsedData = jsonData ? JSON.parse(jsonData) : [];
    setData(parsedData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteData = async index => {
    const newData = [...data];
    newData.splice(index, 1);
    await AsyncStorage.setItem('data', JSON.stringify(newData));
    setData(newData);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.cantidad}</Text>
      <Text>{item.precioCosto}</Text>
      <Text>{item.precioVenta}</Text>
      <Text>{item.cantVendido}</Text>
      <Button title="Delete" onPress={() => deleteData(index)} />
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
    backgroundColor: '#6f6f6f',
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

export default Screen2;
