import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native'

import MapTrainLine from '../components/MapTrainLine';
import UserLocation from '../components/UserLocation';

export default function Map(props){
    const { userLocation, lines } = props;

    if (!userLocation){
        return null;
    }
    
    return <>
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                zoomControlEnabled={true}
                zoomEnabled={true}
                scrollEnabled={true}
                zoomTapEnabled={true}
                >
                <UserLocation userLocation={userLocation}/>
                {lines.map((line)=>{
                    let polylines = line['polylines'];
                    let color = "#" + line['color'];
                    return <>
                        {polylines.map((polyline)=>{
                            return <MapTrainLine
                                encodedPolyline={polyline}
                                color={color}/>
                        })}
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
