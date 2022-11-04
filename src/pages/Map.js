import React, {useState} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native'
import MapViewDirections from 'react-native-maps-directions';

import MapTrainLine from '../components/MapTrainLine';
import Train from '../components/Train';
import Stop from '../components/Stop';
import StopBottomDrawer from '../components/StopBottomDrawer';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBVssmK2nnbTz3XIA1htc_sBxHd0WqmDhw';

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
    const [distanceToStop, setDistanceToStop] = useState(0);
    const [timeToStop, setTimeToStop] = useState(0);

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
                {selectedStop && <MapViewDirections
                    origin={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                    }}
                    destination={selectedStop.location}
                    strokeWidth={5}
                    strokeColor={"darkblue"}
                    apikey={GOOGLE_MAPS_API_KEY}
                    mode={'walking'}
                    onReady={result => {
                        setDistanceToStop(result.distance);
                        setTimeToStop(result.duration);}}/>}
            </MapView>   
            <StopBottomDrawer 
                selectedStop={selectedStop} 
                setSelectedStop={setSelectedStop}
                distanceToStop={distanceToStop}
                timeToStop={timeToStop}/>
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
