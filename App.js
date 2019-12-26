import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import image from './img/img.jpg';

export default function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState('');
  const [wind, setwind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [temp1, setTemp1] = useState('');
  const [temp2, setTemp2] = useState('');
  const [temp3, setTemp3] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [description3, setDescription3] = useState('');
  const handleCity = val => {
    setCity(val);
  };

  const handleCountry = val => {
    setCountry(val);
  };
  const handleSubmit = async () => {
    if (city !== '' && country !== '') {
      setLoading(true);
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=4314b2704bc6ec225013a766b2d11b3b&units=metric`,
      );
      const api_current = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=4314b2704bc6ec225013a766b2d11b3b&units=metric`,
      );
      setLoading(false);
      const forecast_data = await api_call.json();
      const current_data = await api_current.json();
      setTemp(current_data.main.temp);
      setwind(current_data.wind.speed);
      setHumidity(current_data.main.humidity);
      setDate1(forecast_data.list[5].dt_txt);
      setDate2(forecast_data.list[12].dt_txt);
      setDate3(forecast_data.list[21].dt_txt);
      setTemp1(forecast_data.list[5].main.temp);
      setTemp2(forecast_data.list[12].main.temp);
      setTemp3(forecast_data.list[21].main.temp);
      setDescription1(forecast_data.list[5].weather[0].description);
      setDescription2(forecast_data.list[12].weather[0].description);
      setDescription3(forecast_data.list[21].weather[0].description);
      console.log(forecast_data.list[5].weather[0].description);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
          <TextInput
            style={styles.textinput}
            onChangeText={handleCity}
            placeholder="Enter City"
            placeholderTextColor="#ffff"
          />
          <TextInput
            style={styles.textinput}
            onChangeText={handleCountry}
            placeholder="Enter Country"
            placeholderTextColor="#ffff"
          />
          <TouchableHighlight
            style={styles.button}
            onPress={handleSubmit}
            underlayColor="#849088">
            <Text style={styles.buttonText}>Get Temperature</Text>
          </TouchableHighlight>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View>
              <Text style={styles.text}>
                {temp}
                {temp && (
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={40}
                    color="white"
                  />
                )}
              </Text>
            </View>
            <View>
              <View>
                <Text style={styles.text}>
                  {humidity}
                  {humidity && (
                    <MaterialCommunityIcons
                      name="water-percent"
                      size={40}
                      color="white"
                    />
                  )}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.text}>
                {wind}
                {wind && <FontAwesome name="wind" size={40} color="white" />}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.forecasttext}>{date1}</Text>
              <Text style={styles.forecasttext}>
                {temp1}
                {temp1 && (
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={20}
                    color="white"
                  />
                )}
                {description2}
              </Text>
            </View>
            <View>
              <Text style={styles.forecasttext}>{date2}</Text>
              <Text style={styles.forecasttext}>
                {temp2}
                {temp2 && (
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={20}
                    color="white"
                  />
                )}
                {description2}
              </Text>
            </View>
            <View>
              <Text style={styles.forecasttext}>{date3}</Text>
              <Text style={styles.forecasttext}>
                {temp3}
                {temp3 && (
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={20}
                    color="white"
                  />
                )}
                {description3}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#1F2C26',
  },
  textinput: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '700',
  },
  text: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  forecasttext: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#01205F',
    borderColor: '#000B30',
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
