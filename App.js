import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Map from './src/pages/Map';
import {
  getLines,
  getStops,
  getTrains,
} from './utils/loadData';

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [lines, setLines] = useState([]);
  const [stops, setStops] = useState([])
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  useEffect(()=>{
    const getData = async () =>{
      await getLines(setLines);
      await getStops(setStops);
      await getTrains(setTrains);
    }

    getData();

    const interval=setInterval(()=>{
      getData()
    }, 15000)


    return()=>clearInterval(interval);
  }, [])

  return (
    <View style={styles.container}>
      <Map
        userLocation={userLocation}
        lines={lines}
        trains={trains}
        stops={stops}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
