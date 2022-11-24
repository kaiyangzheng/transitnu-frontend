import React from 'react';
import BottomDrawer from './BottomDrawer';
import { StyleSheet, View, Text, Image} from 'react-native'

export default function LineBottomDrawer(props){
    const {selectedLine, setSelectedLine} = props;

    if (!selectedLine){
        return null;
    }
    
    return <>
        <BottomDrawer selectItem={selectedLine} setSelectItem={setSelectedLine}>
            <View style={styles.titleContainer}>
                {selectedLine.id == 'Green-B' &&
                    <Image source={require('./../../assets/green-line-b.png')} style={styles.lineIcon}/>}
                {selectedLine.id  == 'Green-C' &&
                    <Image source={require('./../../assets/green-line-c.png')} style={styles.lineIcon}/>}
                {selectedLine.id  == 'Green-D' &&
                    <Image source={require('./../../assets/green-line-d.png')} style={styles.lineIcon}/>}
                {selectedLine.id  == 'Green-E' &&
                    <Image source={require('./../../assets/green-line-e.png')} style={styles.lineIcon}/>}
                {selectedLine.id  == 'Blue' &&
                    <Image source={require('./../../assets/blue-line.png')} style={styles.lineIcon}/>}
                {selectedLine.id  == 'Red' &&
                    <Image source={require('./../../assets/red-line.png')} style={styles.lineIcon}/>}
                {selectedLine.id  == 'Orange' &&
                    <Image source={require('./../../assets/orange-line.png')} style={styles.lineIcon}/>}
                <Text style={styles.lineTitle}>
                    {selectedLine.name}
                </Text>
            </View>
            <View style={styles.topInfoContainer}>
                <View style={styles.bodyContainer}>
                    <View style={styles.directionContainer}>
                        <Text style={styles.line}>{selectedLine.direction_names[0]} &mdash; {selectedLine.direction_destinations[0]}</Text>
                        <Text style={styles.line}>{selectedLine.direction_names[1]} &mdash; {selectedLine.direction_destinations[1]}</Text>
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
    lineIcon: {
        height: 35,
        width: 35
    },
    lineTitle: {
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