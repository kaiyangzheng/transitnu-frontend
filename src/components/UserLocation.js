import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function UserLocation(props){
    const { userLocation } = props;

    let coords = userLocation['coords'];
    let lnglat = {
        latitude: coords['latitude'],
        longitude: coords['longitude'],
    }
    return <>
            <Marker
                coordinate={lnglat}
                rotation={12}
                flat={false}
                style={{
                    transform: [{rotate: `${coords['heading']+'rad'}`}]
                }}
            >
                <FontAwesome5 name="location-arrow" size={30} color="#4285f4" style={styles.locationIcon}/>
            </Marker>
    </>

}

const styles = StyleSheet.create({
    locationIcon: {
        'borderWidth': '1em',
        'borderColor': 'black',
        'borderRadius': 25,
        'padding': 10
    }
})
