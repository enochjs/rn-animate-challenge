import React from 'react';
import { Image, Dimensions } from 'react-native';
import ImageZoom from '../Image/ImagePanZoom/src/index';

const BigImage = () => {
  return (
    <ImageZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').height}
      enableSwipeDown={true}
    >
      <Image
        enableHorizontalBounce={true}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={{
          uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg',
        }}
      />
      <Image
        enableHorizontalBounce={true}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={{
          uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg',
        }}
      />
      <Image
        enableHorizontalBounce={true}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={{
          uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg',
        }}
      />
      <Image
        enableHorizontalBounce={true}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={{
          uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg',
        }}
      />
      <Image
        enableHorizontalBounce={true}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={{
          uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg',
        }}
      />
    </ImageZoom>
  );
};

export default BigImage;
