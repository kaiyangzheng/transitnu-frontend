import React from 'react';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native'

export default function Stop(props){
    const { stop, zoom } = props;
    const hideStopZoom = 13.1;
    return <>
        <Marker
                coordinate={stop['location']}>
                    <View style={styles.stopContainer}>
                        <Image source={require('./../../assets/MBTA-logo.png')} style={{height: 15, width:15 }}/>
                        {zoom > hideStopZoom && <Text style={styles.stationName}>{stop['name']}</Text>}
                    </View>
        </Marker>
    </>
}

const styles = StyleSheet.create({
    stopContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    stationName: {
        fontWeight: 'bold',
        padding: 7,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginTop: 2,
        fontSize: 10
    }
})
