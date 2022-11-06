import React from 'react';
import { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 


export default function Train(props){
    const { train, setSelectedTrain, setSelectedStop, setSelectedLine } = props;
    return <>
        <Marker
                coordinate={train['location']}
                style={{
                    zIndex: "1000000"
                }}
                onPress={()=>{
                    setSelectedStop(null);
                    setSelectedLine(null);
                    setSelectedTrain(train);
                }}>
                    <FontAwesome name="train" size={15} color="black" />           
        </Marker>
    </>
}