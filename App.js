// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { Text, View, Button, Switch } from 'react-native';
import styles from './styles';
import AppCamera from './src/components/Camera';
import AppVideo from './src/components/Video';
import ImagePickerExample from './src/components/ImagePicker';

export default function App() {

  const [isEnabledCamera, setIsEnabledCamera] = useState(false)
  const [isEnabledVideo, setIsEnabledVideo] = useState(false)
  const [isEnabledImage,setIsEnabledImage] = useState(false)
  const [vidButt,setVidButt] = useState(true)
  const [cameraButt,setCameraButt] = useState(true)
  const [imgButt,setImgButt] = useState(true)

  const move = () =>{
    history.push('/appCamera');
  }

  return (
    <View style={styles.container}>
      {cameraButt ?
      <>
      {isEnabledCamera ? <AppCamera />
        :
        <Button 
        title="camera"
        color="blue"
        onPress={()=>{{
          setIsEnabledCamera(true)
          setVidButt(false)
          setImgButt(false)
        }}}
        /> 
      }
      </>
      :
      <></>
    }
      {vidButt ?
    <>
    {isEnabledVideo ? <AppVideo />
      :
      <Button 
      title="video"
      color="blue"
      onPress={()=>{{
        setIsEnabledVideo(true)
        setCameraButt(false)
        setImgButt(false)
      }}}
      /> 
    }
    </>
    :
    <></>
  }
     {imgButt ?
    <>
    {isEnabledImage ? <ImagePickerExample />
      :
      <Button 
      title="image picker"
      color="blue"
      onPress={()=>{{
        setIsEnabledImage(true)
        setCameraButt(false)
        setVidButt(false)
      }}}
      /> 
    }
    </>
    :
    <></>
  }
    </View>
  );
}

