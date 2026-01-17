import { View, StyleSheet, Platform } from 'react-native'
import React from 'react'
import CommonButton from '../Button'
import { color0096FF, white } from '../../color/colors'
import useImagePicker from '../../hooks/useImagePicker'
import RenderImage from '../Button/RenderImage'

const ImagePicker = () => {
  const {handleImagePicker, pickedImage} = useImagePicker();


  return (

    <View style={styles.container}>
      <CommonButton 
      text='Pick an image'
      style={styles.buttonStyle}
      textStyle={styles.textStyle}
      onPress={handleImagePicker}
      activeOpacity={0.7}
      />

        {pickedImage && <RenderImage pickedImage={pickedImage}/>}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        padding: 12
    },
    buttonStyle:{
        width: "70%",
        padding: 16,
        backgroundColor: color0096FF
    },
    textStyle:{
        fontSize: 15,
        fontWeight: "500",
        fontFamily: Platform.select({
            ios: "System",
            android: "Roboto",
            default: "System"
        }),
        color: white,
        textAlign: "center"
    }
})

export default ImagePicker