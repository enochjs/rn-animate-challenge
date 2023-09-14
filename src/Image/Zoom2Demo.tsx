import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
// import Modal from 'react-native-modal';
import { View, TouchableOpacity, FlatList, useWindowDimensions, Modal, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { Zoom, createZoomListWithReanimatedComponent } from './Zoom2/src';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ISwiperModalProps = {
  data: { url: string; [x: string]: any }[];
  maskClosable?: boolean;
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ZoomFlatList = createZoomListWithReanimatedComponent(AnimatedFlatList);

const THUMB_SIZE = 80;

export interface ISwiperModalHandlers {
  open: (index: number) => void;
  hide: () => void;
}

const SwiperModal = (props: ISwiperModalProps, ref?: React.Ref<ISwiperModalHandlers>) => {
  const { data = [1, 2, 3, 4], maskClosable } = props;

  const [visible, setVisible] = useState(false);

  const [activeIndex, setActiveIndex] = useState<number>();
  const thumbRef = useRef<FlatList>(null);
  const onOpenRef = useRef(false);

  const open = (index: number) => {
    setActiveIndex(index);
    onOpenRef.current = true;
    setVisible(true);
  };

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (onOpenRef.current) {
      thumbRef.current?.scrollToIndex({
        index: activeIndex || 0,
        animated: false,
        viewOffset: 0,
        viewPosition: 0.5,
      });
      onOpenRef.current = false;
    }
  }, [activeIndex]);

  useImperativeHandle(ref, () => ({
    open,
    hide,
  }));

  const dimension = useWindowDimensions();

  const mainFlatListRef = useRef<FlatList>();

  const scrollToIndex = (index: number) => {
    if (index === activeIndex) {
      return;
    }
    mainFlatListRef?.current?.scrollToOffset({
      offset: index * dimension.width,
      animated: true,
    });

    if (index * (THUMB_SIZE + 10) - THUMB_SIZE / 2 > dimension.width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (THUMB_SIZE + 10) - dimension.width / 2 + THUMB_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

    setActiveIndex(index);
  };

  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <View>
          <Zoom activeIndex={activeIndex} index={index}>
            <Image
              // url={item.url
              source={{ uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg' }}
              style={{
                width: dimension.width,
                height: dimension.height,
              }}
              resizeMode="contain"
            />
          </Zoom>
        </View>
      );
    },
    [dimension, activeIndex]
  );

  return (
    <Modal visible={true} style={{ margin: 0, backgroundColor: '#000' }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ZoomFlatList
          ref={mainFlatListRef}
          data={data}
          pagingEnabled
          initialScrollIndex={activeIndex}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          onMomentumScrollEnd={(ev) => {
            scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / dimension.width));
          }}
          getItemLayout={(data, index) => ({ length: dimension.width, offset: dimension.width * index, index })}
        />

        <View className=" absolute bottom-10 items-center justify-center w-full">
          <FlatList
            data={data}
            ref={thumbRef}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 10 }}
            getItemLayout={(data, index) => ({ length: THUMB_SIZE + 10, offset: (THUMB_SIZE + 10) * index, index })}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    scrollToIndex(index);
                  }}
                >
                  <Image
                    source={{ uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg' }}
                    style={{
                      width: THUMB_SIZE,
                      height: THUMB_SIZE,
                      marginRight: 10,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: activeIndex === index ? 'white' : 'transparent',
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </Modal>
  );
};

export default React.forwardRef(SwiperModal);
