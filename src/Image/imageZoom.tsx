import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { ImageZoom } from '../Image/ImageZoom/src';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    overflow: 'hidden',
  },
});

const imageUri = 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageZoom
        uri={imageUri}
        minScale={0.5}
        minPanPointers={1}
        onInteractionStart={() => console.log('onInteractionStart')}
        onInteractionEnd={() => console.log('onInteractionEnd')}
        onPanStart={() => console.log('onPanStart')}
        onPanEnd={() => console.log('onPanEnd')}
        onPinchStart={() => console.log('onPinchStart')}
        onPinchEnd={() => console.log('onPinchEnd')}
        style={styles.image}
        resizeMode="cover"
        autoReset={false}
      />
    </GestureHandlerRootView>
  );
}

export default gestureHandlerRootHOC(App);
