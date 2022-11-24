import React, {useState} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native'
import MapViewDirections from 'react-native-maps-directions';

import MapTrainLine from '../components/MapTrainLine';
import Train from '../components/Train';
import Stop from '../components/Stop';
import StopBottomDrawer from '../components/StopBottomDrawer';
import TrainBottomDrawer from '../components/TrainBottomDrawer';
import LineBottomDrawer from '../components/LineBottomDrawer';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBVssmK2nnbTz3XIA1htc_sBxHd0WqmDhw';

export default function Map(props){
    const { userLocation, 
            lines, 
            trains, 
            stops, 
            predictions,
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
                                line={line}
                                encodedPolyline={polyline}
                                color={color}
                                setSelectedLine={setSelectedLine}
                                setSelectedStop={setSelectedStop}
                                setSelectedTrain={setSelectedTrain}/>
                        })}
                    </>
                })}
                {trains.map((train)=>{
                    return <>
                        <Train 
                            train={train} 
                            setSelectedTrain={setSelectedTrain}
                            setSelectedStop={setSelectedStop}
                            setSelectedLine={setSelectedLine}/>
                    </>
                })}

                {stops.map((stop)=>{
                    return <>
                        <Stop 
                            stop={stop} 
                            zoom={zoom} 
                            setSelectedStop={setSelectedStop}
                            setSelectedTrain={setSelectedTrain}
                            setSelectedLine={setSelectedLine}/>
                    </>
                })}
                {selectedStop && <MapViewDirections
                    origin={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                    }}
                    destination={selectedStop.location}
                    strokeWidth={5}
                    strokeColor={"#4B9CD3"}
                    apikey={GOOGLE_MAPS_API_KEY}
                    mode={'WALKING'}
                    onReady={result => {
                        setDistanceToStop(result.distance);
                        setTimeToStop(result.duration);}}/>}
            </MapView>   
            <StopBottomDrawer 
                selectedStop={selectedStop} 
                setSelectedStop={setSelectedStop}
                distanceToStop={distanceToStop}
                timeToStop={timeToStop}
                predictions={predictions}/>
            <TrainBottomDrawer
                selectedTrain={selectedTrain}
                setSelectedTrain={setSelectedTrain}
                predictions={predictions}/>
            <LineBottomDrawer
                selectedLine={selectedLine}
                setSelectedLine={setSelectedLine}/>
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
