import React from 'react';
import BottomDrawer from './BottomDrawer';
import { StyleSheet, View, Text, Image} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 

export default function StopBottomDrawer(props){
    const {selectedStop, setSelectedStop, distanceToStop, timeToStop, predictions} = props;

    if (!selectedStop){
        return null;
    }

    let stopPredictions = predictions.filter((prediction) => {
        return prediction.stop_id == selectedStop.id;
    })

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
                <View style={styles.predictionContainer}>
                <Text style={styles.predictionTitle}>Predictions</Text>
                <View style={styles.predictionList}>
                    {stopPredictions.map((prediction)=>{
                        let currentTime = new Date();
                        let arrivalTime = new Date(prediction.arrival_time);
                        let departureTime = new Date(prediction.departure_time);

                        let arrivalDiff = arrivalTime - currentTime;

                        if (arrivalDiff <= 0){
                            return;
                        }
                        arrivalTime = arrivalTime.toLocaleTimeString();
                        departureTime = departureTime.toLocaleTimeString();
                        return <View style={styles.predictionListItem}>
                            <Text style={styles.predictionListTitle}>
                                {prediction.stop.name}
                            </Text>
                            <Text>
                                Arrival: {arrivalTime} 
                            </Text>
                            <Text>
                                Departure: {departureTime}
                            </Text>
                        </View>
                    })}
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
    },
    predictionContainer: {
        display: 'flex',
        alignContent: 'center',
        marginTop: 35
    },
    predictionTitle: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    predictionList: {
        marginLeft: 10,
    },
    predictionListItem: {
        fontSize: 15,
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    predictionListTitle:{
        fontWeight: '600'
    }
})