import * as React from 'react';
import { View, StyleSheet, Button , Image , TouchableOpacity , Text } from 'react-native';
import { Video } from 'expo-av';
import { useState , useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

export default function AppVideo() {
  const videoss = React.useRef(null);
  const [status, setStatus] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [video, setVideo] = useState('')
  const [recording,setRecording] = useState(false)
  let camera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const { audioStatus } = await Audio.requestPermissionsAsync();
      console.log('status ===>', status)
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (camera) {
        if(!recording){
            setRecording(true)
            const videos = await camera.recordAsync()
            setVideo(videos.uri)
            console.log('video ***', videos)
        }
        else{
            setRecording(false)
            camera.stopRecording()
        }
    }
  }

  
  return (
    <View style={styles.container}>
      {video ? 
      <Video
        ref={videoss}
        style={styles.video}
        source={{
            uri: video,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
        :
        <Camera
          ref={ref => {
            camera = ref
          }}
          style={styles.camera}
          type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignSelf:'flex-end'}}
              onPress={snap}>
             <View style={styles.view1}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:50,
                 borderColor: recording ? "blue":'red',
                 height: 85,
                 width:85,
                 backgroundColor: recording ? "blue":'red'}} >
              </View>
            </View>
            </TouchableOpacity>
          </View>
        </Camera>
       } 
    </View>
  );
}

const styles = StyleSheet.create({

    view1:{
        borderWidth: 2,
        borderRadius:50,
        borderColor: 'red',
        height: 100,
        width:100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
      width:360,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.5,
      // alignSelf:'flex-end',
    },
    text: {
        fontSize: 30,
        color: 'white',
        marginTop:'600%',
        marginLeft:'20%',
    },
    tinyLogo: {
      flex: 0.3,
      width: 52,
      height: 180,
      alignSelf:'flex-end',
      justifyContent:'center',
      marginRight:'25%',
    },
    displayImage: {
        width:360,
        height:780,
    },
    video: {
        alignSelf: 'center',
        width: 330,
        height: 600,
      },
  });