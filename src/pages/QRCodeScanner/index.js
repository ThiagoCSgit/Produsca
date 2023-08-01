import { View, Text, Dimensions, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import styles from './styles';
import api from '../../service/api';
import IconET from 'react-native-vector-icons/Entypo';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [flashOn, setFlashOn] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    api.post('/envios/LinkNotaFiscal', { link: data }).then(response => {
      console.log('response:',response)
    })
  }

  const handleFlashToggle = async () => {
    setFlashOn(!flashOn);
    const flashMode = flashOn ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch;
    await cameraRef.current?.setFlashModeAsync(flashMode);
  };

  if (hasPermission === null) {
    return <Text style={{fontFamily: "OpenSans_500Medium"}}>Requerindo acesso acamera</Text>
  }

  if (hasPermission === false) {
    return <Text style={{fontFamily: "OpenSans_500Medium"}}>Acesso a camera negado</Text>
  }
  return (
    <View style={styles.container}>
      <View style={{height: 500, justifyContent: 'center'}}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          ref={cameraRef}
          flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        />
        {scanned && <Button title='Aperte para scanear novamente' onPress={() => setScanned(false)} />}
      </View>
      <View style={{position: 'relative', left: Dimensions.get('window').width/2 - 25, bottom: 70}}>
        <TouchableOpacity style={styles.flashButton} onPress={handleFlashToggle}>
          <IconET name="flashlight" size={25}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}