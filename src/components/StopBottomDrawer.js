import React from 'react';
import BottomDrawer from './BottomDrawer';
import { StyleSheet, View, Text, Image} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

export default function StopBottomDrawer(props){
    const {selectedStop, setSelectedStop, distanceToStop, timeToStop} = props;

    if (!selectedStop){
        return null;
    }

    return <>
        <BottomDrawer selectItem={selectedStop} setSelectItem={setSelectedStop}>
            <View style={styles.titleContainer}>
                <Image source={require('./../../assets/MBTA-logo.png')} style={{height: 20, width: 20 }}/>
                <Text style={styles.stationTitle}>
                    {selectedStop.name}
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.cityContainer}>
                    <FontAwesome5 name="city" size={24} color="black" />
                    <Text style={styles.city}>{selectedStop.municipality}</Text>
                </View>
                <View style={styles.coordContainer}>
                    <Entypo name="location-pin" size={30} color="black" />
                    <Text style={styles.coord}>{distanceToStop} km</Text>
                </View>
                <View style={styles.walkTimeContainer}>
                    <FontAwesome5 style={styles.walkingIcon} name="walking" size={30} color="black" />
                    <Text style={styles.walkTime}>{Math.round(timeToStop * 100) / 100} min</Text>
                </View>
            </View>
        </BottomDrawer>
    </>
}

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    stationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    bodyContainer: {
        marginTop: 20,
        display: 'flex'
    },
    cityContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    city: {
        fontSize: 17,
        marginLeft: 10
    },
    coordContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    coord: {
        fontSize: 17,
        marginLeft: 10
    },
    walkTimeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 5
    },
    walkingIcon: {
        marginLeft: 5
    },
    walkTime:{
        fontSize: 17,
        marginLeft: 15
    }
})