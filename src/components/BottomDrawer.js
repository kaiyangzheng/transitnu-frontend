import React, {useRef, useEffect} from 'react';
import { View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

export default function StopBottomDrawer(props){
    const { open, setSelectedItem } = props;
    const refRBSheet = useRef();

    useEffect(()=>{
        if (open){
            refRBSheet.current.open();
        }
    }, [open])

    return (
        <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000"
        }}
      >
        {/* <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} /> */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          onClose={()=>setSelectedItem(null)}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
        >
          {props.children}
        </RBSheet>
      </View>
    )
}
