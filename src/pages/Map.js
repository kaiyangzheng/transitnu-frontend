import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native'

import MapTrainLine from '../components/MapTrainLine';

export default function Map(props){
    const { lines } = props;
    return <>
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 42.3398,
                    longitude: -71.0892,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                zoomControlEnabled={true}
                zoomEnabled={true}
                scrollEnabled={true}
                zoomTapEnabled={true}>
                {lines.map((line)=>{
                    let polylines = line['polylines'];
                    let color = "#" + line['color'];
                    return <>
                        <MapTrainLine 
                            encodedPolyline={polylines[0]}
                            color={color}/>
                    </>
                })}
            </MapView>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignitems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})
