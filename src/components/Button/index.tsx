import { Text, StyleProp, TouchableOpacity, TextStyle } from 'react-native'
import React from 'react'

type CommonButtonProps = {
    text: string,
    onPress: ()=>void,
    textStyle: StyleProp<TextStyle>,
    style: StyleProp<any>,
    activeOpacity: number

}

const CommonButton = ({text, textStyle, style, onPress, activeOpacity}: CommonButtonProps) => {
  return (
      <TouchableOpacity style={style} onPress={onPress} activeOpacity={activeOpacity}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
  )
}

export default CommonButton