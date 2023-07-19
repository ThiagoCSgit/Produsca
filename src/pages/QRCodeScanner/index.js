import { View, Text, Linking, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';
import api from '../../service/api'

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    api.post('/envios/LinkNotaFiscal', { link: data }).then(response => {
      alert(response)
    })
    alert(`Bar Code With Type ${type} and data ${data} has been scanned`)
  }
  if (hasPermission === null) {
    return <Text style={{fontFamily: "OpenSans_500Medium"}}>Requerindo acesso acamera</Text>
  }

  if (hasPermission === false) {
    return <Text style={{fontFamily: "OpenSans_500Medium"}}>Acesso a camera negado</Text>
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title='Aperte para scanear novamente' onPress={() => setScanned(false)} />}
    </View>
  )
}