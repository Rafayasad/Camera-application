import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
// import App from '../../../App'

export default function AppCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState('')
  const [homePage,setHomePage] = useState(false)
  let camera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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
      const photo = await camera.takePictureAsync()
      setImage(photo.uri)
      console.log('photo ***', photo)
    }
  }

  return (
      <View style={styles.container}>
        {image ? 
            <Image
            style={styles.displayImage}
            source={{
                uri: image,
            }}            
            />
            :
            <>
            <Camera
            ref={ref => {
                camera = ref
            }}
            style={styles.camera}
            type={type}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
            style={{alignSelf:'flex-start'}}
            onPress={()=>{setHomePage(true)}}
            >
            <View style={{marginTop:30}}>
            <Text style={{color:'white'}}>back</Text>
            </View>
        </TouchableOpacity>
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
              style={{alignSelf:'flex-end',marginRight:20}}
              onPress={snap}>
             <View style={styles.view1}
            >
              <View style={styles.view2}>
              </View>
            </View>
            </TouchableOpacity>
          </View>
          </Camera>
          </>
        }
        </View>
        );
    }
    
    
    const styles = StyleSheet.create({
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
    marginTop:'950%',
  },
  backtext:{
    fontSize: 30,
    color: 'white',
  },
  tinyLogo: {
    flex: 0.3,
    width: 52,
    height: 180,
    alignSelf:'flex-end',
    justifyContent:'center',
    marginRight:'25%'
    
  },
  displayImage: {
      width:360,
      height:780,
  },
  view1:{
    borderWidth: 2,
    borderRadius:50,
    borderColor: 'red',
    height: 100,
    width:100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'10%'
},
view2:{
    borderWidth: 2,
    borderRadius:50,
    borderColor: 'red',
    height: 85,
    width:85,
    backgroundColor: 'red'
},
backbutton:{
    marginTop:'50%',
    display:'flex',
    height:80,
    width:10
}

});