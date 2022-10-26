import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from './src/pages/Map';
import {
  getLines
} from './utils/loadData';

export default function App() {
  const [lines, setLines] = useState([]);
  useEffect(()=>{
    const getData = async () =>{
      await getLines(setLines);
    }
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <Map
        lines={lines}/>
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
