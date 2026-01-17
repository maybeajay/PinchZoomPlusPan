import { ReactNode, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { IMAGE_PICKER_OPTIONS } from '../utils/constants';
export default function useImagePicker() {
  // we can pick multiple as well but using single image for now
  const [pickedImage, setpickedImage] = useState<ReactNode | null>(null);

  async function handleImagePicker() {
    const result = await launchImageLibrary(IMAGE_PICKER_OPTIONS);
    if(!result?.didCancel && result?.assets){
      console.log("result?.assets[0]", result?.assets[0])
      setpickedImage(result?.assets[0]?.uri)
    }
  }
  return {handleImagePicker, pickedImage}
}
