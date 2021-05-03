import React from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
    constructor(){
        super()
        this.state={hasCameraPermissions:null,scanned:false,scannedData:'',buttonState:'normal'}
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:'clicked',
            scaned:false,
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        })
    }
render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState
    if(buttonState==="clicked"&& hasCameraPermissions){
        return(
            <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}/>

        )
    }
    else if(buttonState==="normal"){
    return(
      <View style={styles.container}>
          <View style={styles.inputView}>
              <TextInput style={styles.inputBox
            }placeholder="Book Id"/>
          <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
              <TextInput style={styles.inputBox
            }placeholder="Student Id"/>
          <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
          </View>
          </View>
  ) 
    }
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
    },
    scanButton:{
        backgroundColor:"yellow",
        padding:10,
        margin:10,

    },buttonText:{
        fontSize:20,

    }
    })

    