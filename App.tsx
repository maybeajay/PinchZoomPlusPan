/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {  SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "./src/components/ImagePicker";
function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
     <GestureHandlerRootView>
      <ImagePicker />
      </GestureHandlerRootView>
      </SafeAreaView>
  );
}

export default App;
