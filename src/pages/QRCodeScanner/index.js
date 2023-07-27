import { View, Text, Linking, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import styles from './styles';
import api from '../../service/api'

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [flashOn, setFlashOn] = useState(false);
  // const [isCameraReady, setIsCameraReady] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.warn('esnaeou')
    setScanned(true)
    api.post('/envios/LinkNotaFiscal', { link: data }).then(response => {
      // alert(response)
      console.warn('response:',response)
    })
    // alert(`Bar Code With Type ${type} and data ${data} has been scanned`)
  }

  const handleFlashToggle = async () => {
    console.warn('handle flash flashOn:',flashOn)
    // if (isCameraReady) {
      setFlashOn(!flashOn);
      const flashMode = flashOn ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch;
      await cameraRef.current?.setFlashModeAsync(flashMode);
    // }
  };

  if (hasPermission === null) {
    return <Text style={{fontFamily: "OpenSans_500Medium"}}>Requerindo acesso acamera</Text>
  }

  if (hasPermission === false) {
    return <Text style={{fontFamily: "OpenSans_500Medium"}}>Acesso a camera negado</Text>
  }
  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        ref={cameraRef}
        flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        // onCameraReady={() => setIsCameraReady(true)}
      />
      {scanned && <Button title='Aperte para scanear novamente' onPress={() => setScanned(false)} />}
      <TouchableOpacity style={styles.flashButton} onPress={handleFlashToggle}>
        <Text style={styles.flashButtonText}>
          {flashOn ? 'Flash Ligado' : 'Flash Desligado'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}




// import { View, Text, Linking, Button, StyleSheet } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import styles from './styles';
// import api from '../../service/api'

// export default function Scanner() {
//   const [hasPermission, setHasPermission] = useState(null)
//   const [scanned, setScanned] = useState(false)

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync()
//       setHasPermission(status === 'granted')
//     })()
//   }, [])

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true)
//     api.post('/envios/LinkNotaFiscal', { link: data }).then(response => {
//       alert(response)
//     })
//     alert(`Bar Code With Type ${type} and data ${data} has been scanned`)
//   }
//   if (hasPermission === null) {
//     return <Text style={{fontFamily: "OpenSans_500Medium"}}>Requerindo acesso acamera</Text>
//   }

//   if (hasPermission === false) {
//     return <Text style={{fontFamily: "OpenSans_500Medium"}}>Acesso a camera negado</Text>
//   }
//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && <Button title='Aperte para scanear novamente' onPress={() => setScanned(false)} />}
//     </View>
//   )
// }