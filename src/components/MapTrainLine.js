import React from 'react'
import polyline, { decode } from 'polyline'
import {Polyline} from 'react-native-maps';

export default function MapTrainLine(props){
    const { line, encodedPolyline, color, setSelectedLine, setSelectedStop, setSelectedTrain } = props;
    let decodedPolyline = polyline.decode(encodedPolyline);
    let formattedPolyline = []
    for (let i = 0; i < decodedPolyline.length; i++){
        formattedPolyline.push({
            latitude: decodedPolyline[i][0],
            longitude: decodedPolyline[i][1],
        })
    }
    return <>
        <Polyline
		    coordinates={formattedPolyline}
            strokeColor={color}
            strokeWidth={6}
            tappable={true}
            onPress={()=>{
                setSelectedLine(line);
                setSelectedStop(null);
                setSelectedTrain(null);
            }}
	    />
    </>

}