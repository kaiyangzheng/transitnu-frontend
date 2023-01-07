import React from 'react';
import BottomDrawer from './BottomDrawer'
import { StyleSheet, View, Text, Image} from 'react-native'

export default function TrainBottomDrawer(props){
    const {selectedTrain, setSelectedTrain, predictions} = props;

    if (!selectedTrain){
        return null;
    }

    let trainPredictions = predictions.filter((prediction) => {
        return prediction.vehicle_id == selectedTrain.id;
    })

    return <>
        <BottomDrawer selectItem={selectedTrain} setSelectItem={setSelectedTrain}>
            <View style={styles.titleContainer}>
                {selectedTrain.line.id == 'Green-B' &&
                    <Image source={require('./../../assets/green-line-b.png')} style={styles.railIcon}/>}
                {selectedTrain.line.id == 'Green-C' &&
                    <Image source={require('./../../assets/green-line-c.png')} style={styles.railIcon}/>}
                {selectedTrain.line.id == 'Green-D' &&
                    <Image source={require('./../../assets/green-line-d.png')} style={styles.railIcon}/>}
                {selectedTrain.line.id == 'Green-E' &&
                    <Image source={require('./../../assets/green-line-e.png')} style={styles.railIcon}/>}
                {selectedTrain.line.id == 'Blue' &&
                    <Image source={require('./../../assets/blue-line.png')} style={styles.railIcon}/>}
                {selectedTrain.line.id == 'Red' &&
                    <Image source={require('./../../assets/red-line.png')} style={styles.railIcon}/>}
                {selectedTrain.line.id == 'Orange' &&
                    <Image source={require('./../../assets/orange-line.png')} style={styles.railIcon}/>}
                
                <Text style={styles.trainTitle}>
                    Train {selectedTrain.id}
                </Text>
            </View>
            <View style={styles.topInfoContainer}>
                <View style={styles.bodyContainer}>
                    <View style={styles.lineContainer}>
                        <Text style={styles.line}>{selectedTrain.line.name}</Text>
                    </View>
                    <View style={styles.directionContainer}>
                        <Text style={selectedTrain.direction_id == 0 ? styles.boldLine : styles.line}>{selectedTrain.line.direction_names[0]} &mdash; {selectedTrain.line.direction_destinations[0]}</Text>
                        <Text style={selectedTrain.direction_id == 1 ? styles.boldLine : styles.line}>{selectedTrain.line.direction_names[1]} &mdash; {selectedTrain.line.direction_destinations[1]}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.line}>{selectedTrain.status.replace('_', ' ')} {selectedTrain.stop.name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.predictionContainer}>
                <Text style={styles.predictionTitle}>Predictions</Text>
                <View style={styles.predictionList}>
                    {trainPredictions.map((prediction)=>{
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
    trainTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    bodyContainer: {
        marginTop: 20,
        display: 'flex'
    },
    lineContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    railIcon: {
        height: 35,
        width: 35
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    line: {
        fontSize: 15,
    },
    boldLine: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    directionContainer: {
        display: 'flex',
        alignContent: 'center',
        marginTop: 5,
    },
    directionTime:{
        fontSize: 20,
        marginLeft: 10
    },
    predictionContainer: {
        display: 'flex',
        alignContent: 'center',
        marginTop: 30
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