import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [datas, setData] = useState([]);
  const handleCity = val => {
    setCity(val);
  };

  const handleSubmit = async e => {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},bd&appid=4314b2704bc6ec225013a766b2d11b3b&units=metric`,
    );
    const foundData = await result.json();
    setData(foundData);
    console.log(datas);
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput onChangeText={handleCity} placeholder="search" />
        <TouchableHighlight
          style={styles.button}
          onPress={handleSubmit}
          underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
