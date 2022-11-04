import React, {useEffect} from 'react';
import { View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

export default function BottomDrawer(props) {
  const { selectItem, setSelectItem } = props;

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 800,
      }}
    >
      {props.children}
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        /> */}
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 800, 0]}
        borderRadius={10}
        renderContent={renderContent}
        onCloseEnd={()=>{
          setSelectItem(null);
        }}
      />
    </>
  );
}