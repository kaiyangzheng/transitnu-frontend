import React from 'react';
import BottomDrawer from './BottomDrawer'
import { StyleSheet, View, Text, Image} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function TrainBottomDrawer(props){
    const {selectedTrain, setSelectedTrain} = props;

    if (!selectedTrain){
        return null;
    }

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
                        <Text>{selectedTrain.line.name}</Text>
                    </View>
                    <View style={styles.directionContainer}>
                        <Text>{selectedTrain.line.direction_names[0]} &mdash; {selectedTrain.line.direction_destinations[0]}</Text>
                        <Text>{selectedTrain.line.direction_names[1]} &mdash; {selectedTrain.line.direction_destinations[1]}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text>{selectedTrain.status} {selectedTrain.stop.name}</Text>
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
    coord: {
        fontSize: 20,
        marginLeft: 10
    },
    directionContainer: {
        display: 'flex',
        alignContent: 'center',
        marginTop: 5,
    },
    directionTime:{
        fontSize: 20,
        marginLeft: 10
    }
})