import React, {useState} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Pressable } from 'react-native'

import MapTrainLine from '../components/MapTrainLine';
import Train from '../components/Train';
import Stop from '../components/Stop';
import BottomDrawer from '../components/BottomDrawer';


export default function Map(props){
    const { userLocation, 
            lines, 
            trains, 
            stops, 
            selectedTrain,
            setSelectedTrain,
            selectedStop,
            setSelectedStop,
            selectedLine,
            setSelectedLine} = props;


    if (!userLocation || !lines || !trains || !stops){
        return null;
    }

    const [zoom, setZoom] = useState((Math.log(360 / 0.04) / Math.LN2))

    let trainStops = stops.filter((stop)=>{
        return stop['id'].startsWith('place');
    })

    return <>
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                }}
                onRegionChange={(region)=>{
                    setZoom(Math.log(360 / region.longitudeDelta) / Math.LN2);
                }}
                zoomControlEnabled={true}
                zoomEnabled={true}
                scrollEnabled={true}
                zoomTapEnabled={true}
                showsUserLocation={true}
                loadingEnabled={true}
                showsPointsOfInterest={false}
                mapType={"mutedStandard"}
                >
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
                {trains.map((train)=>{
                    return <>
                        <Train train={train}/>
                    </>
                })}

                {trainStops.map((stop)=>{
                    return <>
                        <Stop stop={stop} zoom={zoom} setSelectedStop={setSelectedStop}/>
                    </>
                })}
            </MapView>
            <BottomDrawer open={selectedStop!=null} setSelectedItem={setSelectedStop}/>
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
        height: Dimensions.get('window').height +450
    }
})
