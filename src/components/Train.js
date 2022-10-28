import React from 'react';
import { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 


export default function Train(props){
    const { train } = props;
    return <>
        <Marker
                coordinate={train['location']}
                style={{
                    zIndex: "1000000"
                }}>
                    <FontAwesome name="train" size={15} color="black" />           
        </Marker>
    </>
}