import React from 'react';
import BottomDrawer from './BottomDrawer';
import { StyleSheet, View, Text, Image} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 

export default function StopBottomDrawer(props){
    const {selectedStop, setSelectedStop, distanceToStop, timeToStop} = props;

    if (!selectedStop){
        return null;
    }

    return <>
        <BottomDrawer selectItem={selectedStop} setSelectItem={setSelectedStop}>
                <View style={styles.titleContainer}>
                    <Image source={require('./../../assets/MBTA-logo.png')} style={{height: 30, width: 30 }}/>
                    <Text style={styles.stationTitle}>
                        {selectedStop.name}
                    </Text>
                </View>
                <View style={styles.topInfoContainer}>
                    <View style={styles.bodyContainer}>
                        <View style={styles.cityContainer}>
                            <MaterialIcons name="location-city" size={24} color="black" />
                            <Text style={styles.city}>{selectedStop.municipality}</Text>
                        </View>
                        <View style={styles.coordContainer}>
                            <MaterialIcons name="location-on" size={24} color="black" />
                            <Text style={styles.coord}>{distanceToStop} km</Text>
                        </View>
                        <View style={styles.walkTimeContainer}>
                            <MaterialIcons name="directions-walk" size={24} color="black" />
                            <Text style={styles.walkTime}>{Math.round(timeToStop * 100) / 100} min</Text>
                        </View>
                    </View>
                </View>
        </BottomDrawer>
    </>
}

const styles = StyleSheet.create({
    topInfoContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    stationTitle: {
        fontSize: 25,
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
        alignItems: 'center',
    },
    city: {
        fontSize: 20,
        marginLeft: 10
    },
    coordContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    coord: {
        fontSize: 20,
        marginLeft: 10
    },
    walkTimeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 5,
    },
    walkTime:{
        fontSize: 20,
        marginLeft: 10
    }
})