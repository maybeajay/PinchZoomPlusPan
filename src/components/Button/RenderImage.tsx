import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { memo, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../../utils/constants';
import useDoubleTapGesture from '../../hooks/useDoubleTapGesture';

type Props = {
  pickedImage: string;
};

// providing a range 1 because we cannot zoom from init stage of the image
const MAX_SCALE = 8;
const MIN_SCALE = 1;

const RenderImage = ({ pickedImage }: Props) => {
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const baseTranslateX = useSharedValue(0);
  const baseTranslateY = useSharedValue(0);

  const layout = useSharedValue({ width: 0, height: 0 });

  const value = useDoubleTapGesture();


  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {

      baseScale.value = scale.value;
      baseTranslateX.value = translateX.value;
      baseTranslateY.value = translateY.value;
    })
    .onUpdate(e => {
      const nextScale = clamp(
        baseScale.value * e.scale,
        MIN_SCALE,
        MAX_SCALE
      );

      const scaleChange = nextScale / scale.value;

      const centerX = layout.value.width / 2;
      const centerY = layout.value.height / 2;

      const focalX = e.focalX - centerX;
      const focalY = e.focalY - centerY;

      translateX.value =
        translateX.value + focalX * (1 - scaleChange);
      translateY.value =
        translateY.value + focalY * (1 - scaleChange);

      scale.value = nextScale;
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    })
    .onFinalize(() => {
    });

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onBegin(() => {
      baseTranslateX.value = translateX.value;
      baseTranslateY.value = translateY.value;
    })
    .onUpdate(e => {

      // only allow pan gesture when image is zoomed in
      if (scale.value <= 1) return;
      translateX.value = baseTranslateX.value + e.translationX;
      translateY.value = baseTranslateY.value + e.translationY;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // resetting the state using double tap
  const handleDoubleTap = useCallback(() => {
    // if double tap hook returns true then only reset the value
    if(value()){
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    }
  }, []);


  // combining gesture 
  const composed = Gesture.Simultaneous(
    pinchGesture,
    panGesture
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={animatedStyle}
        onLayout={e => {
          layout.value = e.nativeEvent.layout;
        }}
      >
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <Image
            source={{ uri: pickedImage }}
            style={styles.imageStyle}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  imageStyle: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginTop: 100,
  },
});

export default memo(RenderImage);
