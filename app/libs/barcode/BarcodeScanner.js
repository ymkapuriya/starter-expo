import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScanner extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hasPermission: null,
            scanned: false,
            type: '',
            data: ''
        }
    }


    setScanned = (flag) => {
        this.setState({
            scanned: flag
        })
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({
            scanned: true,
            type: type,
            data: data
        })
        //call parent handler
        this.props.onScanned(data, type);
    }

    async componentDidMount() {
        //check for permission
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted') {
            this.setState({
                hasPermission: true
            })
        }
    }

    render() {
        if (this.state.hasPermission === null) {
            return <Text>Requesting permission for Camera</Text>
        }
        if (this.state.hasPermission === false) {
            return <Text>Camera permission not granted.</Text>
        }
        return (
            <View
                style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {
                    this.state.scanned &&
                    <Button title={'Tap to Scan Again'} onPress={() => this.setScanned(false)} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
});
